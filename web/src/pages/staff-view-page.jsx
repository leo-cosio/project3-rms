import { useEffect, useState } from "react";
import { getTables } from "../services/tables-services";
import { useAuth } from "../contexts/auth-context";
import Table from "../components/table";

export default function StaffViewPage() {
  const [tables, setTables] = useState([]);
  const [filter, setFilter] = useState("todas");
  const { user } = useAuth();

  useEffect(() => {
    async function loadTables() {
      const { data } = await getTables();
      setTables(data);
    }

    loadTables();
  }, []);

  const visibleTables =
    filter === "todas"
      ? tables
      : tables.filter((table) => table.status === filter);

  return (
    <div className="h-screen">
      <nav className="fixed top-0 left-0 right-0 z-50 h-20 bg-background border-b border-gray-200">
        <h1>
          Camarero <span className="capitalize">{user.username}</span>
        </h1>
      </nav>

      <main className="pt-20 p-6">
        <div className="m-3">
          <select
            name="Status"
            id="status"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          >
            <option value="todas">Todas</option>
            <option value="libre">Libre</option>
            <option value="ocupada">Ocupada</option>
          </select>

          <div className="flex flex-wrap gap-6 mt-3 justify-around">
            {visibleTables.map((table) => (
              <Table key={table.number} table={table} />
            ))}
          </div>
        </div>
      </main>

      <footer className="shrink-0">total</footer>
    </div>
  );
}
