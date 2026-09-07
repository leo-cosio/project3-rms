export default function OrderPanel({
  table,
  order,
  currentOrder,
  onClose,
  onIncrease,
  onDecrease,
  onSend,
}) {
  const total = order.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const hasCurrentOrder = currentOrder && currentOrder.items.length > 0;

  return (
    <div className="fixed inset-0 z-50 bg-background">
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4">
          <h2 className="text-xl font-semibold">
            Pedido · Mesa {table.number}
          </h2>

          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center text-2xl active:bg-gray-100"
          >
            ×
          </button>
        </div>

        {/* Contenido */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Pedido ya enviado */}
          {hasCurrentOrder && (
            <div className="mb-6">
              <h3 className="mb-3 text-sm font-semibold uppercase text-gray-500">
                Pedido actual
              </h3>

              <div className="rounded-xl bg-white">
                {currentOrder.items.map((item) => (
                  <div
                    key={item.menuItem.id}
                    className="flex items-center justify-between border-b border-gray-200 p-4 last:border-b-0"
                  >
                    <div>
                      <h3 className="font-medium">{item.menuItem.name}</h3>

                      <p className="text-sm text-gray-500">
                        {item.quantity} × {item.menuItem.price.toFixed(2)}€
                      </p>
                    </div>

                    <span className="font-medium">
                      {(item.quantity * item.menuItem.price).toFixed(2)}€
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Separador */}
          {hasCurrentOrder && order.length > 0 && (
            <div className="mb-6 border-t border-gray-200" />
          )}

          {/* Productos nuevos */}
          {order.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase text-primary">
                Nuevo pedido
              </h3>

              <div className="rounded-xl bg-white">
                {order.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b border-gray-200 p-4 last:border-b-0"
                  >
                    <div>
                      <h3 className="font-medium">{item.name}</h3>

                      <p className="text-sm text-gray-500">
                        {item.price.toFixed(2)}€
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onDecrease(item.id)}
                        className="h-10 w-10 rounded-lg border active:bg-gray-100"
                      >
                        −
                      </button>

                      <span className="w-5 text-center">{item.quantity}</span>

                      <button
                        onClick={() => onIncrease(item.id)}
                        className="h-10 w-10 rounded-lg border active:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pedido vacío */}
          {!hasCurrentOrder && order.length === 0 && (
            <p className="py-10 text-center text-gray-500">
              No hay productos en el pedido.
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-white p-4">
          {order.length > 0 && (
            <>
              <div className="mb-3 flex justify-between text-lg font-semibold">
                <span>Nuevo pedido</span>

                <span>{total.toFixed(2)}€</span>
              </div>

              <button
                onClick={onSend}
                className="h-12 w-full rounded-xl bg-primary font-semibold text-white active:scale-[0.98]"
              >
                Enviar pedido
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
