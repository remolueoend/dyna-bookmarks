use lazy_static::lazy_static;
use regex::Regex;
use std::collections::HashMap;

use crate::api::DynalistDocumentNode;

/// A single parsed bookmakr consisting of its path from the root
/// and its URL.
pub type ParsedBookmark = (String, String);
pub type ParsedBookmarks = Vec<ParsedBookmark>;

struct NodeMapEntry<'a> {
    doc_node: &'a DynalistDocumentNode,
}
struct DfsEntry<'a> {
    doc_node: &'a DynalistDocumentNode,
    path: String,
}

/// Accepts a dynalist document and returns a list of parsed bookmarks.
/// Each tuple in the returned vector consists of the path of a bookmarks
/// and its corresponding link.
pub fn parse_document(nodes: &Vec<DynalistDocumentNode>) -> ParsedBookmarks {
    let default_children: Vec<String> = Vec::new();
    let mut node_map: HashMap<&String, NodeMapEntry> = HashMap::new();
    for node in nodes {
        node_map.insert(&node.id, NodeMapEntry { doc_node: &node });
    }

    let mut bookmarks: ParsedBookmarks = Vec::new();
    // calculate the path of each node using a DFS approach.
    // we assume the first node of the dynalist document to be the root node.
    // ensure: forall n \in doc.nodes: root_nodes \not\int n.children
    let root_node = node_map
        .get(
            &nodes
                .first()
                .expect("doc::parse_document: empty document")
                .id,
        )
        .expect("doc::parse_document: missing root node");
    // initialize the root with a path based on its own content:
    let mut node_stack: Vec<DfsEntry> = Vec::from([DfsEntry {
        doc_node: root_node.doc_node,
        path: String::from(""),
    }]);

    while node_stack.len() > 0 {
        let current_node = node_stack
            .pop()
            .expect("doc::parse_document: invalid stack");
        let children = match &current_node.doc_node.children {
            Some(children) => children,
            None => &default_children,
        };
        for child_id in children {
            let child = node_map
                .get(child_id)
                .expect("doc::parse_document: unknown child id");
            // 1. we extend the path of a child by either: its link text or content if no a markdown link.
            // 2. we add the child to the bookmarks list if it consists of a markdown link
            let child_path = match parse_md_link(&child.doc_node.content) {
                Some((text, url)) => {
                    let path = format!("{}/{}", current_node.path, text);
                    bookmarks.push((path.to_owned(), url.to_owned()));
                    path
                }
                None => {
                    format!("{}/{}", current_node.path, child.doc_node.content)
                }
            };

            node_stack.push(DfsEntry {
                doc_node: child.doc_node,
                path: child_path,
            });
        }
    }

    // sort bookmarks by their path to list them in a natural way when opening rofi:
    bookmarks.sort_by(|a, b| a.0.partial_cmp(&b.0).unwrap());
    bookmarks
}

/// accepts the content of a node and returns either:
/// None if the content is not a markdown formatted link
/// a tuple of the link text and the link URL if `node_content` is a markdown-formatted link.
fn parse_md_link(node_content: &String) -> Option<(&str, &str)> {
    lazy_static! {
        static ref MD_REG: Regex = Regex::new(r"(?m)\[(.*)\]\((.*)\)").unwrap();
    }

    MD_REG
        .captures(&node_content)
        .and_then(|caps| match (caps.get(1), caps.get(2)) {
            (Some(text), Some(url)) => Some((text.as_str(), url.as_str())),
            _ => None,
        })
}

#[cfg(test)]
mod tests {
    use super::parse_md_link;

    #[test]
    fn parse_valid_md_link() -> Result<(), &'static str> {
        let node_content = String::from("[hello there](http://some-url.com)");
        let result = parse_md_link(&node_content).ok_or("return is None")?;
        assert_eq!(result.0, "hello there");
        assert_eq!(result.1, "http://some-url.com");
        Ok(())
    }
    #[test]
    fn parse_invalid_md_link() -> Result<(), &'static str> {
        let node_content = String::from("some random text");
        match parse_md_link(&node_content) {
            Some(_) => Err("return is not None"),
            None => Ok(()),
        }
    }
}
