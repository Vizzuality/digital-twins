import { useRef } from "react";
import { Mesh } from "three";
import { convertLatLonToVec3 } from "@/lib/globe-utils";

export interface MarkerProps {
  lat: number;
  lng: number;
}

export const Marker = ({ lat, lng }: MarkerProps) => {
  const sphereMeshRef = useRef<Mesh>(null!);

  console.log(convertLatLonToVec3(lat, lng, 1));

  return (
    <mesh
      ref={sphereMeshRef}
      position={convertLatLonToVec3(lat, lng, 1)}
    >
      <sphereGeometry args={[0.01, 64, 64]} />
      <meshBasicMaterial color="red" />
    </mesh>
  )
}