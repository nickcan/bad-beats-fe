import { camelizeKeys, decamelizeKeys } from "humps";
import ENV_CONFIG from "./env-config";

const headers = new Headers({
  "Authorization": localStorage.getItem("authToken"),
  "Content-Type": "application/json"
});

export const createComment = function(message, postId) {
  return fetch(`${ENV_CONFIG.apiDomain}/comments`, {
    body: JSON.stringify(decamelizeKeys({
      message,
      postId
    })),
    headers,
    method: "POST"
  }).then(async function(response) {
    if (response.ok) {
      const data = await response.json();
      return camelizeKeys(data);
    } else {
      throw new Error(response.statusText);
    }
  })
}

export const deleteComment = function(id) {
  return fetch(`${ENV_CONFIG.apiDomain}/comments/${id}`, {
    headers,
    method: "DELETE"
  }).then(async function(response) {
    if (response.ok) {
      const data = await response.json();
      return camelizeKeys(data);
    } else {
      throw new Error(response.statusText);
    }
  })
}
