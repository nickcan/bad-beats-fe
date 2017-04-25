import { camelizeKeys, decamelizeKeys } from "humps";

const headers = new Headers({
  "Authorization": localStorage.getItem("authToken"),
  "Content-Type": "application/json"
});

const apiDomain = "http://localhost:3000";

export const postComment = function(message, postId) {
  return fetch(`${apiDomain}/comments`, {
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
};
