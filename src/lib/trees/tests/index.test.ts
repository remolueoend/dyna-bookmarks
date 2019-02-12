import { NodeID, RawNode, resolveNodes } from "../index"

describe("resolveNodes", () => {
  const nodes = new Map<NodeID, RawNode<{}>>([
    ["root", { children: ["child1", "child2"], id: "root" }],
    ["child1", { children: ["child11", "child12"], id: "child1" }],
    ["child2", { children: [], id: "child2" }],
    ["child11", { children: [], id: "child11" }],
    ["child12", { children: [], id: "child12" }],
  ])
  it("returns the correct reference to root", () => {
    const rootNode = resolveNodes(nodes, () => ({ foo: 1 }))

    expect(rootNode.id).toEqual("root")
    expect(rootNode.data).toEqual({ foo: 1 })
  })

  it("resolves child nodes correctly", () => {
    const rootNode = resolveNodes(nodes, () => ({}))

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

  it("resolves the node path of each node correctly", () => {
    const rootNode = resolveNodes(nodes, () => ({}))

    const child1 = rootNode.firstChild()!
    const child2 = rootNode.getNthChild(1)!
    const child11 = rootNode.firstChild()!.firstChild()!
    const child12 = rootNode.firstChild()!.getNthChild(1)!

    expect(() => rootNode.parent()).toThrow()
    expect(rootNode.uuid()).toEqual("root")
    expect(child1.uuid()).toEqual("root/child1")
    expect(child2.uuid()).toEqual("root/child2")
    expect(child11.uuid()).toEqual("root/child1/child11")
    expect(child12.uuid()).toEqual("root/child1/child12")
  })
})
