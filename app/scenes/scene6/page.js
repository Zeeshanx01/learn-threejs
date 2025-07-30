'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html,Text3D } from '@react-three/drei';


function SceneObjects() {
  // References for animation
  const cubeRef = useRef();
  const torusRef = useRef();
  const sphereRef = useRef();

  // Animation frame
  useFrame(() => {
    // Breathing cube
    if (cubeRef.current) {
      const scale = 1 + Math.sin(Date.now() * 0.003) * 0.2;
      cubeRef.current.scale.set(scale, scale, scale);
    }

    // Sphere rotation
    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.02;
    }

    // Torus bounce
    if (torusRef.current) {
      torusRef.current.rotation.x += 0.01;
      torusRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.5;
    }
  });

  return (
    <>

      {/* Ready-made camera controls */}
      <OrbitControls />

      {/* A mesh with HTML tooltip */}
      <Html position={[-10, 4, 0]}>
        <div className="bg-gray-500 w-fit text-black p-20 rounded">I&apos;m in 3D!</div>
      </Html>

      {/* Cube */}
      <mesh ref={cubeRef} position={[-2, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={0xff0000} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Torus */}
      <mesh ref={torusRef} position={[0, 0, 0]}>
        <torusGeometry args={[0.7, 0.2, 16, 100]} />
        <meshStandardMaterial color={0x00ff00} />
      </mesh>

      {/* Sphere */}
      <mesh ref={sphereRef} position={[2, 0, 0]}>
        <sphereGeometry args={[0.9, 4, 4]} />
        <meshStandardMaterial color={0x0000ff} metalness={0.5} roughness={0.1} />
      </mesh>

      {/* Cone */}
      <mesh position={[0.5, 1.5, -4]}>
        <coneGeometry args={[0.5, 1.5, 32]} />
        <meshStandardMaterial color={0xffff00} />
      </mesh>

      {/* Cylinder */}
      <mesh position={[-1.5, 0.75, -4]}>
        <cylinderGeometry args={[0.5, 0.5, 1.5, 32]} />
        <meshStandardMaterial color={0xff00ff} />
      </mesh>

      {/* Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color={'red'} side={2} />
      </mesh>

      {/* Plane2 */}
      <mesh rotation={[Math.PI, 0, 0]} position={[0, 3.5, -5]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color={'gray'} side={2} />
      </mesh>

      {/* Road 1 */}
      <mesh position={[20, -1.5, -20]}>
        <boxGeometry args={[20, 0.2, 120]} />
        <meshStandardMaterial color={'gray'} side={2} />
      </mesh>

      {/* Road 2 */}
      <mesh position={[40.5, -1.5, -20]}>
        <boxGeometry args={[20, 0.2, 120]} />
        <meshStandardMaterial color={'gray'} side={2} />
      </mesh>

      {/* Strip */}
      <mesh position={[20, -1.5, -20]}>
        <boxGeometry args={[2, 0.4, 12]} />
        <meshStandardMaterial color={'darkgrey'} side={2} />
      </mesh>

      {/* Road 3 */}
      <mesh position={[-20, -1.5, -40]}>
        <boxGeometry args={[120, 0.2, 20]} />
        <meshStandardMaterial color={'gray'} side={2} />
      </mesh>

      {/* Road 4 */}
      <mesh position={[-60, -1.5, -40]}>
        <boxGeometry args={[120, 0.2, 20]} />
        <meshStandardMaterial color={'red'} side={2} />
      </mesh>

      {/* Road 5 */}
      <mesh position={[60, -1.5, -60]}>
        <boxGeometry args={[120, 0.2, 20]} />
        <meshStandardMaterial color={'black'} side={2} />
      </mesh>

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color={'gray'} side={2} />
      </mesh>

      {/* Lights */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[20, 3, 10]} intensity={2} />
      <pointLight position={[5, 5, 5]} intensity={1} />
    </>
  );
}

export default function Scene6() {
  return (
    <Canvas
      camera={{ position: [-20, 10, 25], fov: 60 }}
      style={{ width: '100vw', height: '100vh', background: '#222222' }}
    >
      <OrbitControls enableDamping dampingFactor={0.05} enableZoom enablePan />
      <SceneObjects />
    </Canvas>
  );
}
