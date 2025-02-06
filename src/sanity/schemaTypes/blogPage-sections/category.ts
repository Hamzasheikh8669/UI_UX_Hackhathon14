export const category = {

  title: 'Category',
  name: 'category',
  type: 'object',
  fields: [

      {title: 'Category Section',
      name: 'categorySection',
      type: 'array',
      of: [
          {
              title: 'Category Entry',
              name: 'categoryEntry',
              type: 'object',
              fields: [
                  {
                  title: 'Category Name',
                  name: 'categoryName',
                  type: 'string',
                  },
                  {

                  title: 'Category Number',
                  name: 'categoryNumber',
                  type: 'number',
                  }

              ]
          }
      ]

      }
  ]
}