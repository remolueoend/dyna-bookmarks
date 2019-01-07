import { equals, head, tail } from "ramda"
import { TreeNode } from "."

/**
 * Represents a reference to a node in a specific tree.
 * The node is identified by the node path given to the contructor while initiating.
 * An instance of a node ref itself satisfies the interface of a tree node.
 */
export class NodeRef<TData> implements TreeNode<TData> {
  /**
   * Returns a new unique reference to a node in a specific tree.
   *
   * @param path The unique path of the node to reference, from the node itself up until the root node.
   * Must include at least one node (root node for referencing the root node itself).
   *
   * @example
   * ```ts
   * new NodeRef([currentNode, parentNode1, ..., parentNodeN, rootNode])
   * ```
   */
  constructor(public readonly path: Array<TreeNode<TData>>) {
    if (!path.length) {
      throw new Error(
        "[node-ref]::ctor: invalid paramter path. Must contain at least one node.",
      )
    }
  }

  /**
   * The node this reference is pointing to.
   *
   * @readonly
   * @memberof NodeRef
   */
  public get instance() {
    // we can use `!` here because the constructor makes sure that `this.path` has a head:
    return head(this.path)!
  }

  /**
   * Node ID of the referenced node.
   *
   * @readonly
   * @memberof NodeRef
   */
  public get id() {
    return this.instance.id
  }

  /**
   * Boolean flag set to true if the referenced node has at least one child.
   *
   * @readonly
   * @memberof NodeRef
   */
  public get hasChildren() {
    return !!this.children && !!this.children.length
  }

  /**
   * Array of type `TreeNode` of all children of the referenced node.
   * Value is an empty array if node has no children.
   * Use `NodeRef.getChildRefs` to get an array of node references of the current node's children.
   *
   * @readonly
   * @memberof NodeRef
   */
  public get children() {
    return this.instance.children || []
  }

  /**
   * Number of children of the referenced node.
   * The value of this property is never undefined but 0 for nodes without any children.
   *
   * @readonly
   * @memberof NodeRef
   */
  public get childCount() {
    return this.children.length
  }

  /**
   * Returns an array of node references of the current node's children.
   *
   * @memberof NodeRef
   */
  public getChildRefs() {
    return this.children.map(child => new NodeRef([child, ...this.path]))
  }

  /**
   * Data of the referenced node.
   *
   * @readonly
   * @memberof NodeRef
   */
  public get data() {
    return this.instance.data
  }

  /**
   * Boolean flag set to true if the referenced node is a root node (=> has no parent).
   *
   * @readonly
   * @memberof NodeRef
   */
  public get isRoot() {
    return !this.hasParent
  }

  /**
   * Boolean flag set to true if the referenced node has a parent node.
   *
   * @readonly
   * @memberof NodeRef
   */
  public get hasParent() {
    return this.path.length > 1
  }

  /**
   * Returns the index of the referenced node in the list of children of its own parent
   * (=> child position index of the current node).
   * Throws an error if the current node is a root node. Use `NodeRef.isRoot` to validate if
   * the current node is not a root node.
   *
   * @returns
   * @memberof NodeRef
   */
  public getIndex() {
    if (this.isRoot) {
      throw new Error(
        `[node-ref]::getIndex: Current node [${
          this.id
        }] is root. Use \`NodeRef.isRoot\` to test.`,
      )
    }
    const index = this.parent().children!.findIndex(c => c.id === this.id)
    if (index === -1) {
      throw new Error(
        `[node-ref]::getIndex: Could not find node [${
          this.id
        }] in children of its own parent.`,
      )
    }

    return index
  }

  /**
   * Returns an array of sibling nodes (including current node) of the referenced node.
   * Throws an error if the current node is a root node.
   *
   * @readonly
   * @memberof NodeRef
   */
  public siblings() {
    if (this.isRoot) {
      throw new Error(
        `[node-ref]::siblings: Current node [${
          this.id
        }] is root. Use \`NodeRef.isRoot\` to test.`,
      )
    }
    return (this.hasParent && this.parent().getChildRefs()) || []
  }

  /**
   * Returns the next sibling after the referenced node or undefined if no next sibling is available.
   * Throws an error if the current node is a root node and has by definition no siblings.
   *
   * @returns {(NodeRef<TData> | undefined)}
   * @memberof NodeRef
   */
  public getNextSibling(): NodeRef<TData> | undefined {
    return this.siblings()[this.getIndex() + 1]
  }

  /**
   * Returns the previous sibling after the referenced node or undefined if no previous sibling is available.
   * Throws an error if the current node is a root node and has by definition no siblings.
   *
   * @returns {(NodeRef<TData> | undefined)}
   * @memberof NodeRef
   */
  public getPrevSibling(): NodeRef<TData> | undefined {
    return this.siblings()[this.getIndex() - 1]
  }

  /**
   * Parent of the referenced node.
   * Throws an error if the current node does not have a parent (=> root).
   * Use `NodeRef.hasParent` or `NodeRef.isRoot` first to validate if the current node has a parent node.
   *
   * @memberof NodeRef
   */
  public parent() {
    if (!this.hasParent) {
      throw new Error(
        `[node-ref]::parent: Node [${
          this.id
        }] does not have a parent. Use \`NodeRef.hasParent\` to test.`,
      )
    }
    return new NodeRef(tail(this.path))
  }

  /**
   * Returns the first child of the referenced node.
   * Throws an error if the node does not have any children.
   *
   * @memberof NodeRef
   */
  public firstChild() {
    if (!this.hasChildren) {
      throw new Error(
        `[node-ref]::firstChild: Node [${
          this.id
        }] does not have any children. Use \`NodeRef.hasChildren\` to test`,
      )
    }
    // we can use `!` here because we test for `this.hasChildren` above:
    return this.getNthChild(0)!
  }

  /**
   * Returns the last child of the referenced node.
   * Throws an error if the current node does not have any children.
   *
   * @returns
   * @memberof NodeRef
   */
  public lastChild() {
    if (!this.hasChildren) {
      throw new Error(
        `[node-ref]::firstChild: Node [${
          this.id
        }] does not have any children. Use \`NodeRef.hasChildren\` to test`,
      )
    }
    // we can use `!` here because we test for `this.hasChildren` above:
    return this.getNthChild(this.childCount - 1)!
  }

  /**
   * Returns a node ref to the nth child of the current node.
   * Returns undefined if no child with the given index is available.
   *
   * @param {number} index The index of the child to receive.
   * @returns
   * @memberof NodeRef
   */
  public getNthChild(index: number) {
    const child = this.children[index]

    return child ? new NodeRef([child, ...this.path]) : undefined
  }

  /**
   * Returns true if the given node ref is equal to the current one.
   * An equal node reference points to the same node instance with the same path.
   *
   * @param {NodeRef<TData>} ref The node ref to compare to the current node reference.
   * @returns
   * @memberof NodeRef
   */
  public equals(ref: NodeRef<TData>) {
    return equals(this.path, ref.path)
  }
}
