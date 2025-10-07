"use client";

import { useState } from "react";
import Header from "./Header";
import HireCards from "./HireCards";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="p-4">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <HireCards/>
    </div>
  );
}
