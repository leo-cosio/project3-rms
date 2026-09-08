import http from "./base-api";

export async function createItem(itemData) {
  const { data } = await http.post("/items", itemData);
  return data;
}

export async function updateItem(id, itemData) {
  const { data } = await http.patch(`/items/${id}`, itemData);
  return data;
}

export async function deleteItem(id) {
  const { data } = await http.delete(`/items/${id}`);
  return data;
}
