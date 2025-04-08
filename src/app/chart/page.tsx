"use client";

import dynamic from "next/dynamic";
const SampleLineChart = dynamic(() => import("@/components/LineChart"), {
  ssr: false,
});

export default function ChartsPage() {
  return <SampleLineChart />;
}
