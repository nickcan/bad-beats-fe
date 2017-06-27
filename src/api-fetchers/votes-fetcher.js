import { camelizeKeys, decamelizeKeys } from "humps";
import ENV_CONFIG from "./env-config";

const createHeaders = function() {
  return new Headers({
    "Authorization": localStorage.getItem("authToken"),
    "Content-Type": "application/json"
  });
}

export const vote = function(votableId, type, requestMethod = "POST") {
  return fetch(`${ENV_CONFIG.apiDomain}/votes`, {
    body: JSON.stringify(decamelizeKeys({
      type,
      votableId
    })),
    headers: createHeaders(),
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
