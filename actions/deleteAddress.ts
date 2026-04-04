"use server"

import { backendClient } from "@/sanity/lib/backendClient";


export async function deleteAddress(addressId: string) {

    try {
        const result = await backendClient.delete(addressId);
        return { success: true, data: result }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}