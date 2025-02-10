"use client";

import { useState, useRef, useEffect, CSSProperties, useCallback } from "react";

import { Canvas } from "@react-three/fiber";
import { useGesture } from "@use-gesture/react";
import { Group } from "three";
import { useErrorBoundary } from "use-error-boundary";

import { Controls } from "./controls";
import { markers } from "./data";
import GlobeGroup from "./globe-group";

export default function GlobeMap({
  videoMaterial,
  className,
  style,
  hasMarkers = false,
  rotate = false,
  syncId,
}: {
  videoMaterial?: string;
  className: string;
  style?: CSSProperties;
  hasMarkers?: boolean;
  rotate?: boolean;
  syncId?: string;
}) {
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const groupRef = useRef<Group>(null!);
  const marker = selectedMarker !== null ? markers[selectedMarker] : undefined;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      e.preventDefault();
    };

    window.addEventListener("deviceorientation", handleDeviceOrientation);

    return () => {
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
    };
  }, []);

  const resetSelectedMarker = useCallback(() => {
    setSelectedMarker(null);
  }, []);

  useEffect(() => {
    if (hasMarkers && !enabled) {
      setEnabled(true);
    }

    if (!hasMarkers && enabled) {
      setEnabled(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMarkers]);

  const touchMoveY = useRef<number | null>(null);
  const touchMoveX = useRef<number | null>(null);

  // Handle vertical wheel events to scroll the page
  const bind = useGesture(
    {
      onWheel: (props) => {
        const { event, direction, delta } = props;
        if (direction[1] !== 0) {
          event.stopPropagation();
          window.scrollBy(0, delta[1]);
        }
      },
      onTouchMove: (props) => {
        const { event } = props;

        if (touchMoveY.current === null || touchMoveX.current === null) {
          return;
        }
        const currentY = event.touches[0].clientY; // Current Y position
        const currentX = event.touches[0].clientX; // Current Y position

        const deltaY = currentY - touchMoveY.current; // Vertical movement difference
        const deltaX = currentX - touchMoveX.current; // Horizontal movement difference

        if (Math.abs(deltaY) < Math.abs(deltaX)) return; // Prevent vertical scrolling if the user is trying to rotate the map
        touchMoveY.current = currentY;
        touchMoveX.current = currentX;

        window.scrollBy(0, -deltaY);
      },
      onTouchStart: (props) => {
        const { event } = props;
        touchMoveY.current = event.touches[0].clientY;
        touchMoveX.current = event.touches[0].clientX;
      },
    },
    {
      eventOptions: { passive: false },
    },
  );
  const { onWheel, onTouchMove, onTouchStart } = bind();

  const { ErrorBoundary, didCatch, error } = useErrorBoundary();
  useEffect(() => {
    if (didCatch) {
      console.error("Globe error", error);
    }
  }, [didCatch, error]);
  return (
    <>
      <div className={className} style={style}>
        {!didCatch && (
          <ErrorBoundary>
            <Canvas
              camera={{ fov: 35 }}
              ref={canvasRef}
              resize={{ scroll: false, debounce: { scroll: 0, resize: 0 } }}
              fallback={<div>Sorry, no WebGL supported in your browser</div>}
              onWheel={onWheel}
              onTouchMove={onTouchMove}
              onTouchStart={onTouchStart}
            >
              <Controls
                canvasRef={canvasRef}
                marker={marker}
                active={hasMarkers}
                enabled={enabled}
                setEnabled={setEnabled}
                groupRef={groupRef}
                resetSelectedMarker={resetSelectedMarker}
              />
              <GlobeGroup
                groupRef={groupRef}
                hasMarkers={hasMarkers}
                markers={markers}
                selectedMarker={selectedMarker}
                setSelectedMarker={setSelectedMarker}
                rotate={rotate}
                setEnabled={setEnabled}
                videoMaterial={videoMaterial}
                syncId={syncId}
              />
            </Canvas>
          </ErrorBoundary>
        )}
      </div>
    </>
  );
}
