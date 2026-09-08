import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export async function getUsers() {
  const { data } = await http.get("/users");

  return data;
}

export async function createUser(userData) {
  const { data } = await http.post("/users", userData);
  return data;
}

export async function updateUser(username, userData) {
  const { data } = await http.patch(`/users/${username}`, userData);
  return data;
}

export async function deleteUser(username) {
  const { data } = await http.delete(`/users/${username}`);
  return data;
}
