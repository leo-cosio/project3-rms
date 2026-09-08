import { Routes, Route } from "react-router";

import {
  LoginPage,
  ReceptionViewPage,
  StaffViewPage,
  TableViewPage,
  AdminViewPage,
  AdminTablesPage,
  AdminUsersPage,
  AdminItemsPage,
} from "./pages";

import PrivateRoute from "./guards/privateRoute";
import GuestRoute from "./guards/guestRoute";

import { HomeRedirect } from "./components";

function App() {
  return (
    <Routes>
      <Route index element={<HomeRedirect />} />

      <Route
        path="/login"
        element={
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <PrivateRoute allowedRole={["admin"]}>
            <AdminViewPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/tables"
        element={
          <PrivateRoute allowedRole={["admin"]}>
            <AdminTablesPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/items"
        element={
          <PrivateRoute allowedRole={["admin"]}>
            <AdminItemsPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <PrivateRoute allowedRole={["admin"]}>
            <AdminUsersPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/tables"
        element={
          <PrivateRoute allowedRole={["staff", "reception"]}>
            <StaffViewPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/tables/:number"
        element={
          <PrivateRoute allowedRole={["staff", "reception"]}>
            <TableViewPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/recepcion"
        element={
          <PrivateRoute allowedRole={["reception"]}>
            <ReceptionViewPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
