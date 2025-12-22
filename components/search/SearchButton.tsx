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
        className="flex-1 flex items-center bg-gray-100 rounded-lg px-3 py-1.5"
        aria-label="Search"
      >
        <Search className="w-4 h-4 text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search products..."
          className="w-full bg-transparent outline-none text-sm"
        />
      </button>

      <SearchModal open={open} setOpen={setOpen} />
    </>
  );
}
