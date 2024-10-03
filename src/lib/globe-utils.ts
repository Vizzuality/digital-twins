import { Vector3 } from "three";

export const convertLatLonToVec3 = (lat: number, lon: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new Vector3(x, y, z);
};

export const convertLatLonToGlobalPosition = (
  lat: number,
  lon: number,
  radius: number,
): [number, number, number] => {
  const phi = (90 - lat) * (Math.PI / 180); // Convert latitude to radians
  const theta = (lon + 180) * (Math.PI / 180); // Convert longitude to radians

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return [x, y, z];
};
