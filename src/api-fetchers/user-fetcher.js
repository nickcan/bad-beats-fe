import { camelizeKeys } from "humps";

const headers = new Headers({
  "Authorization": localStorage.getItem("authToken"),
  "Content-Type": "application/json"
});

const apiDomain = "http://localhost:3000";

export const getActiveUser = function(authToken) {
  return fetch(`${apiDomain}/active_user`, {
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
  return fetch(`${apiDomain}/auth_user`, {
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

