"use client";

import { useState, useEffect } from "react";
import Header from "./Header";

export default function ConditionalHeader() {
  const [shouldShowHeader, setShouldShowHeader] = useState(true);
  
  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      setShouldShowHeader(!pathname.startsWith("/studio"));
    }
  }, []);
  
  if (!shouldShowHeader) {
    return null;
  }

  return <Header />;
}
