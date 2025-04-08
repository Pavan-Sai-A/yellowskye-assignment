"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import dynamic from "next/dynamic";
import MediaItem from "@/components/common/MediaItem";
import { sampleProjects } from "@/lib/sampleData";

const MapComponent = dynamic(() => import("@/components/common/MapComponent"), {
  ssr: false,
});

type TabType = "image" | "video";

const tabMapping = {
  image: "images",
  video: "videos",
} as const;

export default function ProjectDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("image");

  const project = sampleProjects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="bg-white p-8 rounded-xl shadow max-w-md w-full text-center">
          <h1 className="text-xl font-bold text-gray-800 mb-2">
            Project Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            The project you are looking for does not exist.
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            ← Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const mediaKey = tabMapping[activeTab];
  const mediaItems = project[mediaKey] ?? [];

  return (
    <div className="min-h-screen max-w-6xl mx-auto bg-white rounded-xl shadow overflow-hidden">
      <div className="p-4 flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800">{project.name}</h1>
          <p className="text-gray-600 mt-2">{project.description}</p>
          <div className="mt-4 inline-block bg-gray-100 px-4 py-2 rounded-md text-sm font-medium text-gray-800">
            {project.metrics.value} {project.metrics.name}
          </div>
        </div>
        <MapComponent
          lat={project.lat}
          lon={project.lon}
          className="w-24 h-24 rounded-md overflow-hidden border border-gray-200 shadow-sm"
        />
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex" role="tablist">
          {(["image", "video"] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              role="tab"
              aria-selected={activeTab === tab}
              aria-controls={`${tab}-panel`}
              id={`${tab}-tab`}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                activeTab === tab
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} (
              {project[tabMapping[tab]]?.length || 0})
            </button>
          ))}
        </nav>
      </div>

      <div
        className="p-4"
        id={`${activeTab}-panel`}
        role="tabpanel"
        aria-labelledby={`${activeTab}-tab`}
      >
        {mediaItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mediaItems.map((item, i) => (
              <div
                key={`${i + 1}`}
                className="rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition"
              >
                <MediaItem
                  src={item}
                  alt={`${project.name} ${activeTab} ${i + 1}`}
                  title={`${project.name} ${activeTab} ${i + 1}`}
                  type={activeTab}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 py-4 text-center">
            No {activeTab}s available
          </p>
        )}
      </div>
    </div>
  );
}
