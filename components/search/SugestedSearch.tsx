import { Search } from "lucide-react";

const suggestedSearches = [
  "43″ Class TU7000 Series Crystal UHD 4K Smart TV",
  "HP Laptop, AMD Ryzen 5 5500U Processor",
  "High Performance Cooling Fan, 4-Pin, 1500 RPM",
  "Intel 13th Gen Core i9 13900KF Raptor Lake Processor",
  "MacBook Pro M4 Max Chip 16-inch (14-core CPU, 32-core GPU)",
  "Philips NA221 4.2 Liter 1500 Watt Air Fryer",
  "Portable Mini Washing Machine, White",
  "Vitamix A3500 Brushed Stainless Blender",
];

interface SuggestedSearchProps {
  onSearchClick: (query: string) => void;
}

export default function SuggestedSearch({
  onSearchClick,
}: SuggestedSearchProps) {
  return (
    <div className="p-1">
      {/* Suggestions List */}
      <div className="space-y-1">
        {suggestedSearches.map((searchText) => (
          <button
            key={searchText}
            onClick={() => onSearchClick(searchText)}
            className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-shop_light_green/20 text-left transition-colors"
          >
            <Search className="w-5 h-5 text-gray-800" />
            <span className="text-darkColor font-medium">{searchText}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
