import { useForm } from "react-hook-form";
import * as AuthService from "../../services/auth-service";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/auth-context";

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    handleSubmit,
    formState: { errors, isValid },
    register,
  } = useForm({ mode: "all" });

  const handleUserLogin = async (user) => {
    try {
      const { data } = await AuthService.login(user);
      user = data;
      login(user);
      console.log(user);
      if (user.type === "admin") {
        navigate("/dashboard");
      }
      if (user.type === "staff") {
        navigate("/sala");
      }
      if (user.type === "reception") {
        navigate("/recepcion");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleUserLogin)}>
      <div className="mb-5">
        <div>
          <label
            htmlFor="username"
            className="block text-sm/6 font-medium text-text"
          >
            Usuario
          </label>
        </div>
        <input
          type="text"
          name="username"
          placeholder="Ingresa tu usuario"
          required
          autoComplete="email"
          className="block w-full rounded-md bg-background px-3 py-1.5 text-base text-text outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          {...register("username", { required: "User username is required" })}
        />
        {errors.username && (
          <p className="text-red-600">{errors.username.message}</p>
        )}
      </div>

      <div className="mb-5">
        <div>
          <label
            htmlFor="password"
            className="block text-sm/6 font-medium text-text"
          >
            Contraseña
          </label>
        </div>
        <input
          type="password"
          name="password"
          placeholder="Ingresa tu contraseña"
          required
          autoComplete="current-password"
          className="block w-full rounded-md bg-background px-3 py-1.5 text-base text-text outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          {...register("password", { required: "User password is required" })}
        />
        {errors.password && (
          <p className="text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          disabled={!isValid}
        >
          Sign in
        </button>
      </div>
    </form>
  );
}
