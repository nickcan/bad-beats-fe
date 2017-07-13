import { camelizeKeys } from "humps";
import ENV_CONFIG from "./env-config";

const createHeaders = function() {
  return new Headers({
    "Authorization": localStorage.getItem("authToken"),
  });
}

export const createPost = function(data) {
  return fetch(`${ENV_CONFIG.apiDomain}/posts`, {
    headers: createHeaders(),
    method: "POST",
    body: data
  }).then(async function(response) {
    if (response.ok) {
      const data = await response.json();
      return camelizeKeys(data);
    } else {
      throw new Error(response.statusText);
    }
  })
};

