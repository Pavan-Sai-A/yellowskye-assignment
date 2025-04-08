"use client";
import { useEffect, useRef } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Icon, Style } from "ol/style";
import { fromLonLat } from "ol/proj";
import { useRouter } from "next/navigation";
import { sampleProjects } from "@/lib/sampleData";

const ProjectMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!mapRef.current) return;

    const features = sampleProjects.map((project) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([project.lon, project.lat])),
        name: project.name,
        projectId: project.id,
      });

      feature.setStyle(
        new Style({
          image: new Icon({
            anchor: [0.5, 1],
            src: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
            scale: 0.05,
          }),
        })
      );

      return feature;
    });

    const vectorSource = new VectorSource({ features });
    const vectorLayer = new VectorLayer({ source: vectorSource });

    const map = new Map({
      target: mapRef.current,
      layers: [new TileLayer({ source: new OSM() }), vectorLayer],
      view: new View({
        center: fromLonLat([78.5, 15.5]),
        zoom: 5,
      }),
      controls: [],
    });

    map.on("pointermove", (e) => {
      const featuresAtPixel = map.getFeaturesAtPixel(e.pixel);
      const targetElement = map.getTargetElement();
      if (featuresAtPixel.length > 0) {
        const feature = featuresAtPixel[0];
        const name = feature.get("name");
        targetElement.title = name || "";
        targetElement.style.cursor = "pointer";
      } else {
        targetElement.title = "";
        targetElement.style.cursor = "";
      }
    });

    map.on("singleclick", (evt) => {
      map.forEachFeatureAtPixel(evt.pixel, (feature) => {
        const projectId = feature.get("projectId");
        if (projectId) {
          router.push(`/project/${projectId}`);
        }
      });
    });

    return () => map.setTarget();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-5xl w-full bg-white rounded-lg shadow-md border border-gray-200 p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          Project Locations
        </h1>
        <div
          ref={mapRef}
          className="w-full h-[500px] rounded-md border border-gray-300"
        />
        <p className="text-sm text-gray-500 mt-3">
          Hover over a marker to view its name. Click on any marker to view
          detailed project info.
        </p>
      </div>
    </div>
  );
};
export default ProjectMap;
