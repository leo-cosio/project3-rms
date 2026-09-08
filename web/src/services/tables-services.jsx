import http from "./base-api";

export async function getMenu() {
  const { data } = await http.get("/items");

  return data;
}

export async function createOrder(number, items) {
  const { data } = await http.post(`/tables/${number}/orders`, {
    items,
  });

  return data;
}

export async function getOrder(number) {
  const { data } = await http.get(`/tables/${number}/orders`);

  return data;
}

//? Table Services

export async function createTable(tableData) {
  const { data } = await http.post("/tables", tableData);

  return data;
}

export async function updateTable(number, tableData) {
  const { data } = await http.patch(`/tables/${number}`, tableData);

  return data;
}

export async function deleteTable(number) {
  const { data } = await http.delete(`/tables/${number}`);

  return data;
}

export async function getTables() {
  const { data } = await http.get("/tables");

  return data;
}

export async function getTableInfo(number) {
  const { data } = await http.get(`/tables/${number}`);

  return data;
}
