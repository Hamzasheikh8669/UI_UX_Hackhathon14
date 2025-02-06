export const blogMain= {
  title: 'Blog Main',
  name: 'blogMain',
  type: 'object',
  fields: [
      {
          title: 'Blog',
          name: 'blog',
          type: 'array',
          of: [
              {
                  title: 'Blog Entry',
                  name: 'blogEntry',
                  type: 'object',
                  fields: [
                      {
                          title: 'Blog Image',
                          name: 'blogImage',
                          type: 'image',
                      },
                      {
                          title: 'Blog Title',
                          name: 'blogTitle',
                          type: 'string',
                      },
                      {
                          title: 'Blog Date',
                          name: 'blogDate',
                          type: 'string',
                      },
                      {
                          title: 'Blog User',
                          name: 'blogUser',
                          type: 'string',
                      },
                      {
                          title: 'Blog Icon',
                          name: 'blogIcon',
                          type: 'string',
                      },
                      {
                          title: 'Blog Description',
                          name: 'blogDescription',
                          type: 'string',
                      },
                  ],
              },
          ],
      },
  ],
};