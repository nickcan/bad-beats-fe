import { camelizeKeys } from "humps";

const headers = new Headers({
  "Content-Type": "application/json"
});

const apiDomain = "http://localhost:3000";

export const getPosts = function(queryParams = "") {
  return fetch(`${apiDomain}/posts?${queryParams}`, {
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
