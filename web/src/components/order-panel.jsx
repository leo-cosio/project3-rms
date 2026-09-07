export default function OrderPanel({
  table,
  order,
  onClose,
  onIncrease,
  onDecrease,
}) {
  const total = order.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div className="fixed inset-0 z-50 bg-background">
      <div className="flex h-full flex-col">
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

        <div className="flex-1 overflow-y-auto p-4">
          {order.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b border-gray-200 py-4"
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

        <div className="border-t border-gray-200 bg-white p-4">
          <div className="mb-3 flex justify-between text-lg font-semibold">
            <span>Total</span>

            <span>{total.toFixed(2)}€</span>
          </div>

          <button className="h-12 w-full rounded-xl bg-primary font-semibold text-white active:scale-[0.98]">
            Enviar pedido
          </button>
        </div>
      </div>
    </div>
  );
}
