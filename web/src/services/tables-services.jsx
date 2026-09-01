import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export async function getTables() {
  const { data } = await http.get("/tables");

  return data;
}
