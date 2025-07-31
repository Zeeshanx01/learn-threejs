'use client';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, Text3D } from '@react-three/drei';
import * as THREE from 'three';
import { useRef } from 'react';
import { PointLightHelper } from 'three';
import { useHelper } from '@react-three/drei'; import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useThree } from '@react-three/fiber';


function EarthScene() {
  const sunPosition = [0, 0, 0];  // Position of the sun
  const earthPosition = [-380, 0, -240]; // Position of Earth
  const sunRef = useRef();
  const earthRef = useRef();
  const moon1Ref = useRef();
  const moon2Ref = useRef();

  const light1Ref = useRef();
  const light2Ref = useRef();
  const light3Ref = useRef();

  const pointLightRef = useRef();
  const pointLight2Ref = useRef();
  const pointLight3Ref = useRef();
  const pointLight4Ref = useRef();
  const pointLight5Ref = useRef();
  const pointLight6Ref = useRef();

  const earthGroup = useRef();
  const sunGroup = useRef();



  useHelper(light1Ref, THREE.DirectionalLightHelper, 5, 'red');
  useHelper(light2Ref, THREE.DirectionalLightHelper, 5, 'blue');
  useHelper(light3Ref, THREE.DirectionalLightHelper, 5, 'yellow');

  useHelper(pointLightRef, PointLightHelper, 10, 'red');
  useHelper(pointLight2Ref, PointLightHelper, 10, 'blue');
  useHelper(pointLight3Ref, PointLightHelper, 10, 'yellow');
  useHelper(pointLight4Ref, PointLightHelper, 10, 'green');
  useHelper(pointLight5Ref, PointLightHelper, 10, 'purple');
  useHelper(pointLight6Ref, PointLightHelper, 10, 'pink');

  // Load Earth texture
  const earthTexture = useLoader(THREE.TextureLoader, '/scene7/earth-day-8k.jpg');

  const moonTexture = useLoader(THREE.TextureLoader, '/scene7/moon-8k.jpg');

  const moonTexture2 = useLoader(THREE.TextureLoader, '/scene7/makemake-2k.jpg');


  const sunTexture = useLoader(THREE.TextureLoader, '/scene7/sun-8k.jpg');


  // Animate Earth rotation and moons
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Sun rotation
    if (sunRef.current) sunRef.current.rotation.y += 0.0003;

    // Earth self rotation
    if (earthRef.current) earthRef.current.rotation.y += 0.002;

    // Earth orbit around sun
    if (earthGroup.current) earthGroup.current.rotation.y = t * 0.05;

    // Moon 1 orbit around earth
    if (moon1Ref.current) moon1Ref.current.rotation.y = t * 1;

    // Moon 2 orbit around earth
    if (moon2Ref.current) moon2Ref.current.rotation.y = -t * 1.5;
  });






  // ✅ Access the current active camera
  const { camera } = useThree();

  // ✅ Function to animate the camera
  const animateCamera = (targetPos, distance) => {
    const startPos = camera.position.clone();

    // ✅ Dynamically calculate direction from camera to target
    const direction = new THREE.Vector3()
      .subVectors(startPos, targetPos) // direction from target to camera
      .normalize();

    // ✅ End position: move 'distance' units away from target along this direction
    const endPos = targetPos.clone().add(direction.multiplyScalar(distance));

    let progress = 0;
    const duration = 1500;

    const animate = () => {
      progress += 16 / duration;
      if (progress <= 1) {
        camera.position.lerpVectors(startPos, endPos, progress);
        camera.lookAt(targetPos); // keep camera facing target
        requestAnimationFrame(animate);
      }
    };
    animate();
  };

  const handleObjectClick = (object) => {
    // Get object's world position
    const position = new THREE.Vector3();
    object.getWorldPosition(position);

    // ✅ Calculate bounding sphere
    const box = new THREE.Box3().setFromObject(object);
    const sphere = box.getBoundingSphere(new THREE.Sphere());
    const distance = sphere.radius * 2; // zoom factor

    // ✅ Smooth camera movement
    animateCamera(position, distance);
  };










  return (
    <>



      <group ref={earthGroup} position={earthPosition}>
        {/* Earth */}
        <mesh
          ref={earthRef}
          onClick={(e) => handleObjectClick(e.object)}
        >
          <sphereGeometry args={[2, 32, 32]} />
          <meshStandardMaterial map={earthTexture} />
        </mesh>

        {/* Moon 1 Group */}
        <group ref={moon1Ref}>
          <mesh position={[5, 0, 0]}>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial map={moonTexture} />
          </mesh>
        </group>

        {/* Moon 2 Group */}
        <group ref={moon2Ref}>
          <mesh position={[7, 0, 0]}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial map={moonTexture2} />
          </mesh>
        </group>

        {/* Label */}
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




      <group ref={sunGroup} position={sunPosition}>
        {/* sun */}
        <mesh
          ref={sunRef}
          position={[120, 0, 0]}
          onClick={(e) => handleObjectClick(e.object)}
        >
          <sphereGeometry args={[218, 128, 128]} />
          <meshStandardMaterial
            map={sunTexture}
            roughness={2.6}
            metalness={0.0}
          />
        </mesh>




        <pointLight
          position={[120, 0, 0]}
          intensity={100}
          distance={1000}
          color="white"
          decay={0.5}
        />


        {/* red */}
        <pointLight
          // position={[sunPosition[0] + 20, sunPosition[1] + 20, sunPosition[2] + 50]} 
          position={[-320, 0, 0]}
          // ref={pointLightRef}
          intensity={100}
          distance={1000}
          color="white"
          decay={0.5}
        />

        {/* blue */}
        <pointLight
          // position={[sunPosition[0] + 20, sunPosition[1] + 20, sunPosition[2] + 50]} 
          position={[130, 0, 400]}
          // ref={pointLight2Ref}
          intensity={100}
          distance={1000}
          color="white"
          decay={0.5}
        />

        {/* yellow */}
        <pointLight
          // position={[sunPosition[0] + 20, sunPosition[1] + 20, sunPosition[2] + 50]} 
          position={[550, 0, 0]}
          // ref={pointLight3Ref}
          intensity={100}
          distance={1000}
          color="white"
          decay={0.5}
        />



        {/* green */}
        <pointLight
          // position={[sunPosition[0] + 20, sunPosition[1] + 20, sunPosition[2] + 50]} 
          position={[130, 0, -400]}
          // ref={pointLight4Ref}
          intensity={100}
          distance={1000}
          color="white"
          decay={0.5}
        />




        {/* purple */}
        <pointLight
          // position={[sunPosition[0] + 20, sunPosition[1] + 20, sunPosition[2] + 50]} 
          position={[130, 450, 0]}
          // ref={pointLight5Ref}
          intensity={100}
          distance={1000}
          color="white"
          decay={0.5}
        />

        {/* pink */}
        <pointLight
          // position={[sunPosition[0] + 20, sunPosition[1] + 20, sunPosition[2] + 50]} 
          position={[130, -450, 0]}
          // ref={pointLight6Ref}
          intensity={100}
          distance={1000}
          color="white"
          decay={0.5}
        />


      </group>


      {/* <directionalLight
        ref={light2Ref}
        position={[5, 0, 0]}
        target-position={sunPosition}
        intensity={10}
      /> */}






      {/* Lights */}
      <ambientLight intensity={0.2} />
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
  const cameraRef = useRef()
  const controlsRef = useRef()

  return (
    <Canvas
      camera={{
        position: [-470, 0, -350],
        fov: 60,
        near: 0.1,       // Keep as small as needed
        far: 100000      // 🔥 Increase this to see distant objects
      }}
      style={{ width: '100vw', height: '100vh', background: '#000' }}
      ref={cameraRef}
      onCreated={({ camera }) => {
        // ✅ Point camera to Earth (or any custom target)
        camera.lookAt(-520, 0, 0);
      }}
      gl={{ logarithmicDepthBuffer: true }}
    >
      {/* Background stars */}
      <Stars radius={0} depth={1000} count={90000} factor={10} saturation={0} fade />

      {/* Camera controls */}
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        enableZoom
        enablePan
        ref={controlsRef}
      />

      <EarthScene />
      <EffectComposer>
        <Bloom intensity={0.2} luminanceThreshold={0.3} />
      </EffectComposer>
    </Canvas>
  );
}
