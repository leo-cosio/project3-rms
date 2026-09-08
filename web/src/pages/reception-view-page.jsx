import { useEffect, useState } from "react";
import { getTables } from "../services/tables-services";
import { Loading } from "../components";
import { useNavigate } from "react-router";
import { logout as logoutRequest } from "../services/auth-service";
import { useAuth } from "../contexts/auth-context";
import { getOrder } from "../services/tables-services";

export default function ReceptionViewPage() {
  const [selectedTable, setSelectedTable] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleTableClick = async (tableNumber) => {
    setSelectedTable(tableNumber);
    setSelectedOrder(null);

    const table = tables.find((table) => table.number === tableNumber);

    if (table.status === "libre") {
      return;
    }

    setLoadingOrder(true);

    try {
      const { data } = await getOrder(tableNumber);
      setSelectedOrder(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingOrder(false);
    }
  };

  async function handleLogout() {
    try {
      await logoutRequest();

      logout();

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error(error);
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
    <div className="h-screen overflow-hidden bg-gray-100">
      <header className="flex h-22 shrink-0 items-center justify-between bg-white px-8 py-5 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold">Recepción</h1>

          <p className="text-sm text-gray-500">Gestión de mesas y pagos</p>
        </div>

        <button
          className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      </header>

      <main className="grid h-[calc(100vh-88px)] grid-cols-1 gap-6 overflow-hidden p-6 lg:grid-cols-[1.5fr_1fr]">
        <section className="flex min-h-0 flex-col rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-6 shrink-0">
            {loading ? (
              <Loading />
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Mesas</h2>

                  <p className="text-sm text-gray-500">
                    Selecciona una mesa para consultar su pedido
                  </p>
                </div>

                <div className="flex gap-4 text-xs">
                  <span>🟢 Libre</span>
                  <span>🔴 Ocupada</span>
                </div>
              </div>
            )}
          </div>

          {!loading && (
            <div className="min-h-0 flex-1 overflow-y-auto pr-2">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {tables.map((table) => {
                  const isSelected = selectedTable === table.number;

                  const statusClasses = {
                    libre: "border-green-300 bg-green-50 text-green-700",
                    ocupada: "border-red-300 bg-red-50 text-red-700",
                  };

                  return (
                    <button
                      key={table.number}
                      onClick={() => handleTableClick(table.number)}
                      className={`flex h-32 flex-col items-center justify-center rounded-xl border-2 transition ${
                        statusClasses[table.status]
                      } ${
                        isSelected
                          ? "ring-4 ring-gray-200"
                          : "hover:scale-[1.02]"
                      }`}
                    >
                      <span className="text-3xl font-bold">{table.number}</span>

                      <span className="mt-2 text-sm capitalize">
                        {table.status}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        <section className="flex min-h-0 flex-col rounded-xl bg-white shadow-sm">
          {loadingOrder ? (
            <Loading />
          ) : !selectedOrder ? (
            <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
              <div className="mb-4 text-5xl">🧾</div>

              <h2 className="text-xl font-semibold">
                Ningún pedido seleccionado
              </h2>

              <p className="mt-2 max-w-sm text-sm text-gray-500">
                Selecciona una mesa ocupada para consultar su pedido.
              </p>
            </div>
          ) : (
            <>
              <div className="shrink-0 border-b p-6">
                <p className="text-sm text-gray-500">Pedido abierto</p>

                <h2 className="text-2xl font-bold">
                  Mesa {selectedOrder.table.number}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {selectedOrder.table.location}
                </p>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto p-6">
                <h3 className="mb-4 font-semibold">Resumen del pedido</h3>

                <div className="space-y-4">
                  {selectedOrder.items.map((item) => (
                    <div
                      key={item.menuItem.id}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium">{item.menuItem.name}</p>

                        <p className="text-sm text-gray-500">
                          {item.quantity} × {item.menuItem.price.toFixed(2)} €
                        </p>
                      </div>

                      <p className="font-medium">
                        {(item.quantity * item.menuItem.price).toFixed(2)} €
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="shrink-0 border-t p-6">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-lg font-semibold">Total</span>

                  <span className="text-2xl font-bold">
                    {selectedOrder.subtotal.toFixed(2)} €
                  </span>
                </div>

                <button
                  onClick={() => setShowPayment(true)}
                  className="w-full rounded-lg bg-black py-3 font-semibold text-white transition hover:bg-gray-800"
                >
                  Cobrar pedido
                </button>
              </div>
            </>
          )}
        </section>
      </main>

      {showPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold">Cobrar pedido</h2>

            <p className="mt-1 text-sm text-gray-500">
              Mesa {selectedOrder.table.number}
            </p>

            <div className="my-6 flex items-center justify-between border-y py-4">
              <span className="font-medium">Total</span>

              <span className="text-xl font-bold">
                {selectedOrder.subtotal.toFixed(2)} €
              </span>
            </div>

            <p className="mb-3 text-sm font-medium">Método de pago</p>

            <div className="grid grid-cols-2 gap-3">
              <button className="rounded-lg border p-3 hover:bg-gray-100">
                Efectivo
              </button>

              <button className="rounded-lg border p-3 hover:bg-gray-100">
                Tarjeta
              </button>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowPayment(false)}
                className="flex-1 rounded-lg border py-3 hover:bg-gray-100"
              >
                Cancelar
              </button>

              <button
                onClick={() => setShowPayment(false)}
                className="flex-1 rounded-lg bg-black py-3 font-semibold text-white hover:bg-gray-800"
              >
                Confirmar pago
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
