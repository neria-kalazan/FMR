export interface Client {
  id: number;
  name: string;
  id_number: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  address: Address[];
  phone: Phone[];
  product_client?: ProductClientLink[];
}

export interface Address {
  id: number;
  customer_id: number;
  type: string;
  city: string;
  street: string;
  house_number: number;
  pob: string;
  zip_number: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
export interface Phone {
  id: number;
  customer_id: number;
  type: string;
  phone_number: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  deposit: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface ProductClientLink {
  customer_id: number;
  product_id: number;
  deposit: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  product?: Product;
}

