const {
  traverseDepthFirst,
  parseContentAsLink,
  resolveTree,
  resolveNodePath,
} = require("../node")

describe("traverseDepthFirst", () => {
  it("returns nodes in the correct order", () => {
    const tree = {
      value: "1",
      children: [
        {
          value: "2",
          children: [
            {
              value: "3",
            },
            {
              value: "4",
            },
          ],
        },
        {
          value: "5",
          children: [{ value: "6" }],
        },
      ],
    }

    expect(
      traverseDepthFirst(tree, node => node.children || [], node => node.value),
    ).toEqual(["1", "2", "3", "4", "5", "6"])
  })

  it("provides the node's parent to `mapNode`", () => {
    const tree = {
      value: "1",
      children: [
        {
          value: "2",
          children: [
            {
              value: "3",
            },
          ],
        },
      ],
    }
    const mapNode = jest.fn()

    traverseDepthFirst(tree, n => n.children || [], mapNode)

    expect(mapNode).toHaveBeenNthCalledWith(1, expect.anything(), null)
    expect(mapNode).toHaveBeenNthCalledWith(
      2,
      expect.anything(),
      expect.objectContaining({ value: "1" }),
    )
    expect(mapNode).toHaveBeenNthCalledWith(
      3,
      expect.anything(),
      expect.objectContaining({ value: "2" }),
    )
  })
})

describe("parseContentAsLink", () => {
  it("returns URL and link title for markdown links", () => {
    expect(parseContentAsLink("[link title](https://link.tld)")).toEqual({
      title: "link title",
      url: "https://link.tld",
    })
  })

  it("returns only a title for non-markdown links", () => {
    expect(parseContentAsLink("some node text")).toEqual({
      title: "some node text",
    })
  })
})

describe("resolveTree", () => {
  it("returns the root node with all resolved children", () => {
    const nodes = [
      {
        id: "1",
        children: ["2", "3"],
      },
      {
        id: "2",
        children: ["4"],
      },
      {
        id: "3",
        children: [],
      },
      {
        id: "4",
        children: [],
      },
    ]

    const rootNode = resolveTree(nodes)

    expect(rootNode).toEqual({
      id: "1",
      children: [
        { id: "2", children: [{ id: "4", children: [] }] },
        { id: "3", children: [] },
      ],
    })
  })
})

describe ('resolveNodePath', () => {
  it('returns the path from the root node to the given node', () => {
    const node = {
      title: "node a",
      parent: {
        title: "node b",
        parent: {
          title: "node c"
        }
      }
    }
    
    const result = resolveNodePath(node, n => n.parent, n => n.title)
    
    expect(result).toEqual(["node c", "node b"])
  });
});