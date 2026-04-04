"use server";

import { backendClient } from "@/sanity/lib/backendClient";

export async function createAddress(data: {
    name: string;
    email: string | null | undefined;
    address: string;
    city: string;
    state: string;
    zip: string;
    default: boolean;
    createdAt: string;
}) {
    try {
        if (data.default && data.email) {
            const existingAddresses = await backendClient.fetch(
                `*[_type == "address" && email == $email]`,
                { email: data.email }
            );

            for (const addr of existingAddresses) {
                await backendClient.patch(addr._id).set({ default: false }).commit();
            }
        }

        // Create new address
        const result = await backendClient.create({
            _type: "address",
            ...data,
        });

        return { success: true, data: result };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Error adding address:", error);
        return { success: false, error: error.message || "Failed to add address" };
    }
}