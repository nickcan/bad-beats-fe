import { camelizeKeys, decamelizeKeys } from "humps";
import ENV_CONFIG from "./env-config";


const createHeaders = function() {
  return new Headers({
    "Authorization": localStorage.getItem("authToken"),
    "Content-Type": "application/json"
  });
}

export const getComments = function(postId, offset, size) {
  return fetch(`${ENV_CONFIG.apiDomain}/posts/${postId}/comments?offset=${offset}&size=${size}`, {
    headers: createHeaders(),
    method: "GET"
  }).then(async function(response) {
    if (response.ok) {
      const data = await response.json();
      return camelizeKeys(data);
    } else {
      throw new Error(response.statusText);
    }
  })
}

export const createComment = function(message, postId) {
  return fetch(`${ENV_CONFIG.apiDomain}/comments`, {
    body: JSON.stringify(decamelizeKeys({
      message,
      postId
    })),
    headers: createHeaders(),
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
    headers: createHeaders(),
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
