export const ourProducts = {
  title: "Our Products",
  name: "ourProducts",
  type: "object",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
    },

    {
      title: "Our Products Card",
      name: "ourProductsCard",
      type: "array",
      of: [
        {
          title: "Product Card",
          name: "productCard",
          type: "object",
          fields: [
            {
              title: "Product Image",
              name: "productImage",
              type: "image",
            },
            {
              title: "Product Name",
              name: "productName",
              type: "string",
            },
            {
              title: "Product Price",
              name: "productPrice",
              type: "string",
            },
            {
              title: "Product Description",
              name: "productDescription",
              type: "string",
            },
            {
              title: "Product Original Price",
              name: "productOriginalPrice",
              type: "string",
            },
          ],
        },
      ],
    },
  ],
};
