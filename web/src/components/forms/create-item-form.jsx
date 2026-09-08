import { X } from "lucide-react";
import { useForm } from "react-hook-form";

export default function CreateItemForm({ item, onSubmit, onCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: item?.name ?? "",
      type: item?.type ?? "entrante",
      price: item?.price ?? "",
      available: item?.available ?? true,
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold text-text-primary">
            {item ? "Editar producto" : "Añadir producto"}
          </h2>

          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg p-2 text-text-secondary hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
          <div>
            <label className="mb-1 block text-sm font-medium text-text-primary">
              Nombre
            </label>

            <input
              type="text"
              {...register("name", {
                required: "El nombre es obligatorio",
              })}
              className="w-full rounded-lg border border-border px-3 py-2 outline-none focus:border-primary"
            />

            {errors.name && (
              <p className="mt-1 text-sm text-danger">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-text-primary">
              Categoría
            </label>

            <select
              {...register("type", {
                required: "La categoría es obligatoria",
              })}
              className="w-full rounded-lg border border-border px-3 py-2 outline-none focus:border-primary"
            >
              <option value="entrante">Entrante</option>
              <option value="primero">Primero</option>
              <option value="principal">Principal</option>
              <option value="bebida">Bebida</option>
              <option value="postre">Postre</option>
              <option value="otro">Otro</option>
            </select>

            {errors.type && (
              <p className="mt-1 text-sm text-danger">{errors.type.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-text-primary">
              Precio
            </label>

            <input
              type="number"
              step="0.01"
              {...register("price", {
                required: "El precio es obligatorio",
                min: {
                  value: 0,
                  message: "El precio no puede ser negativo",
                },
              })}
              className="w-full rounded-lg border border-border px-3 py-2 outline-none focus:border-primary"
            />

            {errors.price && (
              <p className="mt-1 text-sm text-danger">{errors.price.message}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("available")}
              className="h-4 w-4 rounded border-border text-primary"
            />

            <label className="text-sm font-medium text-text-primary">
              Disponible
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg px-4 py-2 text-sm font-medium text-text-secondary hover:bg-gray-100"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark"
            >
              {item ? "Guardar cambios" : "Añadir producto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
