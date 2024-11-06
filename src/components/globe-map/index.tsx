'use client';
import { useState, useRef, useEffect, CSSProperties, useCallback } from 'react';
import { Canvas } from '@react-three/fiber'
import { Group } from "three";
import { Controls } from './controls';
import { markers } from './data';
import GlobeGroup from './globe-group';
import { useGesture } from '@use-gesture/react';
import { useErrorBoundary } from 'use-error-boundary'

export default function GlobeMap({ videoMaterial, className, style, hasMarkers = false, globePhase, rotate = false }:
  {
    videoMaterial?: string,
    className: string,
    style?: CSSProperties,
    hasMarkers?: boolean,
    rotate?: boolean,
    globePhase: number
  }
) {
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const groupRef = useRef<Group>(null!);
  const marker = selectedMarker !== null ? markers[selectedMarker] : undefined;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      e.preventDefault();
    };

    window.addEventListener('deviceorientation', handleDeviceOrientation);

    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
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

  // Handle vertical swipe and wheel events to scroll the page
  const bind = useGesture(
    {
      onDrag: (props) => {
        const { event, direction, delta } = props;
        if (direction[1] !== 0) { // Vertical swipe
          event.stopPropagation();
          event.preventDefault();
          window.scrollBy(0, -delta[1]);
        }
      },
      onWheel: (props) => {
        const { event, direction, delta } = props;
        if (direction[1] !== 0) {
          event.stopPropagation();
          window.scrollBy(0, delta[1]);
        }
      }
    }
  )
  const { onWheel, onDrag } = bind();

  // const dcontrols = new DeviceOrientationControls(camera, renderer.domElement);


  // addEventListener('touchstart', function (evt) {
  //   dcontrols.enabled = false;
  //   evt.preventDefault();
  // }, false);

  const { ErrorBoundary, didCatch, error } = useErrorBoundary();
  useEffect(() => {
    if (didCatch) {
      console.log(error)
    }
  }
    , [didCatch, error]);

  return (
    <>
      <div
        className={className}
        style={style}
      >
        {!didCatch && (
          <ErrorBoundary>
            <Canvas
              camera={{ fov: 35 }}
              ref={canvasRef}
              resize={{ scroll: false, debounce: { scroll: 0, resize: 0 } }}
              fallback={<div>Sorry, no WebGL supported in your browser</div>}
              onWheel={onWheel}
              onDrag={onDrag}
            >
              <Controls canvasRef={canvasRef} marker={marker} active={hasMarkers} enabled={enabled} setEnabled={setEnabled} groupRef={groupRef} resetSelectedMarker={resetSelectedMarker} globePhase={globePhase} />
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
          </ErrorBoundary>)}
      </div >
    </>
  );
}
