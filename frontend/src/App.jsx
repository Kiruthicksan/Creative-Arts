import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GuestLayout from './layouts/GuestLayout';
import HomePage from './pages/Guest/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import CustomerDashboard from './pages/Customer/CustomerDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Guest Routes */}
        <Route element={<GuestLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        <Route element = {<ProtectedRoute allowedRoles={['customer']} />}>
          <Route path="/dashboard" element={<CustomerDashboard />} />
        </Route>

        <Route element = {<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;