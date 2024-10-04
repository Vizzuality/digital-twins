import { useState, useEffect, useMemo } from "react";
import { CameraControls } from "@react-three/drei";
import { useRef } from "react";
import { convertLatLonToGlobalPosition } from "@/lib/globe-utils";
import type { MarkerType } from "./marker";


export const Camera = ({ marker }: {
  marker: MarkerType | undefined
}) => {
  const cameraControlsRef = useRef<CameraControls>(null!);
  const [resetControls, setResetControls] = useState<boolean>(true);
  const canvasElement = useMemo(() => document.getElementsByTagName('canvas')[0], [document]);

  useEffect(() => {
    if (marker === undefined) {
      setResetControls(true);
    }
  }, [marker]);

  useEffect(() => {
    if (marker !== undefined) {
      const [x, y, z] = convertLatLonToGlobalPosition(marker.lat, marker.lng, 2);
      cameraControlsRef.current.disconnect()
      cameraControlsRef.current.setPosition(x, y, z, true);
    }

    if (resetControls) {
      cameraControlsRef.current.connect(canvasElement)
      cameraControlsRef.current.setPosition(0, 1, 4, true);
      cameraControlsRef.current.setTarget(0, 0, 0, true);
      setResetControls(false);
    }
  }), [marker, resetControls, canvasElement];

  return (
    <CameraControls
      ref={cameraControlsRef}
      makeDefault
      dollySpeed={0}
      polarRotateSpeed={0}
    />
  )
}