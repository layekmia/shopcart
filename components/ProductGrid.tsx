"use client";

import { useState } from "react";
import HomeTabBar from "./HomeTabBar";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(null);
    return <div>
      <HomeTabBar/>
  </div>;
}
