"use client";
import dynamic from "next/dynamic";

const GlobeContainer = dynamic(() => import("@/components/globe/globe-container"), { ssr: false });
 
export default function GlobeClient() {
  return <GlobeContainer />;
} 