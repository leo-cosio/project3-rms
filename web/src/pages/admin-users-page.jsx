import { Plus, Pencil, Trash2 } from "lucide-react";
import { Loading, Sidebar } from "../components";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/auth-context";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../services/users-services";
import UserForm from "../components/forms/create-user-form";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const { user: currentUser } = useAuth();

  function handleAdd() {
    setEditingUser(null);
    setShowForm(true);
  }

  function handleEdit(user) {
    setEditingUser(user);
    setShowForm(true);
  }

  async function handleSubmit(formData) {
    try {
      if (editingUser) {
        const userData = {
          username: formData.username,
          type: formData.type,
        };

        if (formData.password) {
          userData.password = formData.password;
        }

        const { data } = await updateUser(editingUser.username, userData);

        setUsers((currentUsers) =>
          currentUsers.map((user) =>
            user.id === editingUser.id ? data : user,
          ),
        );
      } else {
        const { data } = await createUser(formData);

        setUsers((currentUsers) => [...currentUsers, data]);
      }

      setShowForm(false);
      setEditingUser(null);
    } catch (error) {
      console.error("Error al guardar el usuario:", error);
    }
  }

  async function handleDelete(username) {
    const confirmed = window.confirm(
      `¿Seguro que quieres eliminar al usuario ${username}?`,
    );

    if (!confirmed) return;

    try {
      await deleteUser(username);

      setUsers((currentUsers) =>
        currentUsers.filter((user) => user.username !== username),
      );
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  }

  useEffect(() => {
    async function loadItems() {
      try {
        const { data } = await getUsers();
        setUsers(data);
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
                  Empleados
                </h1>

                <p className="mt-1 text-sm text-text-secondary">
                  Gestiona los usuarios y sus permisos.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 font-medium text-white hover:bg-primary-dark"
              >
                <Plus size={18} />
                Añadir empleado
              </button>
            </div>

            {showForm && (
              <UserForm
                user={editingUser}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setShowForm(false);
                  setEditingUser(null);
                }}
              />
            )}

            <div className="overflow-x-auto rounded-xl border border-border bg-white">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-gray-50 text-left">
                    <th className="px-6 py-4 text-sm font-semibold text-text-primary">
                      Usuario
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-text-primary">
                      Rol
                    </th>

                    <th className="px-6 py-4 text-right text-sm font-semibold text-text-primary">
                      Acciones
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-border last:border-b-0"
                    >
                      <td className="px-6 py-4 font-medium text-text-primary capitalize">
                        {user.username}
                      </td>

                      <td className="px-6 py-4 text-sm text-text-secondary">
                        {user.type}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(user)}
                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-text-secondary hover:bg-gray-100"
                          >
                            <Pencil size={17} />
                            Editar
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(user.username)}
                            disabled={user.username === currentUser.username}
                            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                              user.username === currentUser.username
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
