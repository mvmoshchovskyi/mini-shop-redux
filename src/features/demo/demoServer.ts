import type { Product } from '../../types/product';

// A tiny in-memory "server". Unlike fakestoreapi, PUT/POST requests here
// actually change the data, and that lets us demo real cache updates.
const seedProducts: Product[] = [
  { id: 1, title: 'Mechanical keyboard', price: 120, image: 'keyboard.jpg' },
  { id: 2, title: 'Wireless mouse', price: 60, image: 'mouse.jpg' },
  { id: 3, title: '27" monitor', price: 320, image: 'monitor.jpg' },
  { id: 4, title: 'USB-C hub', price: 45, image: 'hub.jpg' },
  { id: 5, title: 'Noise-cancelling headphones', price: 210, image: 'headphones.jpg' },
  { id: 6, title: 'Laptop stand', price: 75, image: 'stand.jpg' },
  { id: 7, title: 'Portable SSD 1TB', price: 140, image: 'ssd.jpg' },
  { id: 8, title: 'Webcam 1080p', price: 85, image: 'webcam.jpg' },
];

const QUERY_LATENCY_MS = 900;
const MUTATION_LATENCY_MS = 1400;

const delay = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

const cloneProduct = (product: Product): Product => ({ ...product });

let products = seedProducts.map(cloneProduct);

export const demoServer = {
  async getProducts(): Promise<Product[]> {
    await delay(QUERY_LATENCY_MS);

    return products.map(cloneProduct);
  },

  async updateProduct(
    id: number,
    changes: Partial<Product>,
    simulateError = false,
  ): Promise<Product> {
    await delay(MUTATION_LATENCY_MS);

    if (simulateError) {
      throw new Error(`Fake server rejected the update for product #${id}`);
    }

    const index = products.findIndex((product) => product.id === id);

    if (index === -1) {
      throw new Error(`Product #${id} was not found on the fake server`);
    }

    products[index] = { ...products[index], ...changes };

    return cloneProduct(products[index]);
  },
};
