import { NodeID, RawNode, resolveNodes } from "../index"

describe("resolveNodes", () => {
  const nodes = new Map<NodeID, RawNode<{}>>([
    ["root", { children: ["child1", "child2"], id: "root", text: "bookmarks" }],
    [
      "child1",
      { children: ["child11", "child12"], id: "child1", text: "child 1 text" },
    ],
    ["child2", { children: [], id: "child2", text: "child 2 text" }],
    ["child11", { children: [], id: "child11", text: "child 11 text" }],
    ["child12", { children: [], id: "child12", text: "child 12 text" }],
  ])
  it("returns the correct reference to root", () => {
    const { rootNode } = resolveNodes(nodes, () => ({ foo: 1 }))

    expect(rootNode.id).toEqual("root")
    expect(rootNode.data).toEqual({ foo: 1 })
  })

  it("resolves child nodes correctly", () => {
    const { rootNode } = resolveNodes(nodes, () => ({}))

    const child1 = rootNode.children![0]
    const child2 = rootNode.children![1]
    const child11 = rootNode.children![0].children![0]
    const child12 = rootNode.children![0].children![1]

    expect(child1.id).toEqual("child1")
    expect(child2.id).toEqual("child2")

    expect(child11.id).toEqual("child11")
    expect(child12.id).toEqual("child12")

    expect(rootNode.children).toHaveLength(2)
    expect(child1.children).toHaveLength(2)
    expect(child2.children).toHaveLength(0)
    expect(child11.children).toHaveLength(0)
    expect(child12.children).toHaveLength(0)
  })

  it("returns a correct flat lists of nodes", () => {
    const { nodeList } = resolveNodes(nodes, n => ({
      link: `https://${n.text}`,
      text: n.text,
    }))

    expect(nodeList).toHaveLength(5)
    nodeList.forEach(node => {
      expect(node.data.link).toEqual(`https://${node.data.text}`)
    })
  })

  it("sets the path of each node correctly", () => {
    const { rootNode } = resolveNodes(nodes, () => ({}))

    const child1 = rootNode.children![0]
    const child2 = rootNode.children![1]
    const child11 = rootNode.children![0].children![0]
    const child12 = rootNode.children![0].children![1]

    expect(rootNode.path).toHaveLength(0)
    expect(child1.path).toEqual(["bookmarks"])
    expect(child2.path).toEqual(["bookmarks"])
    expect(child11.path).toEqual(["bookmarks", "child 1 text"])
    expect(child12.path).toEqual(["bookmarks", "child 1 text"])
  })
})
