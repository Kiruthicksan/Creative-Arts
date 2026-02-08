import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

// Layouts and Components
import GuestLayout from "./layouts/GuestLayout";
import AdminLayout from "./layouts/AdminLayout";
import CustomerLayout from "./layouts/CustomerLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import HomePage from "./pages/Guest/HomePage";
import LoginPage from "./pages/Guest/LoginPage";
import ProductDetailsPage from "./pages/Guest/ProductDetailsPage";
import BrowsePage from "./pages/Guest/BrowsePage";
import CustomerDashboard from "./pages/Customer/CustomerDashboard";
import CartPage from "./pages/Customer/CartPage";
import PaymentPage from "./pages/Customer/PaymentPage";
import ConfirmationPage from "./pages/Customer/ConfirmationPage";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ProductsPage from "./pages/Admin/ProductsPage";
import ProfilePage from "./pages/Customer/ProfilePage";

// Stores
import useAuthStore from "./store/useAuthStore";
import useCartStore from "./store/useCartStore";
import useAssetsStore from "./store/useAssetsStore";

// The ScrollRestoration component only works inside a Data Router
import { ScrollRestoration } from "react-router-dom";
import Library from "./pages/Customer/Library";
import Users from "./pages/Admin/Users";
import AddProductPage from "./pages/Admin/AddProductPage";
import OrdersPage from "./pages/Admin/OrdersPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <>
          {<ScrollRestoration />}
          <Outlet />
        </>
      }
    >
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />

      {/* Guest Routes */}
      <Route element={<GuestLayout />}>
        <Route index element={<HomePage />} />
        <Route path="product/:id" element={<ProductDetailsPage />} />
        <Route path="browse" element={<BrowsePage />} />
        <Route
          path="graphics"
          element={<BrowsePage category="Graphic Design" />}
        />
        <Route
          path="illustrations"
          element={<BrowsePage category="Illustrations" />}
        />
        <Route path="ebooks" element={<BrowsePage category="Short Novels" />} />
        <Route path="posters" element={<BrowsePage category="Posters" />} />
        <Route
          path="concept-art"
          element={<BrowsePage category="ConceptArt" />}
        />
        <Route path="others" element={<BrowsePage category="Other" />} />
      </Route>

      {/* Customer Routes */}
      <Route element={<ProtectedRoute allowedRoles={["customer"]} />}>
        <Route element={<CustomerLayout />}>
          <Route path="home" element={<CustomerDashboard />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="confirmation-page" element={<ConfirmationPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="library" element={<Library />} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route element={<AdminLayout />}>
          <Route path="admin-dashboard" element={<AdminDashboard />} />
          <Route path="admin-products" element={<ProductsPage />} />
          <Route path="admin-products/add" element={<AddProductPage />} />
          <Route path="admin-products/edit/:id" element={<AddProductPage />} />
          <Route path="admin-users" element={<Users />} />
          <Route path="admin-orders" element={<OrdersPage />} />
        </Route>
      </Route>
    </Route>,
  ),
);

const App = () => {
  const { profile } = useAuthStore();
  const { getAssets } = useAssetsStore();
  const { getCart } = useCartStore();

  useEffect(() => {
    profile();
    getAssets();
    getCart();
  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router}>
        <ScrollRestoration />
      </RouterProvider>
    </>
  );
};

export default App;
