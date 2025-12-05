import { SignInButton } from "@clerk/nextjs";

export default function SignIn() {
    return (
        <SignInButton mode="modal">
            <button className="text-sm font-semibold text-lightColor hover:cursor-pointer hover:text-darkColor hoverEffect">Login</button>
        </SignInButton>
    )
}