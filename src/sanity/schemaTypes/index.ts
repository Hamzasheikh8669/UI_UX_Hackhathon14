
import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product'

import { comment } from './comment/comment'


import { ourProducts } from './landingPage-sections/ourProducts'
import { mainBox } from './pcSection/mainBox'
import { pC } from './pcSection/pc'
import { relatedProduct } from './relatedProduct-section/relatedProduct'
import { relatedProductSection } from './relatedProduct-section/relatedProductSection'

import { landingPage } from './landingPage-sections/landingPage'
import { hero } from './landingPage-sections/hero'
import { blogPage } from './blogPage-sections/blogPage'
import { blogMain } from './blogPage-sections/blogMain'
import { category } from './blogPage-sections/category'
import { relatedPost } from './blogPage-sections/relatedPost'
import { browseSection } from './landingPage-sections/browseSection'
import { funiroSection } from './landingPage-sections/funiroSection'
import { userSchema } from './user'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blogPage,blogMain,category,relatedPost,product,comment,landingPage,hero,browseSection,funiroSection,ourProducts,mainBox,pC,relatedProduct,relatedProductSection,userSchema],
}
