"use client";

import dynamic from "next/dynamic";

const ProjectMap = dynamic(() => import("@/components/Map"), { ssr: false });

const MapPage = () => {
  return <ProjectMap />;
};
export default MapPage;
