import { groq } from "next-sanity";

export const allProducts = groq`*[_type == "product"]`;
export const eight = groq`*[_type == "product"][0..8] `;
export const sixteen = groq`*[_type == "product"][12..27] `;
