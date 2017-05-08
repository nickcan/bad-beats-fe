import { camelizeKeys } from "humps";
import ENV_CONFIG from "./env-config";

const headers = new Headers({
  "Authorization": localStorage.getItem("authToken"),
  "Content-Type": "application/json"
});

export const getActiveUser = function() {
  return fetch(`${ENV_CONFIG.apiDomain}/active_user`, {
    method: "GET",
    headers
  }).then(async function(response) {
    if (response.ok) {
      const data = await response.json();
      return camelizeKeys(data);
    } else {
      throw new Error(response.statusText);
    }
  })
};

export const getUser = function(id) {
  return fetch(`${ENV_CONFIG.apiDomain}/users/${id}`, {
    method: "GET",
    headers
  }).then(async function(response) {
    if (response.ok) {
      const data = await response.json();
      return camelizeKeys(data);
    } else {
      throw new Error(response.statusText);
    }
  })
};

export const postAuthUser = function(userAuthData) {
  return fetch(`${ENV_CONFIG.apiDomain}/auth_user`, {
    body: JSON.stringify(userAuthData),
    method: "POST",
    headers,
    mode: "cors"
  }).then(async function(response) {
    if (response.ok) {
      const data = await response.json();
      return camelizeKeys(data);
    } else {
      throw new Error(response.statusText);
    }
  })
};

