"use client";

import dynamic from "next/dynamic";

const ProjectMap = dynamic(() => import("@/components/Map"), { ssr: false });

export default function MapPage() {
  return <ProjectMap />;
}
