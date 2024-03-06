/* export interface Cart {
  items: Product[];
} */

/* 
export interface CartState {
  products: Product[];
  totalAmount: number;
  productsCount: number;
}
 */

interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
  rating: Rating;
  quantity: number;
  subTotal: number;
  isDesired: boolean;
}
