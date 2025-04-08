export interface Project {
  id: string;
  name: string;
  description: string;
  lat: number;
  lon: number;
  images: string[];
  videos: string[];
  metrics: {
    name: string;
    value: number;
  };
}

export const sampleProjects: Project[] = [
  {
    id: "201",
    name: "Hyderabad Metro Rail",
    description:
      "A rapid transit system serving Hyderabad, aiming to reduce traffic congestion and improve urban mobility.",
    lat: 17.385044,
    lon: 78.486671,
    images: [
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
    ],
    videos: ["https://www.youtube.com/embed/fzuZuv0bHB4"],
    metrics: {
      name: "Stations Completed",
      value: 56,
    },
  },
  {
    id: "202",
    name: "Chennai Smart City Initiative",
    description:
      "An initiative to transform Chennai into a sustainable and citizen-friendly city through various development projects.",
    lat: 13.08268,
    lon: 80.270721,
    images: [
      "https://images.unsplash.com/photo-1587474260584-136574528ed5",
      "https://images.unsplash.com/photo-1587474260584-136574528ed5",
    ],
    videos: ["https://www.youtube.com/embed/1mUklkY8IPE"],
    metrics: {
      name: "Green Spaces Created",
      value: 25,
    },
  },
  {
    id: "203",
    name: "Bangalore Metro Rail Project",
    description:
      "Also known as Namma Metro, this project aims to provide an efficient and eco-friendly transit solution in Bangalore.",
    lat: 12.971599,
    lon: 77.594566,
    images: [
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",

      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
    ],
    videos: ["https://www.youtube.com/embed/_akx0hQb_W0"],
    metrics: {
      name: "Passengers Daily (in Thousands)",
      value: 360,
    },
  },
  {
    id: "204",
    name: "Andhra Pradesh Data City",
    description:
      "A 500-acre development in Visakhapatnam aimed at creating a hub for data centers and IT infrastructure.",
    lat: 17.686816,
    lon: 83.218482,
    images: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
      "https://images.unsplash.com/photo-1518770660439-4636190af475",
    ],
    videos: ["https://www.youtube.com/embed/heSeJEEOL30"],
    metrics: {
      name: "Data Centers Operational",
      value: 8,
    },
  },
];
