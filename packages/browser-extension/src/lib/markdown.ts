import { URL as NodeURL } from "url"

const UrlConstructor = window.URL || NodeURL

/**
 * Module providing functions for generating and parising markdown strings
 */

/**
 * Returns whether the given string is a valid url.
 * Makes use of the browser's URL constructor.
 *
 * @param url string to validate
 */
export const isValidUrl = (url: string) => {
  try {
    const parsedUrl = new UrlConstructor(url)
    return !!parsedUrl
  } catch (_) {
    return false
  }
}

/**
 * Regex used to parse the content of a dynalist document node for markdown url patterns.
 */
const parseContentNodeRegex = /\[(.*)\]\((.*)\)/

/**
 * Returns a label and optionally a href (url) parsed from the given markdown text.
 * If no link pattern can be found in the given text, the text itself is returned as label.
 *
 * @param label The markdown text to parse.
 */
export const parseMarkdownLinkText = (
  text: string,
): { label: string; href?: string } => {
  if (!parseContentNodeRegex.test(text)) {
    return { label: text }
  }
  const parsed = parseContentNodeRegex.exec(text)
  const [, label, href] = parsed! // use use RegExp:test above

  return isValidUrl(href) ? { label, href } : { label: text }
}

/**
 * Returns a markdown link text for the given label and href.
 * If no href is given, the label itself is returned.
 *
 * @param {label, href} The link data to format
 */
export const getMarkdownLinkText = ({
  label,
  href,
}: {
  label: string
  href?: string
}) => (href ? `[${label}](${href})` : label)
