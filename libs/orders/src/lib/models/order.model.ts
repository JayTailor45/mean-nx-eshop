import { OrderItem } from './order-item.model';
import { User } from '@eshop/users';

export class Order {
  id?: string;
  orderItems?: OrderItem[];
  shippingAddress1?: string;
  shippingAddress2?: string;
  city?: string;
  zip?: string;
  country?: string;
  phone?: string;
  status?: string;
  totalPrice?: number;
  user?: User;
  dateOrdered?: string;

}
