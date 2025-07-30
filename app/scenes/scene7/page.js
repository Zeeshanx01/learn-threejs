'use client';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, Text3D } from '@react-three/drei';
import * as THREE from 'three';
import { useRef } from 'react';
import { PointLightHelper } from 'three';
import { useHelper } from '@react-three/drei'; import { EffectComposer, Bloom } from '@react-three/postprocessing';

function EarthScene() {
  const sunPosition = [120, 0, 0];  // Position of the sun
  const earthPosition = [0, 0, 0]; // Position of Earth
  const sunRef = useRef();
  const earthRef = useRef();
  const moon1Ref = useRef();
  const moon2Ref = useRef();

  const light1Ref = useRef();
  const light2Ref = useRef();
  const light3Ref = useRef();

  const pointLightRef = useRef();

  const earthGroup = useRef();

  useHelper(light1Ref, THREE.DirectionalLightHelper, 5, 'red');
  useHelper(light2Ref, THREE.DirectionalLightHelper, 5, 'blue');
  useHelper(light3Ref, THREE.DirectionalLightHelper, 5, 'yellow');

  useHelper(pointLightRef, PointLightHelper, 10, 'green');


  // Load Earth texture
  const earthTexture = useLoader(THREE.TextureLoader, '/scene7/earth-day-8k.jpg');

  const moonTexture = useLoader(THREE.TextureLoader, '/scene7/moon-8k.jpg');

  const moonTexture2 = useLoader(THREE.TextureLoader, '/scene7/makemake-2k.jpg');


  const sunTexture = useLoader(THREE.TextureLoader, '/scene7/sun-8k.jpg');


  // Animate Earth rotation and moons
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (sunRef.current) sunRef.current.rotation.y += 0.0003;
    if (earthRef.current) earthRef.current.rotation.y += 0.002;

    if (moon1Ref.current) {
      moon1Ref.current.position.x = Math.sin(t) * 5;
      moon1Ref.current.position.z = Math.cos(t) * 5;
    }
    if (moon2Ref.current) {
      moon2Ref.current.position.x = Math.sin(-t * 1.5) * 7;
      moon2Ref.current.position.z = Math.cos(-t * 1.5) * 7;
    }
  });

  return (
    <>



      <group ref={earthGroup} position={earthPosition}>


        {/* Earth */}
        <mesh ref={earthRef} position={[0, 0, 0]}>
          <sphereGeometry args={[2, 32, 32]} />
          <meshStandardMaterial map={earthTexture} />
        </mesh>

        {/* Moon 1 */}
        <mesh ref={moon1Ref} position={[5, 0, 0]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial map={moonTexture} />
        </mesh>

        {/* Moon 2 */}
        <mesh ref={moon2Ref} position={[7, 0, 0]}>
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

      {/* is it possible to finds the positon of point light like we done in directional light? */}




      {/* sun */}
      <mesh ref={sunRef} position={sunPosition}>
        <sphereGeometry args={[100, 128, 128]} />
        <meshStandardMaterial
          map={sunTexture}
          roughness={2.6}
          metalness={0.0} 
          />
      </mesh>




      <pointLight
        // position={[sunPosition[0] + 20, sunPosition[1] + 20, sunPosition[2] + 50]} 
        position={sunPosition}
        intensity={100}
        distance={1000}
        color="white"
        decay={0.5}
      />



      <pointLight
        // position={[sunPosition[0] + 20, sunPosition[1] + 20, sunPosition[2] + 50]} 
        position={[0, 0, 0]}
        ref={pointLightRef}
        intensity={100}
        distance={100}
        color="white"
        decay={0.5}
      />








      {/* <directionalLight
        ref={light2Ref}
        position={[5, 0, 0]}
        target-position={sunPosition}
        intensity={10}
      /> */}






      {/* Lights */}
      <ambientLight intensity={0.4} />
      {/* <directionalLight
        ref={light1Ref}
        position={sunPosition}
        target-position={earthPosition}
        intensity={3}
      /> */}
      {/* <directionalLight ref={light2Ref} position={[10, 0, 0]} intensity={1.5} /> */}
    </>
  );
}

export default function Scene7() {
  return (
    <Canvas
      camera={{ position: [100, 5, 150], fov: 60 }}
      style={{ width: '100vw', height: '100vh', background: '#000' }}
    >
      {/* Background stars */}
      <Stars radius={60} depth={110} count={50000} factor={1} saturation={0} fade />

      {/* Camera controls */}
      <OrbitControls enableDamping dampingFactor={0.05} enableZoom enablePan />

      <EarthScene />
      <EffectComposer>
        <Bloom intensity={0.2} luminanceThreshold={0.3} />
      </EffectComposer>
    </Canvas>
  );
}
