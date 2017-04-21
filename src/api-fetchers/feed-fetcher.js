import { camelizeKeys } from "humps";

const headers = new Headers({
  "Content-Type": "application/json"
});

const apiDomain = "http://localhost:3001";

export const getPosts = function(size = 3) {
  return fetch(`${apiDomain}/posts?size=${size}&page=1`, {
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
