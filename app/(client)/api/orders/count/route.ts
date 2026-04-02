import { backendClient } from "@/sanity/lib/backendClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const userId = req.nextUrl.searchParams.get("userId");

    if (!userId) {
        return NextResponse.json({ count: 0 });
    }

    try {
        const query = `*[_type == "order" && clerkUserId == $userId] {
      _id
    }`;
        const orders = await backendClient.fetch(query, { userId });
        return NextResponse.json({ count: orders.length });
    } catch (error) {
        console.error("Error fetching orders count:", error);
        return NextResponse.json({ count: 0 });
    }
}