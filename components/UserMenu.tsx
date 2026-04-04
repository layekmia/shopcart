"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSignOut } from "@/hooks/useSignOut";
import { getInitials } from "@/utils/helper";

import {
  ChevronDown,
  Home,
  ListOrdered,
  LogOut,
  ShoppingBagIcon,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";

interface iAppProps {
  name: string;
  email: string;
  image: string | null | undefined;
}

export function UserDropdown({ name, email, image }: iAppProps) {
  const { signOut } = useSignOut();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="focus-visible:ring-0 hover:bg-transparent dark:hover:bg-transparent"
      >
        <Button
          variant="ghost"
          className="flex items-center gap-2 px-2 py-1 rounded-full
                     focus:outline-none focus:ring-0 hover:bg-transparent"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src={image || ""} alt="user" />
            <AvatarFallback>{getInitials(name, email)}</AvatarFallback>
          </Avatar>
          <ChevronDown className="size-5 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="max-w-48" align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">
            {name || getInitials(name, email)}
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            {email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/">
              <Home size={16} className="opacity-60" aria-hidden="true" />
              <span>Home</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/shop">
              <ShoppingBagIcon
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Shop</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard">
              <ShoppingCart
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Cart</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/orders">
              <ListOrdered
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Orders</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={signOut}>
            <LogOut size={16} className="opacity-60" aria-hidden="true" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
