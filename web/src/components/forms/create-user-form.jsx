import { X } from "lucide-react";
import { useForm } from "react-hook-form";

export default function UserForm({ user, onSubmit, onCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: user?.username ?? "",
      type: user?.type ?? "staff",
      password: "",
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold text-text-primary">
            {user ? "Editar empleado" : "Añadir empleado"}
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
              Usuario
            </label>

            <input
              type="text"
              {...register("username", {
                required: "El usuario es obligatorio",
                minLength: {
                  value: 3,
                  message: "Mínimo 3 caracteres",
                },
                maxLength: {
                  value: 16,
                  message: "Máximo 16 caracteres",
                },
              })}
              className="w-full rounded-lg border border-border px-3 py-2 outline-none focus:border-primary"
            />

            {errors.username && (
              <p className="mt-1 text-sm text-danger">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-text-primary">
              Rol
            </label>

            <select
              {...register("type", {
                required: "El rol es obligatorio",
              })}
              className="w-full rounded-lg border border-border px-3 py-2 outline-none focus:border-primary"
            >
              <option value="staff">Staff</option>
              <option value="recepcion">Recepción</option>
              <option value="admin">Administrador</option>
            </select>

            {errors.type && (
              <p className="mt-1 text-sm text-danger">{errors.type.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-text-primary">
              Contraseña
            </label>

            <input
              type="password"
              {...register("password", {
                required: !user ? "La contraseña es obligatoria" : false,
                minLength: {
                  value: 8,
                  message: "Mínimo 8 caracteres",
                },
                maxLength: {
                  value: 16,
                  message: "Máximo 16 caracteres",
                },
              })}
              placeholder={user ? "Dejar vacío para mantenerla" : ""}
              className="w-full rounded-lg border border-border px-3 py-2 outline-none focus:border-primary"
            />

            {errors.password && (
              <p className="mt-1 text-sm text-danger">
                {errors.password.message}
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
              {user ? "Guardar cambios" : "Añadir empleado"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
