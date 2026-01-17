import { BrowserRouter, Routes, Route } from "react-router-dom";
import GuestLayout from "./layouts/GuestLayout";
import HomePage from "./pages/Guest/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import CustomerDashboard from "./pages/Customer/CustomerDashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminLayout from "./layouts/AdminLayout";
import LoginPage from "./pages/Guest/LoginPage";
import { useEffect } from "react";
import useAuthStore from "./store/useAuthStore";
import CustomerLayout from "./layouts/CustomerLayout";

const App = () => {
  const { user, profile } = useAuthStore();

  useEffect(() => {
    profile();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Guest Routes */}
        <Route element={<GuestLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        {/* Customer Routes */}
        <Route element={<ProtectedRoute allowedRoles={["customer"]} />}>
          <Route element={<CustomerLayout />}>
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          </Route>
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
