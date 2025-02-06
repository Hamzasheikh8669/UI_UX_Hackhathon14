
export const browseSection = {
  title: 'Browse Section',
  name: 'browseSection',
  type: 'object',
  fields: [
  
      
      
      //bar bar change
      {
              title: 'card',
              name: 'card',
              type: 'array',
              of:[
             {
                 type:'object',
                 fields: [ 
                  {
                      title: 'Card Image',
                      name: 'cardImage',
                      type:'image',
                  },
                  {
                      title: 'Card Heading',
                      name: 'cardHeading',
                      type: 'string',
                  }

                 ]  
               }
          ]
              
      },
      
  ]
}
