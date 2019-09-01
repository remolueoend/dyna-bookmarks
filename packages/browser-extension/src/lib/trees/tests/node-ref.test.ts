import "tests/yarn-extensions"
import { NodeID, TreeNode } from ".."
import { NodeRef } from "../node-ref"

type Node = TreeNode<{}>
const node = (id: NodeID, children?: Node[]): Node => ({
  id,
  children,
  data: {},
})

const childNode11 = node("child11")
const childNode12 = node("child12")
const childNode1 = node("child1", [childNode11, childNode12])
const childNode2 = node("childNode2")
const rootNode = node("root", [childNode1, childNode2])

const refChildNode11 = new NodeRef([childNode11, childNode1, rootNode])
const refRootNode = new NodeRef([rootNode])

describe("node-ref", () => {
  describe("ctor", () => {
    it("throws an error if the given path is empty", () => {
      expect(() => new NodeRef([])).toThrow()
    })
  })

  describe("instance", () => {
    it("is a reference to the current node", () => {
      expect(refChildNode11.instance).toBe(childNode11)
    })
  })
  describe("id", () => {
    it("is a reference to the current node ID", () => {
      expect(refChildNode11.id).toBe(childNode11.id)
    })
  })
  describe("data", () => {
    it("is a reference to the data of the current node", () => {
      expect(refChildNode11.data).toBe(childNode11.data)
    })
  })
  describe("hasChildren", () => {
    it("is true if the current node has any children", () => {
      expect(refRootNode.hasChildren).toBeTruthy()
    })
    it("is false if the current node has no children", () => {
      expect(refChildNode11.hasChildren).toBeFalsy()
    })
  })
  describe("children", () => {
    it("is an array of the current node's children", () => {
      expect(refRootNode.children).toEqual([childNode1, childNode2])
    })
    it("is an empty array if the current node has no children", () => {
      expect(refChildNode11.children).toEqual([])
    })
  })
  describe("childCount", () => {
    it("returns the correct number of children of the current node", () => {
      expect(refRootNode.childCount).toEqual(2)
    })
    it("returns 0 if the current node has no children", () => {
      expect(refChildNode11.childCount).toEqual(0)
    })
  })
  describe("getChildRefs", () => {
    it("returns a node ref array of the current node's children", () => {
      const childRefs = refRootNode.getChildRefs()
      expect(
        childRefs[0].equals(new NodeRef([childNode1, rootNode])),
      ).toBeTruthy()
    })
  })
  describe("isRoot", () => {
    it("is true if the current node is a root node", () => {
      expect(refRootNode.isRoot).toBeTruthy()
    })
    it("returns false if the current node is no root node", () => {
      expect(refChildNode11.isRoot).toBeFalsy()
    })
  })
  describe("hasParent", () => {
    it("is true if the current node has a parent", () => {
      expect(refChildNode11.hasParent).toBeTruthy()
    })
    it("is false if the current node has no parent (root node)", () => {
      expect(refRootNode.hasParent).toBeFalsy()
    })
  })
  describe("getIndex", () => {
    it("returns the correct child index of the current node", () => {
      const child1Ref = new NodeRef([childNode1, rootNode])
      const child2Ref = new NodeRef([childNode2, rootNode])

      expect(child1Ref.getIndex()).toEqual(0)
      expect(child2Ref.getIndex()).toEqual(1)
    })
    it("throws an error if the current node is a root node", () => {
      expect(() => refRootNode.getIndex()).toThrow()
    })
    it("throws an error if the current node is not listed in its own parent's child nodes", () => {
      const childNode = node("childNode")
      const ref = new NodeRef([childNode, rootNode]) // childNode is not registered as child in rootNode

      expect(() => ref.getIndex()).toThrow()
    })
  })
  describe("siblings", () => {
    it("returns all siblings of the current node including the current node", () => {
      expect(refChildNode11.siblings().map(s => s.instance)).toEqual([
        childNode11,
        childNode12,
      ])
    })
    it("throws an error if the current node is a root node", () => {
      expect(() => refRootNode.siblings()).toThrow()
    })
  })
  describe("getNextSibling", () => {
    it("returns the next sibling of the current node", () => {
      expect(refChildNode11.getNextSibling()!.instance).toBe(childNode12)
    })
    it("returns undefined if the current node has no next sibling", () => {
      expect(refChildNode11.getNextSibling()!.getNextSibling()).toBeUndefined()
    })
    it("throws an error if the current node is a root", () => {
      expect(() => refRootNode.getNextSibling()).toThrow()
    })
  })
  describe("getPrevSibling", () => {
    it("returns the previous sibling of the current node", () => {
      const refChildNode12 = new NodeRef([childNode12, childNode1, rootNode])
      const sibling = refChildNode12.getPrevSibling()!
      expect(sibling.equals(refChildNode11)).toBeTruthy()
    })
    it("returns undefined if the current node has no previous sibling", () => {
      expect(refChildNode11.getPrevSibling()).toBeUndefined()
    })
    it("throws an error if the current node is a root", () => {
      expect(() => refRootNode.getPrevSibling()).toThrow()
    })
  })
  describe("parent", () => {
    it("returns the correct reference to the current node's parent", () => {
      expect(
        refChildNode11.parent().equals(new NodeRef([childNode1, rootNode])),
      ).toBeTruthy()
    })
    it("throws an error if the current node is a root node", () => {
      expect(() => refRootNode.parent()).toThrow()
    })
  })
  describe("firstChild", () => {
    it("returns the reference to the first child of the given node", () => {
      const firstChild = new NodeRef([childNode1, rootNode]).firstChild()
      expect(firstChild.equals(refChildNode11)).toBeTruthy()
    })
    it("throws an error if the current node has no children", () => {
      expect(() => refChildNode11.firstChild()).toThrow()
    })
  })
  describe("lastChild", () => {
    it("returns the reference to the last child of the given node", () => {
      const lastChild = new NodeRef([childNode1, rootNode]).lastChild()
      expect(
        lastChild.equals(new NodeRef([childNode12, childNode1, rootNode])),
      ).toBeTruthy()
    })
    it("throws an error if the current node has no children", () => {
      expect(() => refChildNode11.lastChild()).toThrow()
    })
  })
  describe("getNthChild", () => {
    it("returns the correct child ref with the given index", () => {
      expect(
        refRootNode.getNthChild(1)!.equals(new NodeRef([childNode2, rootNode])),
      ).toBeTruthy()
    })
    it("returns undefined if no child at the given index is available", () => {
      expect(refRootNode.getNthChild(2)).toBeUndefined()
    })
  })
  describe("equals", () => {
    it("Returns true if the given node ref is the same", () => {
      expect(
        refChildNode11.equals(new NodeRef([childNode11, childNode1, rootNode])),
      ).toBeTruthy()
    })
    it("returns false if the given reference is not the same", () => {
      expect(
        refChildNode11.equals(new NodeRef([childNode12, childNode1, rootNode])),
      ).toBeFalsy()
    })
  })
  describe("flatten", () => {
    it("flattens the given node and its nested children breath-first", () => {
      const flatten = refRootNode.flatten()
      expect(flatten[0]).toEqualNodeRef(refRootNode)
      expect(flatten[1]).toEqualNodeRef(new NodeRef([childNode1, rootNode]))
      expect(flatten[2]).toEqualNodeRef(new NodeRef([childNode2, rootNode]))
      expect(flatten[3]).toEqualNodeRef(
        new NodeRef([childNode11, childNode1, rootNode]),
      )
      expect(flatten[4]).toEqualNodeRef(
        new NodeRef([childNode12, childNode1, rootNode]),
      )
    })
  })
})
