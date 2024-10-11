'use client';
import { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber'
import { Camera } from './camera';
import { Globe } from './globe';
import Marker from './marker';
import type { MarkerType } from './marker';

const markers: MarkerType[] = [
  { id: "Paris", lat: 48.8575, lng: 2.3514 },
  { id: "Los Angeles", lat: 34.0522, lng: -118.2437 },
  { id: "Tokio", lat: 35.6895, lng: 139.6917 },
  { id: "New York", lat: 40.7128, lng: -74.0060 },
  { id: "São Paulo", lat: -23.5505, lng: -46.6333 },
  { id: "Sydney", lat: -33.8688, lng: 151.2093 },
  { id: "Cape Town", lat: -33.9249, lng: 18.4241 },
];

export default function GlobeMap({ videoMaterial, className, hasMarkers = false, rotate }: { videoMaterial: string, className: string, hasMarkers?: boolean, rotate?: boolean }) {
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);

  const marker = selectedMarker !== null ? markers[selectedMarker] : undefined;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      console.log('weeeee')
      event.stopPropagation();
      event.preventDefault();
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

  return (
    <>
      <div
        className={className}
      >
        <Canvas
          camera={{ fov: 35 }}
          style={{ width: '100%', height: '100%' }}
          ref={canvasRef}
          resize={{ scroll: false, debounce: { scroll: 0, resize: 0 } }}
        >
          {hasMarkers && <Camera marker={marker} />}
          <ambientLight intensity={7} />
          {/* <directionalLight position={[10, 10, 10]} intensity={5} /> */}
          <Globe videoMaterial={videoMaterial} rotate={rotate} />
          {hasMarkers && markers.map((marker, index) => (
            <Marker key={index} index={markers.indexOf(marker)} id={marker.id} isSelected={selectedMarker === markers.indexOf(marker)} setSelectedMarker={setSelectedMarker} lat={marker.lat} lng={marker.lng}>
              Click to explore the phenomenon
            </Marker>
          ))}
        </Canvas>
      </div>
    </>
  );
}
