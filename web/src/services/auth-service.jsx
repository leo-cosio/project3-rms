import http from "./base-api";

export async function login(user) {
  const { data } = await http.post("/login", user);
  return data;
}

export async function logout() {
  await http.delete("/sessions");
}

export async function getCurrentUser() {
  const { data } = await http.get("/auth/me");
  return data;
}
