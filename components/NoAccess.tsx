import { SignInButton, SignUpButton } from "@clerk/nextjs";
import Logo from "./Logo";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";

export default function NoAccess({
  details = "Log in to view your cart items and checkout. Don't miss our on your favorite products!",
}: {
  details?: string;
}) {
  return (
    <div className=" py-12 md:py-32 bg-gray-100 p-5">
      <Card className="w-full max-w-md mx-auto p-5">
        <CardHeader className="flex flex-col items-center">
          <Logo />
          <CardTitle>Welcome Back!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-center font-medium text-darkColor/80">{details}</p>
          <SignInButton mode="modal">
            <Button
              className="bg-shop_dark_green/80 text-white font-semibold shadow hover:bg-shop_btn_dark_green hoverEffect w-full hover:text-white"
              size={"lg"}
              variant={"outline"}
            >
              Sign In
            </Button>
          </SignInButton>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-muted-foreground text-center">
            Don&rsquo;t have an account
          </div>
          <SignUpButton mode="modal">
            <Button className="w-full" size={"lg"} variant={"outline"}>
              Create an account
            </Button>
          </SignUpButton>
        </CardFooter>
      </Card>
    </div>
  );
}
