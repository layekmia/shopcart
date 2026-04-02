"use server";

import { auth } from "@clerk/nextjs/server";
import { backendClient } from "@/sanity/lib/backendClient";
import { revalidatePath } from "next/cache";

export async function getOrdersCount() {
    try {
        const { userId } = await auth();

        if (!userId) {
            return { count: 0, error: null };
        }

        const query = `*[_type == "order" && clerkUserId == $userId] {
      _id
    }`;

        const orders = await backendClient.fetch(query, { userId });


        revalidatePath("/");
        revalidatePath("/orders");

        return { count: orders.length, error: null };

    } catch (error) {
        console.error("Error fetching orders count:", error);
        return { count: 0, error: "Failed to fetch orders" };
    }
}