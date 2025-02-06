export const hero={
  title: 'Hero Section',
  name: 'heroSection',
  type: 'object',
  fields: [
      
      {
          title: 'Small Heading',
          name: 'smallHeading',
          type: 'string',
      },
      {
          title: 'Paragraph',
          name: 'para1',
          type: 'string',
      },
      
      {
          title: 'Main Heading1',
          name: 'mainHeading1',
          type: 'string',
      },
      {
          title: 'Main Heading2',
          name: 'mainHeading2',
          type: 'string',
      },
      
      {
          title: 'Button Text',
          name: 'btnText',
          type: 'string',
      },
      {
          title: 'Hero Image',
          name: 'heroImage',
          type: 'image',
          options: {
              hotspot: true, // Allows for focus cropping
            },

      },
      
  ]
}