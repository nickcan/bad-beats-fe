import { camelizeKeys, decamelizeKeys } from "humps";
import ENV_CONFIG from "./env-config";

const createHeaders = function() {
  return new Headers({
    "Authorization": localStorage.getItem("authToken"),
    "Content-Type": "application/json"
  });
}

export const authenticate = function(request) {
  return fetch(`${ENV_CONFIG.apiDomain}/auth_user`, {
    body: JSON.stringify(decamelizeKeys(request)),
    headers: createHeaders(),
    method: "POST"
  }).then(async function(response) {
    const data = await response.json();
    return camelizeKeys(data);
  })
}

export const createUser = function(request) {
  return fetch(`${ENV_CONFIG.apiDomain}/users`, {
    body: JSON.stringify(decamelizeKeys(request)),
    headers: createHeaders(),
    method: "POST"
  }).then(async function(response) {
    const data = await response.json();
    return camelizeKeys(data);
  })
}

export const getActiveUser = function() {
  return fetch(`${ENV_CONFIG.apiDomain}/active_user`, {
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

export const getUser = function(id) {
  return fetch(`${ENV_CONFIG.apiDomain}/users/${id}`, {
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

export const postFollowing = function(request, requestType) {
  return fetch(`${ENV_CONFIG.apiDomain}/followings`, {
    body: JSON.stringify(decamelizeKeys(request)),
    headers: createHeaders(),
    method: requestType
  }).then(async function(response) {
    if (response.ok) {
      const data = await response.json();
      return camelizeKeys(data);
    } else {
      throw new Error(response.statusText);
    }
  })
}

export const getUsers = function(userId, type, page) {
  return fetch(`${ENV_CONFIG.apiDomain}/users/${userId}/${type}?page=${page}&size=24`, {
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

