const baseUrl = "http://localhost:3001";

function getItems() {
  return fetch(`${baseUrl}/items`)
    .then((res) => {
      return res.ok
        ? res.json()
        : Promise.reject("Something went wrong: ${res.status}");
    })
    .catch(console.error);
}

function deleteItems(itemId) {
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
  })
    .then((res) =>
      res.ok
        ? res.json()
        : Promise.reject(`Failed to delete item: ${res.status}`)
    )
    .catch(console.error);
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
  })
    .then((res) =>
      res.ok ? res.json() : Promise.reject(`Failed to add item: ${res.status}`)
    )
    .catch(console.error);
}

export { getItems, deleteItems, addItems };
