export const relatedProductSection = {

  title: 'Related Product Section',
  name: 'relatedProductSection',
  type: 'object',
  fields:[
  
  
      {
          title:'Title',
          name: 'title',
          type: 'string',
      },
  
  
  
      //bar bar
  
      {
          title: 'card',
          name: 'card',
          type: 'array',
          of:[
         {
          title: 'Card Entry',
          name: 'cardEntry',
          type:'object',
          fields:[
              {
                  title: 'Image',
                  name: 'image',
                  type: 'image',
              },
              {
                  title: 'Name',
                  name: 'name',
                  type: 'string',
              },
              {
                  title: 'Description',
                  name: 'description',
                  type: 'string',
              },
              {
                  title: 'Price',
                  name: 'price',
                  type: 'string',
              }
          ]
         }
          ]
      }
  ]
  
  
  
  }