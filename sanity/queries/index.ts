import { sanityFetch } from "../lib/live";
import {
  BRAND_QUERY,
  BRANDS_QUERY,
  DEAL_PRODUCTS,
  LATEST_BLOG_QUERY,
  MY_ORDERS_QUERY,
  PRODUCT_BY_SLUG_QUERY,
  GET_ALL_BLOG,
  SINGLE_BLOG_QUERY,
  OTHERS_BLOG_QUERY,
  BLOG_CATEGORIES,
} from "./query";

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

const getProductBySlug = async (slug: string) => {
  try {
    const { data } = await sanityFetch({
      query: PRODUCT_BY_SLUG_QUERY,
      params: { slug },
    });
    return data || null;
  } catch (error: any) {
    console.log("Error fetching single product", error.message);
    return null;
  }
};
const getBrand = async (slug: string) => {
  try {
    const product = await sanityFetch({
      query: BRAND_QUERY,
      params: {
        slug,
      },
    });
    return product?.data || null;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
};

const getMyOrders = async (userId: string) => {
  try {
    const orders = await sanityFetch({
      query: MY_ORDERS_QUERY,
      params: { userId },
    });
    return orders?.data || null;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
};


const getAllBlogs = async (quantity: number) => {
  try {
    const { data } = await sanityFetch({
      query: GET_ALL_BLOG,
      params: { quantity },
    });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching all brands:", error);
    return [];
  }
};

const getSingleBlog = async (slug: string) => {
  try {
    const { data } = await sanityFetch({
      query: SINGLE_BLOG_QUERY
      ,
      params: { slug },
    });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching all brands:", error);
    return [];
  }
};

const getOthersBlog = async (slug: string, quantity: number) => {
  try {
    const { data } = await sanityFetch({
      query: OTHERS_BLOG_QUERY,
      params: { slug, quantity },
    });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching all brands:", error);
    return [];
  }
};

const getBlogCategories = async () => {
  try {
    const { data } = await sanityFetch({
      query: BLOG_CATEGORIES,
    });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching all brands:", error);
    return [];
  }
};


export {
  getCategories,
  getAllBrands,
  getLatestBlogs,
  getDealProducts,
  getProductBySlug,
  getBrand,
  getMyOrders,
  getAllBlogs,
  getSingleBlog,
  getOthersBlog,
  getBlogCategories
};
