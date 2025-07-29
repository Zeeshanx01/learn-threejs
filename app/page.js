'use client';
import { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function Home() {


  useEffect(() => {



    // 1️⃣ Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x222222); // Dark background



    const camera = new THREE.PerspectiveCamera(
      60,                                 // Field of view (how wide you see)
      window.innerWidth / window.innerHeight, // Keeps proportions correct
      0.1,                                // Objects closer than this are not visible
      1000                                // Objects farther than this are not visible
    );
    camera.position.z = 5; // Move the camera 5 units away from center






    // 3️⃣ Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);




    // 4️⃣ Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = false; // Smooth movement
    controls.dampingFactor = 20.01; // How smooth the movement is
    controls.enableZoom = true;   // Allow zooming
    controls.enablePan = true;    // Allow panning


    // 4️⃣ Objects

    // Cube
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1); // width, height, depth
    const cubeMaterial = new THREE.MeshStandardMaterial({
      color: 0xff0000,
      metalness: 0.9, // Reflective surface
      roughness: 0.1 // Smooth surface
    }); // reacts to light
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = -2; // Move it left
    scene.add(cube);


    // Torus
    const torusGeometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);
    const torusMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.x = 0;
    scene.add(torus);


    // Sphere
    const sphereGeometry = new THREE.SphereGeometry(0.9, 4, 4); // radius, width segments, height segments
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0x0000ff,
      metalness: 0.5, // Reflective surface
      roughness: 0.1 // Smooth surface 
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.x = 2; // Move it right
    scene.add(sphere);





    // Ground plane
    const planeGeometry = new THREE.PlaneGeometry(10, 10);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x888888, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = Math.PI / 2; // Rotate flat
    plane.position.y = -1.5;
    scene.add(plane);





    // 5️⃣ Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // Soft light
    scene.add(ambientLight);

    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(5, 5, 5);
    scene.add(light);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);




    // 6️⃣ Animation Loop
    function animate() {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      sphere.rotation.y += 0.02;

      renderer.render(scene, camera);
    }
    animate();

    // Cleanup
    return () => {
      document.body.removeChild(renderer.domElement);
    };
  }, []);






  return null;
}
