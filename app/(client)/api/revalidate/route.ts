import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    // 1. Verify secret
    const secret = request.nextUrl.searchParams.get("secret");
    const expectedSecret = process.env.SANITY_REVALIDATE_SECRET;

    if (!expectedSecret) {
      return NextResponse.json(
        { error: "Server misconfiguration" },
        { status: 500 }
      );
    }

    if (secret !== expectedSecret) {
      return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
    }

    // 2. Get webhook data
    const body = await request.json();

    const { _type, _id, slug } = body;

    if (!_type) {
      return NextResponse.json({ error: "Missing _type" }, { status: 400 });
    }

    // 3. Revalidate with correct profiles
    if (_type === "product") {
      // Product pages - 'page' profile
      revalidateTag(`product-${_id}`, "page");
      revalidateTag("products", "page");

      if (slug) {
        revalidateTag(`product-slug-${slug}`, "page");
      }

      // Homepage sections - 'layout' profile
      revalidateTag("best-sellers", "layout");
      revalidateTag("new-arrivals", "layout");
      revalidateTag("homepage", "layout");
    } else if (_type === "banner") {
      revalidateTag("banners", "layout");
      revalidateTag("homepage", "layout");
    } else if (_type === "category") {
      revalidateTag("categories", "layout");
      revalidateTag("homepage", "layout");
    } else if (_type === "testimonial") {
      revalidateTag("testimonials", "layout");
      revalidateTag("homepage", "layout");
    }

    // Always revalidate layout
    revalidateTag("layout", "layout");

    return NextResponse.json({
      success: true,
      revalidatedAt: new Date().toISOString(),
      documentType: _type,
    });
  } catch (err: any) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
