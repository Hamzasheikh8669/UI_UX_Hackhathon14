import { groq } from "next-sanity";

export const allProducts = groq`*[_type == "product"]{price,tags,dicountPercentage,isNew}`;
export const four = groq`*[_type == "product"][0..3] `;