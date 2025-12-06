import { type SchemaTypeDefinition } from "sanity";
import { categoryType } from "./categoryType";
import { blockContentType } from "./blockContentType";
import { productType } from "./productType";
import { orderType } from "./orderType";
import { brandType } from "./brandTypes";
import { blogType } from "./blogType";
import { blogCategory } from "./blogCategoryType";
import { authorType } from "./authorType";
import { bannerType } from "./BannerType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    bannerType,
    categoryType,
    blockContentType,
    productType,
    orderType,
    brandType,
    blogType,
    blogCategory,
    authorType
  ],
};
