'use client';
import { useState, useRef, useEffect, CSSProperties, useCallback } from 'react';
import { Canvas } from '@react-three/fiber'
import { Group } from "three";
import { Controls } from './controls';
import { markers } from './data';
import GlobeGroup from './globe-group';
import { useGesture } from '@use-gesture/react';

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
          window.scrollBy(0, -delta[1] * 2);
        }
      },
      onWheel: (props) => {
        const { event, direction, delta } = props;
        if (direction[1] !== 0) {
          event.stopPropagation();
          event.preventDefault();
          window.scrollBy(0, delta[1]);
        }
      }
    }
  )

  return (
    <>
      <div
        className={className}
        style={style}
      >
        <Canvas
          camera={{ fov: 35 }}
          ref={canvasRef}
          resize={{ scroll: false, debounce: { scroll: 0, resize: 0 } }}
          {...bind()}
        >
          <Controls canvasRef={canvasRef} marker={marker} active={hasMarkers} enabled={enabled} setEnabled={setEnabled} groupRef={groupRef} resetSelectedMarker={resetSelectedMarker} globePhase={globePhase} />
          <GlobeGroup
            groupRef={groupRef}
            hasMarkers={hasMarkers} markers={markers} selectedMarker={selectedMarker} setSelectedMarker={setSelectedMarker} rotate={rotate}
            setEnabled={setEnabled}
            videoMaterial={videoMaterial}
          />
        </Canvas>
      </div>
    </>
  );
}
