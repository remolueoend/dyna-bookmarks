use eyre::{eyre, Result};
use log::debug;
use reqwest::{blocking::Client, StatusCode};
use serde::Deserialize;
use serde_json::json;

#[derive(Deserialize, Debug)]
pub struct DynalistDocumentNode {
    pub id: String,
    pub content: String,
    pub checked: Option<bool>,
    pub children: Option<Vec<String>>,
}

#[derive(Deserialize, Debug)]
struct DynalistDocument {
    _code: String,
    _msg: Option<String>,
    pub nodes: Option<Vec<DynalistDocumentNode>>,
}

pub struct ApiClient<'a> {
    api_token: &'a String,
    reqwest: Client,
}

impl<'a> ApiClient<'a> {
    pub fn new(api_token: &'a String) -> ApiClient<'a> {
        ApiClient {
            api_token,
            reqwest: Client::new(),
        }
    }

    /// Fetches the content of the document with the given ID.
    pub fn get_document(&self, document_id: &String) -> Result<Vec<DynalistDocumentNode>> {
        debug!("fetching remote document with id {}", document_id);
        let resp = self
            .reqwest
            .post("https://dynalist.io/api/v1/doc/read")
            // .header("Content-Type", "application/json")
            .json(&json!({
                "token": self.api_token,
                "file_id": document_id
            }))
            .send()?;

        match resp.status() {
            StatusCode::OK => {
                let json = resp.json::<DynalistDocument>()?;
                debug!(
                    "got API response for document {} with code: {}",
                    document_id, json._code
                );

                if json._code == "Ok" {
                    let nodes = json
                        .nodes
                        .ok_or(eyre!("fetched document does not contain any nodes"))?;
                    Ok(nodes)
                } else {
                    Err(eyre::Report::msg(format!(
                        "Failed to fetch dynalist document {}: {}",
                        document_id,
                        json._msg.ok_or(eyre!("missing response error messge"))?
                    )))
                }
            }
            _ => Err(eyre!(
                "failed to fetch document with id {}: {}",
                document_id,
                resp.status()
            )),
        }
    }
}
