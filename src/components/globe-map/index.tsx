"use client";
import { useState, useRef, useEffect, CSSProperties, useCallback, use } from "react";
import { Canvas } from "@react-three/fiber";
import { Group } from "three";
import { Controls } from "./controls";
import { markers } from "./data";
import GlobeGroup from "./globe-group";
import { useGesture } from "@use-gesture/react";
import { useErrorBoundary } from "use-error-boundary";

export default function GlobeMap({
  videoMaterial,
  className,
  style,
  hasMarkers = false,
  rotate = false,
}: {
  videoMaterial?: string;
  className: string;
  style?: CSSProperties;
  hasMarkers?: boolean;
  rotate?: boolean;
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
  }, [hasMarkers]);

  // Handle vertical wheel events to scroll the page
  const bind = useGesture(
    {
      onWheel: (props) => {
        const { event, direction, delta } = props;
        if (direction[1] !== 0) {
          event.stopPropagation();
          // event.preventDefault();
          window.scrollBy(0, delta[1]);
        }
      },
    },
    {
      eventOptions: { passive: false },
    },
  );
  const { onWheel } = bind();

  useEffect(() => {
    let touchPosition: number | null = null;
    const handleTouchStart = (event: TouchEvent) => {
      const updatedTouchPosition = event.touches[0].clientY;
      touchPosition = updatedTouchPosition;

      if (event.cancelable) {
        event.preventDefault();
      }
    };

    const handleTouchEnd = (event: TouchEvent) => {
      const touchPositionEnd = event.changedTouches[0].clientY;
      const delta = touchPosition ? touchPositionEnd - touchPosition : 0;
      if (delta) {
        // Vertical swipe
        event.stopPropagation();
        event.preventDefault();
        window.scrollBy({ top: -delta * 2, behavior: "smooth" });
      }
      if (event.cancelable) {
        event.preventDefault();
      }
    };

    const containerElement = canvasRef.current;
    if (containerElement) {
      containerElement.addEventListener("touchstart", handleTouchStart, { passive: false });
      containerElement.addEventListener("touchend", handleTouchEnd, { passive: false });
    }

    return () => {
      if (containerElement) {
        containerElement.removeEventListener("touchstart", handleTouchStart);
        containerElement.removeEventListener("touchstart", handleTouchEnd);
      }
    };
  }, []);

  // const dcontrols = new DeviceOrientationControls(camera, renderer.domElement);

  // addEventListener('touchstart', function (evt) {
  //   dcontrols.enabled = false;
  //   evt.preventDefault();
  // }, false);

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
              />
            </Canvas>
          </ErrorBoundary>
        )}
      </div>
    </>
  );
}
