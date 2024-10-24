import { useState, useEffect, useMemo } from "react";
import { CameraControls } from "@react-three/drei";
import { useRef } from "react";
import { convertLatLonToGlobalPosition } from "@/lib/globe-utils";
import type { MarkerType } from "./marker";
import { Group } from "three";
import { useIsMobile } from "@/lib/hooks";
import { useInView } from "framer-motion";
export const Controls = ({ marker, active = false, enabled = false, groupRef, resetSelectedMarker, setEnabled, globePhase, canvasRef }: {
  marker: MarkerType | undefined
  // Active is used to determine if the globe controls are in a phase that could be enabled even if is temporarily disabled
  active: boolean
  // Enabled is used to determine if the globe controls are currently enabled
  enabled: boolean
  setEnabled: (enabled: boolean) => void
  groupRef: React.MutableRefObject<Group>
  resetSelectedMarker: () => void,
  globePhase: number,
  canvasRef: React.RefObject<HTMLCanvasElement>
}) => {
  const isMobile = useIsMobile();
  const cameraControlsRef = useRef<CameraControls>(null!);
  const [resettingPosition, setResettingPosition] = useState(false);

  const resetPosition = () => {
    groupRef.current.rotation.y = 0;
    cameraControlsRef.current.setPosition(0, 1, 4.9, true);
    cameraControlsRef.current.setTarget(0, 0, 0, true);
  };

  useEffect(() => {
    if (globePhase === 0) {
      resetPosition();
    }
  }, [globePhase]);

  useEffect(() => {
    if (active && marker !== undefined) {
      // Position tooltip in the marker
      const [x, y, z] = convertLatLonToGlobalPosition(marker.lat, marker.lng, 2);

      const PADDING_TO_CENTER_GLOBE = isMobile ? -0.08 : -0.17;
      groupRef.current.rotation.y = PADDING_TO_CENTER_GLOBE;
      cameraControlsRef.current.setPosition(x, y, z, true).then(() => {
        setEnabled(false);
      });
    }

    if (enabled) {
      if (marker === undefined) {
        resetSelectedMarker();
        resetPosition();
      }
    }

    if (!active && marker !== undefined && !resettingPosition) {
      setResettingPosition(true);
    }

    if (resettingPosition) {
      groupRef.current.rotation.y = 0;
      cameraControlsRef.current.setTarget(0, 0, 0, true);
      cameraControlsRef.current.setPosition(0, 1, 4.9, true).then(() => {
        setResettingPosition(false);
        setEnabled(false);
        if (globePhase === 2) {
          // Scrolling past the globe
          resetSelectedMarker();
        }
      });
    }
  }, [enabled, marker, active, resettingPosition]);

  const isInView = useInView(canvasRef);

  useEffect(() => {
    if (!isInView && globePhase === 2 && marker !== undefined) {
      setResettingPosition(true);
    }
  }), [isInView];

  return (
    <CameraControls
      ref={cameraControlsRef}
      makeDefault
      dollySpeed={0}
      polarRotateSpeed={0}
      azimuthRotateSpeed={enabled || resettingPosition ? 1 : 0}
    />
  );
};
