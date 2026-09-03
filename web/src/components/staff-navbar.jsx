import { useNavigate } from "react-router";
import { useAuth } from "../contexts/auth-context";
import { logout as logoutRequest } from "../services/auth-service";

export default function StaffNavbar({ user, location, onLocationChange }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  async function handleLogout() {
    try {
      await logoutRequest();
      logout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("No se pudo cerrar sesión", error);
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-30 bg-background border-b border-gray-200 flex flex-col">
      <div className="flex items-center justify-between px-6 pt-3">
        <h1 className="text-xl font-semibold text-gray-800">
          Camarero{" "}
          <span className="capitalize text-primary">{user.username}</span>
        </h1>

        <button
          onClick={handleLogout}
          className="text-sm font-medium text-danger hover:text-red-700 transition-colors"
        >
          Cerrar sesión
        </button>
      </div>

      <div className="flex h-full items-center gap-8 justify-around">
        {["sala", "terraza", "otra"].map((item) => {
          const active = location === item;

          return (
            <button
              key={item}
              onClick={() => onLocationChange(item)}
              className={`
                relative h-full px-2
                font-medium capitalize
                transition-colors
                ${active ? "text-primary" : "text-gray-500 hover:text-gray-800"}

                after:absolute
                after:bottom-0
                after:left-0
                after:h-0.5
                after:rounded-full
                after:bg-primary
                after:transition-all

                ${active ? "after:w-full" : "after:w-0"}
        `}
            >
              {item}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
