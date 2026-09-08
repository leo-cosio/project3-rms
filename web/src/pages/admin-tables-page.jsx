import { Plus, Pencil, Trash2 } from "lucide-react";
import { Loading, Sidebar } from "../components";
import { CreateTableForm } from "../components/forms";
import { useEffect, useState } from "react";
import {
  createTable,
  deleteTable,
  getTables,
  updateTable,
} from "../services/tables-services";

export default function AdminTablesPage() {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTable, setEditingTable] = useState(null);

  function handleAdd() {
    setEditingTable(null);
    setShowForm(true);
  }

  function handleEdit(table) {
    setEditingTable(table);
    setShowForm(true);
  }

  async function handleSubmit(formData) {
    try {
      if (editingTable) {
        const { data } = await updateTable(editingTable.number, {
          location: formData.location,
          capacity: Number(formData.capacity),
        });

        setTables((currentTables) =>
          currentTables.map((table) =>
            table.number === editingTable.number ? data : table,
          ),
        );
      } else {
        const { data } = await createTable({
          number: Number(formData.number),
          location: formData.location,
          capacity: Number(formData.capacity),
          status: "libre",
        });

        setTables((currentTables) => [...currentTables, data]);
      }

      setShowForm(false);
      setEditingTable(null);
    } catch (error) {
      console.error("Error al guardar la mesa:", error);
    }
  }

  async function handleDelete(number) {
    const confirmed = window.confirm(
      `¿Seguro que quieres eliminar la mesa ${number}?`,
    );

    if (!confirmed) return;

    try {
      await deleteTable(number);

      setTables((currentTables) =>
        currentTables.filter((table) => table.number !== number),
      );
    } catch (error) {
      console.error("Error al eliminar la mesa:", error);
    }
  }

  useEffect(() => {
    async function loadTables() {
      try {
        const { data } = await getTables();
        setTables(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    loadTables();
  }, []);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="min-w-0 flex-1 overflow-y-auto p-8">
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-text-primary">Mesas</h1>

                <p className="mt-1 text-sm text-text-secondary">
                  Gestiona las mesas del restaurante.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 font-medium text-white hover:bg-primary-dark"
              >
                <Plus size={18} />
                Añadir mesa
              </button>
            </div>

            {showForm && (
              <CreateTableForm
                table={editingTable}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setShowForm(false);
                  setEditingTable(null);
                }}
              />
            )}

            <div className="overflow-x-auto rounded-xl border border-border bg-white">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-gray-50 text-left">
                    <th className="px-6 py-4 text-sm font-semibold text-text-primary">
                      Mesa
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-text-primary">
                      Ubicación
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-text-primary">
                      Capacidad
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-text-primary">
                      Estado
                    </th>

                    <th className="px-6 py-4 text-right text-sm font-semibold text-text-primary">
                      Acciones
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {tables.map((table) => (
                    <tr
                      key={table.number}
                      className="border-b border-border last:border-b-0"
                    >
                      <td className="px-6 py-4 font-medium text-text-primary">
                        Mesa {table.number}
                      </td>

                      <td className="px-6 py-4 text-sm text-text-secondary">
                        {table.location}
                      </td>

                      <td className="px-6 py-4 text-sm text-text-secondary">
                        {table.capacity}
                      </td>

                      <td className="px-6 py-4 text-sm">
                        <span
                          className={
                            table.status === "libre"
                              ? "text-success"
                              : "text-danger"
                          }
                        >
                          ● {table.status === "libre" ? "Libre" : "Ocupada"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(table)}
                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-text-secondary hover:bg-gray-100"
                          >
                            <Pencil size={17} />
                            Editar
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(table.number)}
                            disabled={table.status === "ocupada"}
                            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                              table.status === "ocupada"
                                ? "cursor-not-allowed text-gray-300"
                                : "text-danger hover:bg-red-50"
                            }`}
                          >
                            <Trash2 size={17} />
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
