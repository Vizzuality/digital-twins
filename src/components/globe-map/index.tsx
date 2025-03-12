"use client";

import { useState, useRef, useEffect, CSSProperties, useCallback } from "react";

import { Canvas } from "@react-three/fiber";
import { useGesture } from "@use-gesture/react";
import { useRecoilState } from "recoil";
import { Group, WebGLRenderer } from "three";
import { useErrorBoundary } from "use-error-boundary";

import { selectedGlobeMarkerAtom } from "@/store";

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
  fallbackElement,
}: {
  videoMaterial?: string;
  className: string;
  style?: CSSProperties;
  hasMarkers?: boolean;
  rotate?: boolean;
  syncId?: string;
  fallbackElement: JSX.Element;
}) {
  const [selectedMarker, setSelectedMarker] = useRecoilState(selectedGlobeMarkerAtom);
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
    },
    {
      eventOptions: { passive: false },
    },
  );
  const { onWheel } = bind();

  const { ErrorBoundary, didCatch, error } = useErrorBoundary();
  useEffect(() => {
    if (didCatch) {
      console.error("Globe error", error);
    }
  }, [didCatch, error]);

  const [contextLoss, setContextLoss] = useState(false);

  // TEST: Simulate a context lost event
  // REMOVE BEFORE PRODUCTION
  const [glRef, setGlRef] = useState<WebGLRenderer | null>(null);
  useEffect(() => {
    if (glRef) {
      const gl = glRef.getContext(); // Get the WebGL context
      const loseContextExt = gl?.getExtension("WEBGL_lose_context");
      // console.log(gl);
      if (loseContextExt) {
        // Simulate a context lost event after 1 second
        setTimeout(() => {
          console.log("Simulating context lost...");
          loseContextExt.loseContext();
        }, 1000);
      } else {
        console.warn("WEBGL_lose_context extension not supported");
      }
    }
  }, [glRef]);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.addEventListener("webglcontextlost", () => {
        setContextLoss(true);
      });
    }
  }, []);

  return (
    <>
      <div className={className} style={style}>
        {!didCatch && (
          <ErrorBoundary>
            {contextLoss ? (
              fallbackElement
            ) : (
              <Canvas
                camera={{ fov: 35 }}
                ref={canvasRef}
                resize={{ scroll: false, debounce: { scroll: 0, resize: 0 } }}
                fallback={<div>Sorry, no WebGL supported in your browser</div>}
                onWheel={onWheel}
                onCreated={({ gl }) => {
                  setGlRef(gl);
                }}
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
            )}
          </ErrorBoundary>
        )}
      </div>
    </>
  );
}
