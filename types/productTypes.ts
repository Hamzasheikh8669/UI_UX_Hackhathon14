export interface Product {
  _id: string;
  productName: string;
  _type: "product";
  title: string;
  description?: string;
  price: number;
  productImage?: {
    asset: {
      _ref: string;
      _type: "image";
    };
  };
  dicountPercentage: number
}
