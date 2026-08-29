import { Routes, Route } from "react-router";
import { LoginPage } from "./pages";
import PrivateRoute from "./guards/privateRoute";
import AdminViewPage from "./pages/admin-view-page";
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
          path="/sala"
          element={
            <PrivateRoute allowedRole={["staff", "recepcion"]}>
              <AdminViewPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/recepcion"
          element={
            <PrivateRoute allowedRole={["recepcion"]}>
              <AdminViewPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
