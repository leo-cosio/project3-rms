import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export async function login(user) {
  const { data } = await http.post("/login", user);
  return data;
}

export async function getCurrentUser() {
  const { data } = await http.get("/auth/me");
  return data;
}
