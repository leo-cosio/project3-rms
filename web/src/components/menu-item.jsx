export default function MenuItem({ item, onAdd }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4">
      <div className="min-w-0">
        <h2 className="font-medium text-text-primary">{item.name}</h2>

        <p className="mt-1 text-sm font-semibold text-primary">
          {item.price.toFixed(2)}€
        </p>
      </div>

      <button
        onClick={() => onAdd(item)}
        className="ml-4 flex h-11 shrink-0 items-center gap-1 rounded-lg bg-primary px-4 text-sm font-semibold text-white active:scale-95"
      >
        <span className="text-lg leading-none">+</span>
        Añadir
      </button>
    </div>
  );
}
