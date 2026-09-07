export default function OrderBar({ order, currentOrder, onOpen }) {
  const currentOrderItems =
    currentOrder?.items.reduce((total, item) => total + item.quantity, 0) ?? 0;

  const newOrderItems = order.reduce((total, item) => total + item.quantity, 0);

  const totalItems = currentOrderItems + newOrderItems;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white p-3">
      <button
        onClick={onOpen}
        className="flex h-12 w-full items-center justify-between rounded-xl bg-primary px-5 font-semibold text-white active:scale-[0.98]"
      >
        <span>Ver pedido</span>

        <span>
          {totalItems} {totalItems === 1 ? "artículo" : "artículos"}
        </span>
      </button>
    </div>
  );
}
