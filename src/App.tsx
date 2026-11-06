import { ProductList } from './components/product-list/ProductList';
import { Cart } from './components/cart/Cart';

function App() {
  return (
    <main>
      <h1>Mini Shop</h1>

      <ProductList />
      <Cart />
    </main>
  );
}

export default App;
