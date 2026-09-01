import { useNavigate } from "react-router";
import { logout as logoutRequest } from "../services/auth-service";
import { useAuth } from "../contexts/auth-context";

const dashboard = [
  { name: "Dashboard", icon: "▦" },
  { name: "Mesas", icon: "▤" },
  { name: "Menú / Productos", icon: "◫" },
  { name: "Empleados", icon: "♙" },
  { name: "Configuración", icon: "⚙" },
];

export default function Sidebar() {
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
    <aside className="flex h-screen w-64 flex-col bg-text text-white">
      {/* Logo */}
      <div className="flex h-20 items-center gap-3 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-xl">
          🍴
        </div>

        <div>
          <h1 className="text-lg font-bold">RMS</h1>
          <p className="text-xs text-gray-400">Restaurant Management System</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {dashboard.map((item, index) => {
            const isActive = index === 0;

            return (
              <li key={item.name}>
                <button
                  className={`
                    flex w-full items-center gap-3 rounded-lg px-4 py-3
                    text-sm font-medium transition
                    ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                    }
                  `}
                >
                  <span className="flex w-5 justify-center text-lg">
                    {item.icon}
                  </span>

                  <span>{item.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User */}
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3 rounded-lg p-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-semibold">
            L
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">Leo Cosío</p>

            <p className="text-xs text-gray-400">Administrador</p>
          </div>

          <button
            className="text-gray-400 hover:text-white"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
