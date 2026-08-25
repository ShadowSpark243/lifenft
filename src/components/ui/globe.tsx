import React, { useEffect, useMemo, useRef } from 'react';
import ThreeGlobe from 'three-globe';
import { useFrame } from '@react-three/fiber';
import { Mesh, MeshBasicMaterial, RingGeometry } from 'three';
import type { Object3D } from 'three';

export interface GlobeConfig {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: { lat: number; lng: number };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
}

export interface GlobePoint {
  lat: number;
  lng: number;
  size?: number;
  color?: string;
}

export interface GlobeArc {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color?: string;
}

export interface WorldProps {
  globeConfig?: GlobeConfig;
  data?: { arcs?: GlobeArc[]; points?: GlobePoint[] };
}

export const WebGLRendererConfig = {
  antialias: true,
  alpha: true,
  powerPreference: 'high-performance' as const,
};

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const normalized = hex.replace('#', '');
  const value = normalized.length === 3
    ? normalized.split('').map((char) => `${char}${char}`).join('')
    : normalized;
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

export function genRandomNumbers(count: number, min = 0, max = 1): number[] {
  return Array.from({ length: count }, () => min + Math.random() * (max - min));
}

const continentData = [
  {
    type: 'Feature',
    properties: { name: 'North America' },
    geometry: { type: 'Polygon', coordinates: [[[-168, 72], [-140, 70], [-125, 60], [-105, 55], [-95, 49], [-82, 45], [-75, 35], [-82, 24], [-100, 18], [-117, 25], [-130, 32], [-145, 45], [-168, 55], [-168, 72]]] },
  },
  {
    type: 'Feature',
    properties: { name: 'South America' },
    geometry: { type: 'Polygon', coordinates: [[[-81, 12], [-65, 10], [-52, 4], [-35, -5], [-38, -20], [-48, -32], [-58, -52], [-72, -55], [-76, -35], [-80, -10], [-81, 12]]] },
  },
  {
    type: 'Feature',
    properties: { name: 'Europe and Asia' },
    geometry: { type: 'Polygon', coordinates: [[[-10, 36], [10, 43], [30, 50], [55, 55], [80, 65], [110, 70], [145, 60], [180, 55], [170, 30], [145, 20], [115, 8], [80, 10], [55, 18], [35, 30], [15, 35], [-10, 36]]] },
  },
  {
    type: 'Feature',
    properties: { name: 'Africa' },
    geometry: { type: 'Polygon', coordinates: [[[-17, 35], [5, 37], [30, 32], [50, 12], [42, -10], [32, -35], [15, -35], [-5, -25], [-17, 0], [-17, 35]]] },
  },
  {
    type: 'Feature',
    properties: { name: 'Australia' },
    geometry: { type: 'Polygon', coordinates: [[[112, -10], [130, -12], [153, -20], [155, -38], [135, -44], [115, -35], [112, -10]]] },
  },
];

export function World({ globeConfig = {}, data = {} }: WorldProps) {
  const globeRef = useRef<ThreeGlobe | null>(null);
  const globe = useMemo(() => new ThreeGlobe(), []);
  const {
    globeColor = '#160b0d',
    showAtmosphere = true,
    atmosphereColor = '#c62828',
    atmosphereAltitude = 0.18,
    polygonColor = 'rgba(198, 40, 40, 0.55)',
    autoRotate = true,
    autoRotateSpeed = 0.25,
  } = globeConfig;

  useEffect(() => {
    globeRef.current = globe;
    const material = globe.globeMaterial();
    material.color.set(globeColor);
    material.emissive.set(globeColor);
    material.emissiveIntensity = 0.42;
    material.shininess = 0.7;
    const outline = new Mesh(
      new RingGeometry(100, 101.5, 128),
      new MeshBasicMaterial({ color: '#e53935', transparent: true, opacity: 0.7, side: 2 })
    );
    globe.add(outline);
    globe
      .polygonsData(continentData)
      .polygonCapColor(() => polygonColor)
      .polygonSideColor(() => 'rgba(198, 40, 40, 0.18)')
      .polygonStrokeColor(() => '#8e0000')
      .polygonAltitude(0.012);
    globe
      .arcsData(data.arcs || [])
      .arcColor((arc: GlobeArc) => arc.color || '#e53935')
      .arcDashLength(0.35)
      .arcDashGap(1)
      .arcDashAnimateTime(1800)
      .arcStroke(0.5);
    globe
      .pointsData(data.points || [])
      .pointColor((point: GlobePoint) => point.color || '#ffb3b3')
      .pointAltitude(0.04)
      .pointRadius((point: GlobePoint) => point.size || 0.22)
      .pointsMerge(true);
    if (showAtmosphere) {
      globe.atmosphereColor(atmosphereColor).atmosphereAltitude(atmosphereAltitude);
    } else {
      globe.atmosphereColor('#000000').atmosphereAltitude(0);
    }
    return () => {
      globe.remove(outline);
      outline.geometry.dispose();
      outline.material.dispose();
    };
  }, [atmosphereAltitude, atmosphereColor, data.arcs, data.points, globe, globeColor, polygonColor, showAtmosphere]);

  useFrame((_state, delta) => {
    if (autoRotate) globe.rotation.y += delta * autoRotateSpeed;
  });

  return <primitive object={globe as unknown as Object3D} ref={globeRef} />;
}
