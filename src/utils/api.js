const baseUrl = "http://localhost:3001";

const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Failed to fetch: ${res.status}`);
};

function getItems() {
  return fetch(`${baseUrl}/items`).then(handleServerResponse);
}

function deleteItems(itemId, token) {
  return fetch(`${baseUrl}/items/${itemId}`, {
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
  console.log("Token being sent:", token);
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  }).then(handleServerResponse);
}

export { getItems, deleteItems, addItems, handleServerResponse };
