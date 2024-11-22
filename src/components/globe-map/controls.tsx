import { useState, useEffect, useMemo } from "react";
import { useRef } from "react";

import { usePathname } from "next/navigation";

import { CameraControls } from "@react-three/drei";
import { useInView } from "framer-motion";
import { useRecoilState } from "recoil";
import { Group } from "three";

import { convertLatLonToGlobalPosition } from "@/lib/globe-utils";
import { useIsMobile } from "@/lib/hooks";

import { globePhaseAtom } from "@/store";

import type { MarkerType } from "./marker";

const MADRID_COORDINATES = { lat: 40.416775, lng: -3.70379 };

const ZOOMS = {
  home: {
    initial: {
      mobile: 2.8,
      desktop: 2.8,
    },
    phase3: {
      mobile: 4,
      desktop: 4,
    },
  },
  energy: {
    initial: {
      mobile: 4.5,
      desktop: 4.75,
    },
  },
};

export const Controls = ({
  marker,
  active = false,
  enabled = false,
  groupRef,
  resetSelectedMarker,
  setEnabled,
  canvasRef,
}: {
  marker: MarkerType | undefined;
  // Active is used to determine if the globe controls are in a phase that could be enabled even if is temporarily disabled
  active: boolean;
  // Enabled is used to determine if the globe controls are currently enabled
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  groupRef: React.MutableRefObject<Group>;
  resetSelectedMarker: () => void;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}) => {
  const pathname = usePathname();
  const isEnergyPage = useMemo(() => pathname === "/case-study-energy", [pathname]);

  const [globePhase] = useRecoilState(globePhaseAtom);
  const isMobile = useIsMobile();
  const cameraControlsRef = useRef<CameraControls>(null!);
  const [resettingPosition, setResettingPosition] = useState(false);

  const resetPosition = () => {
    groupRef.current.rotation.y = 0;
    if (isEnergyPage) {
      if (globePhase === 0) {
        cameraControlsRef.current.setPosition(
          0,
          1,
          isMobile ? ZOOMS.energy.initial.mobile : ZOOMS.energy.initial.desktop,
          true,
        );
        cameraControlsRef.current.setTarget(0, 0, 0, true);
        return;
      }

      if (globePhase === 1) {
        // Position tooltip in europe
        const [x, y, z] = convertLatLonToGlobalPosition(
          MADRID_COORDINATES.lat,
          MADRID_COORDINATES.lng,
          isMobile ? ZOOMS.energy.initial.mobile : ZOOMS.energy.initial.desktop,
        );
        cameraControlsRef.current.setPosition(x, y, z, true);
        cameraControlsRef.current.setTarget(0, 0, 0, true);
        return;
      }
    } else {
      if (globePhase < 2) {
        cameraControlsRef.current.setPosition(
          0,
          1,
          isMobile ? ZOOMS.home.initial.mobile : ZOOMS.home.initial.mobile,
          true,
        );
        cameraControlsRef.current.setTarget(0, 0.4, 0, true);
      } else {
        cameraControlsRef.current.setPosition(
          0,
          1,
          isMobile ? ZOOMS.home.phase3.mobile : ZOOMS.home.phase3.mobile,
          true,
        );
        cameraControlsRef.current.setTarget(0, 0, 0, true);
      }
    }
  };

  useEffect(() => {
    if (globePhase === 0 || globePhase === 1) {
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

    // If globephase is 1 and the marker is not active, reset the position
    if (!active && marker !== undefined && !resettingPosition) {
      setResettingPosition(true);

      groupRef.current.rotation.y = 0;
      cameraControlsRef.current.setTarget(0, 0.4, 0, true);
      cameraControlsRef.current
        .setPosition(0, 1, isMobile ? ZOOMS.home.initial.mobile : ZOOMS.home.initial.desktop, true)
        .then(() => {
          setResettingPosition(false);
          resetSelectedMarker();
          setEnabled(false);
        });
    }
  }, [enabled, marker, active, resettingPosition]);

  const isInView = useInView(canvasRef);

  useEffect(() => {
    // Reset the globe when we pass the globe phase 2
    if (!isInView && globePhase === 2 && marker !== undefined) {
      groupRef.current.rotation.y = 0;
      cameraControlsRef.current.setTarget(0, 0, 0, true);
      cameraControlsRef.current
        .setPosition(0, 1, isMobile ? ZOOMS.home.phase3.mobile : ZOOMS.home.phase3.desktop, true)
        .then(() => {
          resetSelectedMarker();
          setEnabled(true);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

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
