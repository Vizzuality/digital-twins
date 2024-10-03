import { useState } from "react";
import { CameraControls } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber"
import { useRef } from "react";
import { convertLatLonToGlobalPosition } from "@/lib/globe-utils";
import type { MarkerType } from "./marker";

export const Camera = ({ marker }: {
  marker: MarkerType | undefined
}) => {
  const cameraControlsRef = useRef<CameraControls>(null!);
  const [currentMarker, setCurrentMarker] = useState<string | null>(null);
  const [resetControls, setResetControls] = useState<boolean>(true);

  useThree(({ controls }) => {
    if (controls) {
      if (marker !== undefined && currentMarker !== marker.id) {
        console.log('set', ...convertLatLonToGlobalPosition(marker.lat, marker.lng, 2), cameraControlsRef.current.camera)
        cameraControlsRef.current.setPosition(...convertLatLonToGlobalPosition(marker.lat, marker.lng, 2), true);
        setCurrentMarker(marker.id);
      }

      if (resetControls) {
        cameraControlsRef.current.setPosition(0, 1, 4);
        cameraControlsRef.current.setTarget(0, 0, 0);
        setResetControls(false);
      }
    }
  });

  return (
    <CameraControls
      ref={cameraControlsRef}
      makeDefault
      dollySpeed={0}
      polarRotateSpeed={0}
    />
  )
}