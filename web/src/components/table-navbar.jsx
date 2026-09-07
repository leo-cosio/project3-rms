export default function TableNavbar({ table, type, onTypeChange }) {
  const itemTypes = [
    "entrante",
    "primero",
    "principal",
    "bebida",
    "postre",
    "otro",
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-30 bg-background border-b border-gray-200 flex flex-col">
      {/* Cabecera */}
      <div className="flex items-center justify-between px-6 pt-3">
        <h1 className="text-xl font-semibold text-gray-800">
          Mesa <span className="text-primary">{table.number}</span>
        </h1>
      </div>

      {/* Categorías */}
      <div className="mt-auto w-full overflow-x-auto">
        <div className="flex h-12 min-w-max px-4">
          {itemTypes.map((item) => {
            const active = type === item;

            return (
              <button
                key={item}
                onClick={() => onTypeChange(item)}
                className={`
                  relative px-5
                  text-sm font-medium capitalize
                  whitespace-nowrap
                  transition-colors
                  ${
                    active
                      ? "text-primary"
                      : "text-gray-500 hover:text-gray-800"
                  }

                  after:absolute
                  after:bottom-0
                  after:left-3
                  after:right-3
                  after:h-0.5
                  after:rounded-full
                  after:bg-primary
                  after:transition-all

                  ${active ? "after:opacity-100" : "after:opacity-0"}
                `}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
