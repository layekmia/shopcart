import Logo from "./Logo";
import { AuthForm } from "./SignInForm";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

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
        <CardContent className="space-y-2 flex flex-col items-center">
          <p className="text-center font-medium text-darkColor/80">{details}</p>

          <AuthForm />
        </CardContent>
      </Card>
    </div>
  );
}
