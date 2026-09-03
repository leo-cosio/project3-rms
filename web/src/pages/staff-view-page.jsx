import { useEffect, useState } from "react";
import { getTables } from "../services/tables-services";
import { useAuth } from "../contexts/auth-context";
import { StaffNavbar, Table } from "../components";

export default function StaffViewPage() {
  const [tables, setTables] = useState([]);
  const [filter, setFilter] = useState("todas");
  const [location, setLocation] = useState("sala");
  const { user } = useAuth();

  useEffect(() => {
    async function loadTables() {
      const { data } = await getTables();
      setTables(data);
    }

    loadTables();
  }, []);

  const visibleTables = [...tables]
    .filter((table) => table.location === location)
    .filter((table) => filter === "todas" || table.status === filter)
    .sort((a, b) => a.number - b.number);

  return (
    <div className="h-screen bg-background">
      <StaffNavbar
        user={user}
        location={location}
        onLocationChange={setLocation}
      />

      <main className="flex h-full flex-col pt-30">
        <div className="shrink-0 p-6">
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2"
          >
            <option value="todas">Todas</option>
            <option value="libre">Libre</option>
            <option value="ocupada">Ocupada</option>
          </select>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="flex flex-wrap justify-around gap-6">
            {visibleTables.map((table) => (
              <Table key={table.number} table={table} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
