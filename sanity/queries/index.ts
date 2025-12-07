import { sanityFetch } from "../lib/live";
import { BRANDS_QUERY, DEAL_PRODUCTS, LATEST_BLOG_QUERY } from "./query";

const getCategories = async (quantity?: number) => {
  try {
    const query = quantity
      ? `*[_type == 'category'] | order(name asc) [0...$quantity] { 
      ...,"productCount":count(*[_type == "product" && references(^._id)])}`
      : `*[_type == 'category'] | order(name asc) {
      ...,"productCount":count(*[_type == "product" && references(^._id)])}`;

    const { data } = await sanityFetch({
      query,
      params: quantity ? { quantity } : {},
    });

    return data;
  } catch (err) {
    console.log("Error fetching categories", err);
    return [];
  }
};

const getAllBrands = async () => {
  try {
    const { data } = await sanityFetch({ query: BRANDS_QUERY });
    return data;
  } catch (err: any) {
    console.log("Error fetching all brands", err.message);
    return [];
  }
};

const getLatestBlogs = async () => {
  try {
    const { data } = await sanityFetch({ query: LATEST_BLOG_QUERY });
    return data;
  } catch (err: any) {
    console.log("Error fetching latest Blogs", err.message);
    return [];
  }
};
const getDealProducts = async () => {
  try {
    const { data } = await sanityFetch({ query: DEAL_PRODUCTS });
    return data;
  } catch (err: any) {
    console.log("Error fetching hot deal product", err.message);
    return [];
  }
};

export { getCategories, getAllBrands, getLatestBlogs, getDealProducts };
