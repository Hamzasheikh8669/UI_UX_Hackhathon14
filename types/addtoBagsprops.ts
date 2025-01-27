// File: /types/AddToBagProps.ts

export interface AddToBagProps {
  /**
   * If you always have an id, keep it required (id: string).
   * If sometimes you don't have one, make it optional: (id?: string).
   */
  id: string;
  name: string;
  price: number;
  currency: string;
  productImage: string;
  description: string;
  price_id: string;

  /**
   * images can be either:
   * - string (a direct URL), or
   * - an object with an .asset.url property
   */
  images?: (string | { asset: { url: string } })[];
}
