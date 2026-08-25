import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { WebGLRendererConfig, World, type GlobeArc, type GlobeConfig, type GlobePoint } from './ui/globe';

const globeConfig: GlobeConfig = {
  globeColor: '#3d1218',
  polygonColor: 'rgba(198, 40, 40, 0.55)',
  atmosphereColor: '#c62828',
  atmosphereAltitude: 0.16,
  showAtmosphere: true,
  autoRotate: true,
  autoRotateSpeed: 0.22,
};

const arcs: GlobeArc[] = [
  { startLat: 40.7128, startLng: -74.006, endLat: 51.5072, endLng: -0.1276, color: '#e53935' },
  { startLat: 19.076, startLng: 72.8777, endLat: 1.3521, endLng: 103.8198, color: '#ffb3b3' },
  { startLat: -33.8688, startLng: 151.2093, endLat: 35.6762, endLng: 139.6503, color: '#e53935' },
  { startLat: 25.2048, startLng: 55.2708, endLat: 6.5244, endLng: 3.3792, color: '#ffb3b3' },
];

const points: GlobePoint[] = [
  { lat: 40.7128, lng: -74.006, size: 0.28 },
  { lat: 51.5072, lng: -0.1276, size: 0.25 },
  { lat: 19.076, lng: 72.8777, size: 0.28 },
  { lat: 1.3521, lng: 103.8198, size: 0.24 },
  { lat: -33.8688, lng: 151.2093, size: 0.26 },
  { lat: 35.6762, lng: 139.6503, size: 0.24 },
];

export default function InteractiveGlobe() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[480px] min-w-0 overflow-hidden" aria-label="Interactive donation network globe">
      <Suspense fallback={<div className="absolute inset-0 animate-pulse border border-red-900/40 bg-red-950/10" />}>
        <Canvas
          camera={{ position: [0, 0, 300], fov: 42 }}
          gl={WebGLRendererConfig}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[3, 2, 4]} intensity={1.2} color="#ffe5e5" />
          <pointLight position={[-3, -2, 2]} intensity={1.4} color="#c62828" />
          <World globeConfig={globeConfig} data={{ arcs, points }} />
          <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.55} minPolarAngle={Math.PI / 3} maxPolarAngle={(Math.PI * 2) / 3} />
        </Canvas>
      </Suspense>
    </div>
  );
}
