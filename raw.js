'use client';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, Text3D } from '@react-three/drei';
import * as THREE from 'three';
import { useRef } from 'react';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

function EarthScene() {
  // Refs
  const sunRef = useRef();
  const earthRef = useRef();
  const moon1Ref = useRef();
  const moon2Ref = useRef();
  const earthOrbit = useRef();

  // Load textures
  const earthTexture = useLoader(THREE.TextureLoader, '/scene7/earth-day-8k.jpg');
  const moonTexture = useLoader(THREE.TextureLoader, '/scene7/moon-8k.jpg');
  const moonTexture2 = useLoader(THREE.TextureLoader, '/scene7/makemake-2k.jpg');
  const sunTexture = useLoader(THREE.TextureLoader, '/scene7/sun-8k.jpg');

  // Animation frame
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Earth orbiting around the sun
    if (earthOrbit.current) {
      earthOrbit.current.position.x = Math.sin(t * 0.2) * 120;
      earthOrbit.current.position.z = Math.cos(t * 0.2) * 120;
    }

    // Earth's self rotation
    if (earthRef.current) earthRef.current.rotation.y += 0.002;

    // Moon orbits around Earth
    if (moon1Ref.current) {
      moon1Ref.current.position.x = Math.sin(t) * 5;
      moon1Ref.current.position.z = Math.cos(t) * 5;
    }
    if (moon2Ref.current) {
      moon2Ref.current.position.x = Math.sin(-t * 1.5) * 7;
      moon2Ref.current.position.z = Math.cos(-t * 1.5) * 7;
    }

    // Sun rotation
    if (sunRef.current) sunRef.current.rotation.y += 0.0003;
  });

  return (
    <>
      {/* Sun */}
      <mesh ref={sunRef} position={[0, 0, 0]}>
        <sphereGeometry args={[30, 128, 128]} />
        <meshBasicMaterial map={sunTexture} />
      </mesh>

      {/* Light emitting from sun */}
      <pointLight position={[0, 0, 0]} intensity={6} distance={1000} color="white" />

      {/* Earth Orbit group (revolves around sun) */}
      <group ref={earthOrbit}>
        {/* Earth */}
        <mesh ref={earthRef}>
          <sphereGeometry args={[2, 64, 64]} />
          <meshStandardMaterial map={earthTexture} />
        </mesh>

        {/* Moons orbiting Earth */}
        <mesh ref={moon1Ref}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial map={moonTexture} />
        </mesh>

        <mesh ref={moon2Ref}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial map={moonTexture2} />
        </mesh>

        {/* Floating 3D Label */}
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.5}
          height={0.2}
          position={[-1.9, -3, 0]}
        >
          Earth Scene
          <meshStandardMaterial color="white" />
        </Text3D>
      </group>

      {/* Ambient light for soft visibility */}
      <ambientLight intensity={0.2} />
    </>
  );
}

export default function Scene7() {
  return (
    <Canvas
      camera={{ position: [200, 80, 200], fov: 60 }}
      style={{ width: '100vw', height: '100vh', background: '#000' }}
    >
      {/* Background stars */}
      <Stars radius={500} depth={150} count={30000} factor={2} saturation={0} fade />

      {/* Camera controls */}
      <OrbitControls enableDamping dampingFactor={0.05} enableZoom enablePan />

      <EarthScene />

      {/* Glow effect */}
      <EffectComposer>
        <Bloom intensity={0.8} luminanceThreshold={0.1} />
      </EffectComposer>
    </Canvas>
  );
}
