import { Plus, Pencil, Trash2 } from "lucide-react";

import { Loading, Sidebar } from "../components";
import { useEffect, useState } from "react";
import { getMenu } from "../services/tables-services";
import { CreateItemForm } from "../components/forms";
import { createItem, deleteItem, updateItem } from "../services/items-services";

export default function AdminItemsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  function handleAdd() {
    setEditingItem(null);
    setShowForm(true);
  }

  function handleEdit(item) {
    setEditingItem(item);
    setShowForm(true);
  }

  async function handleSubmit(formData) {
    try {
      if (editingItem) {
        const { data } = await updateItem(editingItem.id, {
          name: formData.name,
          type: formData.type,
          price: Number(formData.price),
          available: formData.available,
        });

        setItems((currentItems) =>
          currentItems.map((item) =>
            item.id === editingItem.id ? data : item,
          ),
        );
      } else {
        const { data } = await createItem({
          name: formData.name,
          type: formData.type,
          price: Number(formData.price),
          available: formData.available,
        });

        setItems((currentItems) => [...currentItems, data]);
      }

      setShowForm(false);
      setEditingItem(null);
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "¿Seguro que quieres eliminar este producto?",
    );

    if (!confirmed) return;

    try {
      await deleteItem(id);

      setItems((currentItems) => currentItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  }

  useEffect(() => {
    async function loadItems() {
      try {
        const { data } = await getMenu();
        setItems(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    loadItems();
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
                <h1 className="text-2xl font-bold text-text-primary">
                  Menú / Productos
                </h1>

                <p className="mt-1 text-sm text-text-secondary">
                  Gestiona los productos del menú.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 font-medium text-white hover:bg-primary-dark"
              >
                <Plus size={18} />
                Añadir producto
              </button>
            </div>

            {showForm && (
              <CreateItemForm
                item={editingItem}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setShowForm(false);
                  setEditingItem(null);
                }}
              />
            )}

            <div className="overflow-x-auto rounded-xl border border-border bg-white">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-gray-50 text-left">
                    <th className="px-6 py-4 text-sm font-semibold text-text-primary">
                      Producto
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-text-primary">
                      Categoría
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-text-primary">
                      Precio
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-text-primary">
                      Disponible
                    </th>

                    <th className="px-6 py-4 text-right text-sm font-semibold text-text-primary">
                      Acciones
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-border last:border-b-0"
                    >
                      <td className="px-6 py-4 font-medium text-text-primary">
                        {item.name}
                      </td>

                      <td className="px-6 py-4 text-sm text-text-secondary">
                        {item.type}
                      </td>

                      <td className="px-6 py-4 text-sm text-text-secondary">
                        {item.price.toFixed(2)} €
                      </td>

                      <td className="px-6 py-4 text-sm">
                        <span
                          className={
                            item.available ? "text-success" : "text-danger"
                          }
                        >
                          ● {item.available ? "Sí" : "No"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(item)}
                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-text-secondary hover:bg-gray-100"
                          >
                            <Pencil size={17} />
                            Editar
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(item.id)}
                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-danger hover:bg-red-50"
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
