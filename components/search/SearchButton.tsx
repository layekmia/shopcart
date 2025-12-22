"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { SearchModal } from "./SearchModal";

export default function SearchButton() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded-md hover:bg-muted"
        aria-label="Search"
      >
        <Search className="w-5 h-5 hover:text-shop_light_green hoverEffect" />
      </button>

      <SearchModal open={open} setOpen={setOpen} />
    </>
  );
}
