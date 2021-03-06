import { camelizeKeys } from "humps";
import ENV_CONFIG from "./env-config";

const createHeaders = function() {
  return new Headers({
    "Authorization": localStorage.getItem("authToken"),
    "Content-Type": "application/json"
  });
}

export const getPosts = function(queryParams = "") {
  return fetch(`${ENV_CONFIG.apiDomain}/posts?${queryParams}`, {
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
};

export const getUserPosts = function(userId, queryParams = "") {
  return fetch(`${ENV_CONFIG.apiDomain}/users/${userId}/posts?${queryParams}`, {
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
};
