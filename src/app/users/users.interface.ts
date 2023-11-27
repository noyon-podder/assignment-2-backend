export type TOrders = {
  productName: string;
  price: number;
  quantity: number;
};
export type TFullName = {
  firstName: string;
  lastName: string;
};
export type TUsers = {
  userId: number;
  username: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  hobbies: string[];
  isActive: boolean;
  address: {
    street: string;
    city: string;
    country: string;
  };
  isDeleted: boolean;
  // orders: TOrders[];
};
