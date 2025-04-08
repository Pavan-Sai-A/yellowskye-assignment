"use client";
import { useRouter } from "next/navigation";
import { Project } from "@/lib/sampleData";
import MapComponent from "./common/MapComponent";
import Badge from "./common/Badge";

const ProjectCard = ({ project }: { project: Project }) => {
  const router = useRouter();

  return (
    <div
      role="none"
      onClick={() => router.push(`/project/${project.id}`)}
      className="relative bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition duration-200 cursor-pointer border border-gray-100 hover:border-blue-200 overflow-hidden group"
    >
      <MapComponent
        lat={project.lat}
        lon={project.lon}
        className="absolute top-4 right-4 w-24 h-24 rounded-md border border-gray-200 z-10"
      />

      <div className="pr-28">
        <div className="flex justify-between items-start mb-3 gap-2">
          <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors truncate">
            {project.name}
          </h2>
        </div>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-3">
          <Badge
            label={`${project.images.length} ${
              project.images.length === 1 ? "Image" : "Images"
            }`}
          />
          <Badge
            label={`${project.videos.length} ${
              project.videos.length === 1 ? "Video" : "Videos"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
