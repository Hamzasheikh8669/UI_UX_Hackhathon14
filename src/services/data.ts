"use server";

import { client } from "@/sanity/lib/client";

// Product Types
export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  productImage: string;
  isNew: boolean;
  dicountPercentage: number;
  tags: string[];
}

// Blog Types
export interface Blog {
  blogDate: string;
  blogUser: string;
  blogTitle: string;
  blogDescription: string;
  blogIcon: string;
  blogImage: string;
}

export interface BlogCategory {
  categoryNumber: number;
  categoryName: string;
}

export interface RelatedPost {
  relatedPostDate: string;
  relatedPostTitle: string;
  relatedPostImage: string;
}

// Product Fetching Functions
export async function fetchProducts(): Promise<Product[]> {
  const res = await client.fetch(`
    *[_type=='product'][]{
      _id,
      title,
      description,
      price,
      'productImage': productImage.asset->url,
      isNew,
      dicountPercentage,
      tags
    }
  `);
  return res;
}

export async function fetchBlogCategories(): Promise<BlogCategory[]> {
  const query = `
    *[_type=='blogPage'][0].sections[2].categorySection[] {
      categoryNumber,
      categoryName
    }
  `;
  return await client.fetch(query);
}

export async function fetchRelatedPosts(): Promise<RelatedPost[]> {
  const query = `
    *[_type=='blogPage'][0].sections[3].relatedPostMain[] {
      relatedPostDate,
      relatedPostTitle,
      'relatedPostImage': relatedPostImage.asset->url
    }
  `;
  return await client.fetch(query);
}

export async function fetchBlogs(): Promise<Blog[]> {
  const res: Blog[] = await client.fetch(`
    *[_type=='blogPage'][0].sections[0].blog[]{
      blogDate,
      blogUser,
      blogTitle,
      blogDescription,
      blogIcon,
      'blogImage': blogImage.asset->url
    }
  `);
  return res;
}
