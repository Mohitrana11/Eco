export interface newUserRequestBody {
  name: string;
  email: string;
  photo: string;
  role: "admin" | "user";
  gender: ["male", "female"];
  dob: Date;
}
export interface newProductRequestBody {
  name: string;
  photo: string;
  price: Number;
  stock: Number;
  description: string;
  category: string;
}

export interface searchRequestQuery {
  search?: string;
  sort?: string;
  category?: string;
  price?: string;
  page?: string;
}

export interface baseQueryType {
  name?: {
    $regex: string;
    $options: string;
  };
  price?: {
    $lte: number;
  };
  category?: string;
}

export type invalidateCacheType = {
  product?: boolean;
  order?: boolean;
  admin?: boolean;
};

export type OrderItemType = {
  name: string;
  photo: string;
  price: number;
  quantity: number;
  productId: string;
};

export type ShippingInfoType = {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: number;
};

export interface NewOrderRequestBody {
  shippingInfo: ShippingInfoType;
  user: string;
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  orderItems: OrderItemType[];
}
