// lib/sanity.ts
import { client } from "./client";

type CacheProfile = "page" | "layout" | "max" | "default";

export async function sanityFetch<T = any>({
  query,
  params = {},
  tags = [],
  profile = "page" as CacheProfile, // Default to 'page'
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
  profile?: CacheProfile;
}): Promise<T> {
  try {
    // For development, skip cache
    if (process.env.NODE_ENV === "development") {
      return await client.fetch(query, params, {
        next: { revalidate: 0 },
      });
    }

    // For production, use cache profiles
    const cacheConfig: any = {
      next: { tags },
    };

    // Only add revalidate if profile is not 'max'
    if (profile !== "max") {
      cacheConfig.next.revalidate = profile === "layout" ? 3600 : 60;
    }

    return await client.fetch(query, params, cacheConfig);
  } catch (error) {
    console.error("Sanity fetch error:", error);
    throw error;
  }
}
