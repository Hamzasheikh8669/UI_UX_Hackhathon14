
export const relatedPost = {

  name: 'relatedPost',
  title: 'Related Post',
  type: 'object',
  fields: [
      {
      name: 'relatedPostMain',
      title: 'Related Post Main',
      type: 'array',
      of: [
          {
              title: 'Related Post Entry',
              name: 'relatedPostEntry',
              type: 'object',
              fields: [
                  {
                  title: 'Related Post Image',
                  name: 'relatedPostImage',
                  type: 'image',
                  },
                  {
                      title: 'Related Post Title',
                      name: 'relatedPostTitle',
                      type: 'string',
                  },
                  {
                      title: 'Related Post Date',
                      name: 'relatedPostDate',
                      type: 'string',
                  }
              ]
         
          
          },
      ],
      },
  ],
}
