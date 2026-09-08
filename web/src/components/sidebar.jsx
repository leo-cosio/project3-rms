import { useNavigate, useLocation } from "react-router";
import {
  LayoutDashboard,
  Table2,
  UtensilsCrossed,
  Users,
  LogOut,
} from "lucide-react";
import { logout as logoutRequest } from "../services/auth-service";
import { useAuth } from "../contexts/auth-context";

const dashboard = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Mesas",
    path: "/admin/tables",
    icon: Table2,
  },
  {
    name: "Menú / Productos",
    path: "/admin/items",
    icon: UtensilsCrossed,
  },
  {
    name: "Empleados",
    path: "/admin/users",
    icon: Users,
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout } = useAuth();

  async function handleLogout() {
    try {
      await logoutRequest();

      logout();

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error("No se pudo cerrar sesión", error);
    }
  }

  return (
    <aside className="flex h-screen w-64 flex-col bg-text text-white">
      <div className="flex h-20 items-center gap-3 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
          <UtensilsCrossed size={22} />
        </div>

        <div>
          <h1 className="text-lg font-bold">RMS</h1>

          <p className="text-xs text-gray-400">Restaurant Management System</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {dashboard.map((item) => {
            const Icon = item.icon;

            const isActive = location.pathname === item.path;

            return (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`
                    flex w-full items-center gap-3 rounded-lg
                    px-4 py-3 text-sm font-medium transition
                    ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                    }
                  `}
                >
                  <Icon size={20} strokeWidth={1.8} />

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
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-semibold">
            L
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium capitalize">
              {user.username}
            </p>

            <p className="text-xs text-gray-400">Administrador</p>
          </div>

          <button
            onClick={handleLogout}
            className="text-gray-400 transition hover:text-white"
            title="Cerrar sesión"
          >
            <LogOut size={19} />
          </button>
        </div>
      </div>
    </aside>
  );
}
