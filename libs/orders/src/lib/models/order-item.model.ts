import { Product } from '@eshop/products';

export class OrderItem {
  product?: Product | string;
  quantity?: number;
}
