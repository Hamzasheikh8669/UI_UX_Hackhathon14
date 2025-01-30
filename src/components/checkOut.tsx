
"use client";

import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";

export interface ProductCart {
  currency: string;
  price: number;   
  description: string;
  productImage: string ; // Assuming images is an array of URLs (update if different)
  name: string;
  key: string;
  price_id: string; // Specify as string if it's a unique identifier
  id: string; // Add the id property
}

export default function AddToBag(props: ProductCart) {
  const { name, price, currency, description, price_id, productImage } = props;
  const { checkoutSingleItem } = useShoppingCart();

  function buyNow(priceId: string) {
    checkoutSingleItem(priceId);
  }

  const product = {
    name: name,
    description: description,
    price: price,
    currency: currency,
    price_id: price_id,
    images: productImage, // Pass images if needed
  };

  return (
    <Button
      variant="outline"
      onClick={() => {
        buyNow(product.price_id);
      }}
    >
      Checkout Now
    </Button>
  );
}
