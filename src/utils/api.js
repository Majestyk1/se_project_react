import { BASE_URL } from "./constants";

const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Failed to fetch: ${res.status}`);
};

function getItems() {
  return fetch(`${BASE_URL}/items`).then(handleServerResponse);
}

function deleteItems(itemId, token) {
  return fetch(`${BASE_URL}/items/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
}
function addItems(item, token) {
  if (!item.name || !item.imageUrl || !item.weather) {
    return Promise.reject("Invalid item data");
  }
  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  }).then(handleServerResponse);
}

function updateProfile(name, avatar, token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(handleServerResponse);
}

export { getItems, deleteItems, addItems, updateProfile, handleServerResponse };
