'use client';
import { useState, useRef, useEffect, CSSProperties, useCallback } from 'react';
import { Canvas } from '@react-three/fiber'
import { Group } from "three";
import { Controls } from './controls';

import { markers } from './data';

import GlobeGroup from './globe-group';

export default function GlobeMap({ videoMaterial, className, style, hasMarkers = false, rotate = false }:
  {
    videoMaterial: string,
    className: string,
    style?: CSSProperties,
    hasMarkers?: boolean,
    rotate?: boolean,
  }
) {
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const groupRef = useRef<Group>(null!);
  const marker = selectedMarker !== null ? markers[selectedMarker] : undefined;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.stopPropagation();
    };

    const canvasElement = canvasRef.current;
    if (canvasElement) {
      canvasElement.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (canvasElement) {
        canvasElement.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  const resetSelectedMarker = useCallback(() => {
    setSelectedMarker(null);
  }, []);

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
        >
          <Controls marker={marker} disabled={!hasMarkers} groupRef={groupRef} resetSelectedMarker={resetSelectedMarker} />
          <ambientLight intensity={7} />
          <GlobeGroup
            groupRef={groupRef}
            hasMarkers={hasMarkers} markers={markers} selectedMarker={selectedMarker} setSelectedMarker={setSelectedMarker} rotate={rotate}
            videoMaterial={videoMaterial}
          />
        </Canvas>
      </div>
    </>
  );
}
