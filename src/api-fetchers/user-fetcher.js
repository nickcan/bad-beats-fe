import { camelizeKeys } from "humps";

const headers = new Headers({
  "Content-Type": "application/json"
});

const apiDomain = "http://localhost:3000";

export const getActiveUser = function(authToken) {
  headers.append("Authorization", authToken);
  return fetch(`${apiDomain}/active_user`, {
    method: "GET",
    headers
  }).then(async function(response) {
    if (response.ok) {
      const data = await response.json();
      return camelizeKeys(data);
    } else {
      console.error("shit got fucked up with the request");
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
      console.error("shit got fucked up with the request");
    }
  })
};

