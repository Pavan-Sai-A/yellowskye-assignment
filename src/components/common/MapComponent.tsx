"use client";
import { useEffect, useRef } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Icon, Style } from "ol/style";
import VectorSource from "ol/source/Vector";

interface ProjectMapProps {
  lat: number;
  lon: number;
  className?: string;
}

const MapComponent = ({ lat, lon, className = "" }: ProjectMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const marker = new Feature({
      geometry: new Point(fromLonLat([lon, lat])),
    });

    marker.setStyle(
      new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: "https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-red.png",
          scale: 0.7,
        }),
      })
    );

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: new VectorSource({
            features: [marker],
          }),
        }),
      ],
      view: new View({
        center: fromLonLat([lon, lat]),
        zoom: 10,
      }),
      controls: [],
    });

    return () => map.setTarget(undefined);
  }, [lat, lon]);

  return (
    <div
      ref={mapRef}
      className={`rounded-lg border border-gray-200 overflow-hidden ${className}`}
    />
  );
};
export default MapComponent;
