import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

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
