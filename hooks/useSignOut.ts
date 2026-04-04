"use client";

import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export function useSignOut() {

    async function signOut() {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success("Logout successfully")
                    window.location.href = "/"
                },
                onError: () => {
                    toast.error("Failed to logout")
                }
            }
        });
    }

    return { signOut }
}