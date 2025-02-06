"use server"
import { client } from "@/sanity/lib/client"

export async function relatedProducts() {
  const products = await client.fetch(`
    *[_type=='product'][] {
      'productImage': productImage.asset->url,
      description,
      dicountPercentage,
      tags,
      isNew,
      title,
      price,
      _id
    }
  `)

  return products
}