"use client";

import { useState } from "react";
import { sampleProjects } from "@/lib/sampleData";
import ProjectCard from "@/components/ProjectCard";

const ProjectsPage = () => {
  const [query, setQuery] = useState("");

  const filteredProjects = sampleProjects.filter((project) =>
    project.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6 ">
      <div className="relative">
        <input
          type="text"
          placeholder="Search projects..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />
        <svg
          className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {filteredProjects.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-600">
            {query
              ? "No projects match your search."
              : "You don't have any projects yet."}
          </p>
        </div>
      )}
    </div>
  );
};
export default ProjectsPage;
