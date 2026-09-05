import { Routes, Route } from "react-router";
import {
  LoginPage,
  ReceptionViewPage,
  StaffViewPage,
  TableViewPage,
  AdminViewPage,
} from "./pages";
import PrivateRoute from "./guards/privateRoute";
import GuestRoute from "./guards/guestRoute";
import { HomeRedirect } from "./components";

function App() {
  return (
    <>
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
          path="/dashboard"
          element={
            <PrivateRoute allowedRole={["admin"]}>
              <AdminViewPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/tables"
          element={
            <PrivateRoute allowedRole={["staff", "recepcion"]}>
              <StaffViewPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/recepcion"
          element={
            <PrivateRoute allowedRole={["recepcion"]}>
              <ReceptionViewPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/tables/:number"
          element={
            <PrivateRoute allowedRole={["staff", "recepcion"]}>
              <TableViewPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
