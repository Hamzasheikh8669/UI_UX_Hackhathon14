export const relatedProduct = {
  title: 'Related Product',
  name: 'relatedProduct',
  type: 'document',
  fields: [{

      title:'Page Sections',
      name:'sections',
      type:'array',    
      of: [
          
          {type: 'relatedProductSection'},
      ],
      }]} ;