import type { MarkerType } from "./marker";

export const markers: MarkerType[] = [
  { id: "Amazonia", lat: 1.0, lng: -72.65 },
  { id: "Hurricane", lat: 31.87, lng: -70.0 },
  { id: "Temperature", lat: 38.35, lng: -3.67 },
  { id: "Sea surface temp", lat: 0.75, lng: -111.0 },
];

export const popupContent = [
  {
    id: "Amazonia",
    title: "Amazon. Brazil",
    subtitle: "Diurnal precipitation cycle",
    description:
      "The diurnal precipitation cycle over the Amazon rainforest highlights the complex interactions and feedbacks between atmosphere and land. The diurnal rainfall, maintained by moisture inflow from the Atlantic ocean into the Amazon basin, arises due to evapotranspiration and moisture recycling from the dense forest. This self-sustained cycle is in turn driven by sharp contrasts in temperature between day and night.",
    video: "/videos/stream-videos/tooltip-tp_amazonia_10km_square/index.m3u8",
    legend: {
      image: "/images/home-legend-1.svg",
      low: "0.0 m³/m²",
      high: "0.1 m³/m²",
    },
  },
  {
    id: "Hurricane",
    title: "North Atlantic Ocean",
    subtitle: "Tropical cyclone track",
    description:
      "Tropical cyclones in the North Atlantic Ocean typically form near the equator and propogate westward, often curving northward as they approach the Caribbean or the east coast of the US. These powerful storms are steered by trade winds and ocean currents, impacting coastal regions with strong winds, heavy rainfall, and storm surges.",
    video: "/videos/stream-videos/tooltip-cloud_cover_10km_square/index.m3u8",
    legend: {
      image: "/images/home-legend-2.svg",
      low: "0%",
      high: "100%",
    },
  },
  {
    id: "Temperature",
    title: "Pyrenees. Iberian Peninsula",
    subtitle: "Diurnal temperature cycle",
    description:
      "The diurnal temperature cycle over the Pyrenees in the Iberian Peninsula describes the significant temperature fluctuations between day and night. During the day, sunlight heats the region, while at night, temperatures drop rapidly due to clear skies and high altitude, creating a marked difference in daily and nightly temperatures.",
    video: "videos/stream-videos/tooltip-tas_10km_square/index.m3u8",
    legend: {
      image: "/images/home-legend-spectral.svg",
      low: "20º",
      high: "47º",
    },
  },
  {
    id: "Sea surface temp",
    title: "Pacific Ocean. Ecuador",
    subtitle: "Ocean eddies and currents",
    description:
      "Ocean eddies and currents off the coast of Ecuador in the Pacific Ocean play a key role in shaping local marine ecosystems. The warm waters of the equatorial current interact with cooler, nutrient-rich upwellings (deep water), creating swirling currents, known as eddies, that support diverse marine life and influence weather patterns.",
    video: "videos/stream-videos/tooltip-sst_10km_square/index.m3u8",
    legend: {
      image: "/images/home-legend-4.svg",
      low: "20º",
      high: "30º",
    },
  },
];
