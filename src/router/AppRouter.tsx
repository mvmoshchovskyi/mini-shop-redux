import { Navigate, Route, Routes } from 'react-router-dom';

import { Cart } from '../components/cart/Cart';
import { ShopPage } from '../pages/ShopPage';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<ShopPage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
