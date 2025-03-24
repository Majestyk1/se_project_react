const baseUrl = "http://localhost:3001";

const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Failed to fetch: ${res.status}`);
};

function getItems() {
  return fetch(`${baseUrl}/items`).then(handleServerResponse);
}

function deleteItems(itemId) {
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
  }).then(handleServerResponse);
}

function addItems(item) {
  if (!item.name || !item.imageUrl || !item.weather) {
    return Promise.reject("Invalid item data");
  }

  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  }).then(handleServerResponse);
}

export { getItems, deleteItems, addItems, handleServerResponse };
