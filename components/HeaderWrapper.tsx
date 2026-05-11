"use client";

import dynamic from "next/dynamic";

const ConditionalHeader = dynamic(() => import("./ConditionalHeader"), {
  ssr: false,
});

export default function HeaderWrapper() {
  return <ConditionalHeader />;
}
