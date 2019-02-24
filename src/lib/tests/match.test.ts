import { match } from "../match"

describe("match", () => {
  const matchTest = match([[1, "foo"], [2, "baz"], [3, "bang"]])
  it("returns the value of the matched case", () => {
    expect(matchTest(2)).toEqual("baz")
  })

  it("returns undefined if no case was matched and no default value was given", () => {
    expect(matchTest(4)).toBeUndefined()
  })

  it("returns a given default value if no case matched", () => {
    const matchTestWithDef = match([[1, "foo"], [2, "baz"], [3, "bang"]], "ack")
    expect(matchTestWithDef(5)).toEqual("ack")
  })

  it("correctly handles default values as function", () => {
    const matchTestWithDef = match([[1, "foo"], [2, "baz"], [3, "bang"]], v =>
      (v * 2).toString(),
    )
    expect(matchTestWithDef(6)).toEqual("12")
  })

  it("does not execute the default value function as long as there is a match", () => {
    const defValue = jest.fn(() => "def-value")
    const matchTestWithDef = match(
      [[1, "foo"], [2, "baz"], [3, "bang"]],
      defValue,
    )
    matchTestWithDef(1)
    expect(defValue).not.toHaveBeenCalled()
  })

  it("throws if the default value function throws", () => {
    const defValue = jest.fn(() => {
      throw new Error("def-error")
    })
    const matchTestWithDef = match(
      [[1, "foo"], [2, "baz"], [3, "bang"]],
      defValue,
    )
    expect(() => matchTestWithDef(4)).toThrowError("def-error")
  })
})
