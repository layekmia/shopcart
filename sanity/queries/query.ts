import { defineQuery } from "next-sanity";

const BRANDS_QUERY = defineQuery(`*[_type=='brand'] | order(title asc)`);

const LATEST_BLOG_QUERY =
  defineQuery(`*[_type == 'blog' && isLatest == true] | order(name asc){
    ...,blogcategories[]->{
    title}
    }`);

const DEAL_PRODUCTS =
  defineQuery(`*[_type == 'product' && status == 'hot'] | order(name asc){
  ...,"category":categories[]->title}`);

const PRODUCT_BY_SLUG_QUERY = defineQuery(
  `*[_type == "product" && slug.current == $slug][0]`
);

const BRAND_QUERY = defineQuery(`*[_type == "product" && slug.current == $slug]{
  "brandName": brand->title
  }`);

const MY_ORDERS_QUERY =
  defineQuery(`*[_type == 'order' && clerkUserId == $userId] | order(orderData desc){
...,products[]{
  ...,product->
}
}`);

export {
  BRANDS_QUERY,
  LATEST_BLOG_QUERY,
  DEAL_PRODUCTS,
  PRODUCT_BY_SLUG_QUERY,
  BRAND_QUERY,
  MY_ORDERS_QUERY,
};
