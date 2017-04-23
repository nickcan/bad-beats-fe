import { camelizeKeys, decamelizeKeys } from "humps";

const headers = new Headers({
  "Authorization": localStorage.getItem("authToken"),
  "Content-Type": "application/json"
});

const apiDomain = "http://localhost:3000";

export const vote = function(votableId, type, requestMethod = "POST") {
  return fetch(`${apiDomain}/votes`, {
    body: JSON.stringify(decamelizeKeys({
      type,
      votableId
    })),
    headers,
    method: requestMethod
  }).then(async function(response) {
    if (response.ok) {
      const data = await response.json();
      return camelizeKeys(data);
    } else {
      throw new Error(response.statusText);
    }
  })
};
