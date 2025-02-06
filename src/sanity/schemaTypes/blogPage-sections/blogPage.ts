
export const blogPage= {
  title: 'Blog Page',
  name: 'blogPage',
  type: 'document',
  fields: [{

title:'Page Sections',
name:'sections',
type:'array',    
of: [
  
  {type: 'blogMain'},
  {type: 'category'},
  {type: 'relatedPost'},

],
  }]}
