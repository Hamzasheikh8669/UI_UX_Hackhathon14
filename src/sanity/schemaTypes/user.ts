export const userSchema= {
  name: 'user',
  type: 'document',
  title: 'User',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'userId',
      type: 'string',
      title: 'User ID',
    },
    {
      name: 'email',
      type: 'string',
      title: 'Email',
    },
    {
      name: 'password',
      type: 'string',
      title: 'Password',
    },
    {
      name: 'image',
      type: 'url',
      title: 'User Image',
    },
    
    
  ],
};