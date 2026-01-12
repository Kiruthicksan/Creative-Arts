import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GuestLayout from './layouts/GuestLayout';
import HomePage from './pages/Guest/HomePage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Guest Routes */}
        <Route element={<GuestLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;