"use client";

import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";

export default function AddToBag(props: {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  price_id: string;
  productImage: string;
  quantity: number; // Ensure quantity is included in props
}) {
  const {
    id,
    name,
    price,
    currency,
    description,
    price_id,
    productImage,
    quantity, // Destructure quantity from props
  } = props;

  const { addItem, handleCartClick } = useShoppingCart();

  const product = {
    id,
    name,
    price,
    currency,
    description,
    productImage: productImage || "/fallback.jpg", // Ensure fallback image
    sku: price_id,
  };

  const handleAddToCart = () => {
    try {
      // Add item to cart with the specified quantity
      addItem(product, { count: quantity });
      console.log(`Added ${quantity} ${name}(s) to cart`);

      // Open the cart drawer (if handleCartClick is available)
      if (typeof handleCartClick === "function") {
        handleCartClick();
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return <Button onClick={handleAddToCart}>Add To Cart</Button>;
}
