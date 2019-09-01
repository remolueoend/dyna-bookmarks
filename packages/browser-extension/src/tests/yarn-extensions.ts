import { NodeRef } from "lib/trees/node-ref"

const getMessage = <T>(
  received: T,
  expected: T,
  ctx: jest.MatcherUtils,
  matcherName: string,
  pass: boolean,
  toString: (value: T) => string,
) =>
  // tslint:disable:prefer-template
  () =>
    `${ctx.utils.matcherHint(matcherName)}\n\n` +
    `Expected value to ${pass ? "not " : ""}be:\n` +
    `  ${ctx.utils.printExpected(toString(expected))}\n` +
    `Received:\n` +
    `  ${ctx.utils.printReceived(toString(received))}`

expect.extend({
  toEqualNodeRef<TData>(
    this: jest.MatcherUtils,
    received: NodeRef<TData>,
    expected: NodeRef<TData>,
  ) {
    const pass = received.equals(expected)
    return {
      pass,
      message: getMessage(
        received,
        expected,
        this,
        ".toEqualNodeRef",
        pass,
        n => n.uuid(),
      ),
    }
  },
})
