import {
  getMarkdownLinkText,
  isValidUrl,
  parseMarkdownLinkText,
} from "../markdown"

describe("isValidUrl", () => {
  it("returns true for a valid url", () => {
    expect(isValidUrl("https://sub.domain.tld")).toBeTruthy()
    expect(isValidUrl("ftp://host.tld"))
  })

  it("returns false for invalid URLs", () => {
    expect(isValidUrl("no-protocol.host")).toBeFalsy()
  })
})

describe("parseMarkdownLinkText", () => {
  it("returns label and href if text contains markdown link", () => {
    const text = "[this is a label](http://this.is.the.host)"
    expect(parseMarkdownLinkText(text)).toEqual({
      label: "this is a label",
      href: "http://this.is.the.host",
    })
  })

  it("returns only the label if no link pattern can be found", () => {
    const text = "[this is a label(https://this.is.not.a.pattern)]"
    expect(parseMarkdownLinkText(text)).toEqual({
      label: "[this is a label(https://this.is.not.a.pattern)]",
    })
  })

  it("returns only a label if the URL in the pattern is invalid", () => {
    const text = "[this is a label](this.is.invalid)"
    expect(parseMarkdownLinkText(text)).toEqual({
      label: "[this is a label](this.is.invalid)",
    })
  })
})

describe("getMakrdownLinkText", () => {
  it("returns a link pattern if a href is given", () => {
    expect(
      getMarkdownLinkText({
        label: "this is the label",
        href: "http://host.tld",
      }),
    ).toEqual("[this is the label](http://host.tld)")
  })

  it("returns the label as plain text if no href is given", () => {
    expect(getMarkdownLinkText({ label: "this is the label" })).toEqual(
      "this is the label",
    )
  })
})
