// app/api/search/route.ts
import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET(request: NextRequest) {
  try {
    // Get search query from URL
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q") || "";
    const limit = parseInt(searchParams.get("limit") || "10");

    // Sanitize query for GROQ (escape special characters)
    const sanitizedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const groqQuery = `*[_type == "product" && (
  name match $searchQuery ||
  description match $searchQuery ||
  categories[]->name match $searchQuery ||
  brand->name match $searchQuery
)] | order(_updatedAt desc) [0...$limit] {
  ...,
  "categories": categories[]->title
}`;

    // Execute query with parameters
    const products = await client.fetch(groqQuery, {
      searchQuery: `${sanitizedQuery}*`, // Wildcard search
      limit: limit,
    });

    return NextResponse.json({
      success: true,
      products,
      count: products.length,
      query: query,
    });
  } catch (error: any) {
    console.error("Search API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Search failed",
        products: [],
        count: 0,
      },
      { status: 500 }
    );
  }
}
