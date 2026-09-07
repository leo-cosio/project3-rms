import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export async function getTables() {
  const { data } = await http.get("/tables");

  return data;
}

export async function getTableInfo(number) {
  const { data } = await http.get(`/tables/${number}`);

  return data;
}

export async function getMenu() {
  const { data } = await http.get("/items");

  return data;
}
