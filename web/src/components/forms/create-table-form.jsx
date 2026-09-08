import { X } from "lucide-react";
import { useForm } from "react-hook-form";

export default function TableForm({ table, onSubmit, onCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      number: table?.number ?? "",
      location: table?.location ?? "sala",
      capacity: table?.capacity ?? 2,
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold text-text-primary">
            {table ? "Editar mesa" : "Añadir mesa"}
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
          {!table && (
            <div>
              <label className="mb-1 block text-sm font-medium text-text-primary">
                Número
              </label>

              <input
                type="number"
                {...register("number", {
                  required: "El número es obligatorio",
                  min: {
                    value: 1,
                    message: "El número debe ser mayor que 0",
                  },
                })}
                className="w-full rounded-lg border border-border px-3 py-2 outline-none focus:border-primary"
              />

              {errors.number && (
                <p className="mt-1 text-sm text-danger">
                  {errors.number.message}
                </p>
              )}
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm font-medium text-text-primary">
              Ubicación
            </label>

            <select
              {...register("location", {
                required: "La ubicación es obligatoria",
              })}
              className="w-full rounded-lg border border-border px-3 py-2 outline-none focus:border-primary"
            >
              <option value="sala">Sala</option>
              <option value="terraza">Terraza</option>
              <option value="otra">Otra</option>
            </select>

            {errors.location && (
              <p className="mt-1 text-sm text-danger">
                {errors.location.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-text-primary">
              Capacidad
            </label>

            <input
              type="number"
              {...register("capacity", {
                required: "La capacidad es obligatoria",
                min: {
                  value: 1,
                  message: "La capacidad mínima es 1",
                },
                max: {
                  value: 12,
                  message: "La capacidad máxima es 12",
                },
              })}
              className="w-full rounded-lg border border-border px-3 py-2 outline-none focus:border-primary"
            />

            {errors.capacity && (
              <p className="mt-1 text-sm text-danger">
                {errors.capacity.message}
              </p>
            )}
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
              {table ? "Guardar cambios" : "Añadir mesa"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
