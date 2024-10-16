import { useState, useEffect, useMemo } from "react";
import { CameraControls } from "@react-three/drei";
import { useRef } from "react";
import { convertLatLonToGlobalPosition } from "@/lib/globe-utils";
import type { MarkerType } from "./marker";
import { Group } from "three";

export const Controls = ({ marker, disabled = false, groupRef, resetSelectedMarker }: {
  marker: MarkerType | undefined
  disabled: boolean
  groupRef: React.MutableRefObject<Group>
  resetSelectedMarker: () => void
}) => {
  const cameraControlsRef = useRef<CameraControls>(null!);
  const [resetControls, setResetControls] = useState<boolean>(true);
  const canvasElement = useMemo(() => document.getElementsByTagName('canvas')[0], [document]);

  useEffect(() => {
    if (marker === undefined) {
      setResetControls(true);
    }
  }, [marker]);

  const resetPosition = () => {
    groupRef.current.rotation.y = 0;
    cameraControlsRef.current.setPosition(0, 1, 4.9, true);
    cameraControlsRef.current.setTarget(0, 0, 0, true);
  };

  useEffect(() => {
    if (cameraControlsRef.current) {
      if (marker !== undefined) {
        const [x, y, z] = convertLatLonToGlobalPosition(marker.lat, marker.lng, 2);
        cameraControlsRef.current.disconnect();
        groupRef.current.rotation.y = 0;
        cameraControlsRef.current.setPosition(x, y, z, true);
      }

      if (resetControls) {
        cameraControlsRef.current.connect(canvasElement);
        resetPosition();
        setResetControls(false);
      }
    }
  }, [marker, resetControls, canvasElement]);

  useEffect(() => {
    if (disabled) {
      resetSelectedMarker();
      resetPosition();
    }
  }, [disabled, cameraControlsRef.current]);

  return (
    <CameraControls
      ref={cameraControlsRef}
      makeDefault
      dollySpeed={0}
      polarRotateSpeed={0}
    />
  );
};
