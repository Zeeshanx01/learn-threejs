'use client';
import { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function Scene4() {
  useEffect(() => {
    // =============================
    // Common Setup
    // =============================
    const container = document.getElementById('multi-scenes-container');




















    // ---------- Scene 1 ----------
    const scene1 = new THREE.Scene();
    scene1.background = new THREE.Color(0x222222);
    const camera1 = new THREE.PerspectiveCamera(60, 0.5 * window.innerWidth / window.innerHeight, 0.1, 1000);
    camera1.position.z = 4;

    const renderer1 = new THREE.WebGLRenderer({ antialias: true });
    renderer1.setSize(window.innerWidth / 2, window.innerHeight);
    container.appendChild(renderer1.domElement);

    const controls1 = new OrbitControls(camera1, renderer1.domElement);
    controls1.enableDamping = true;
    controls1.dampingFactor = 0.05;
    controls1.enableZoom = true;
    controls1.enablePan = true;

    // Object 1: Red Cube
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({ color: 0xff0000 })
    );
    scene1.add(cube);

    const light1 = new THREE.PointLight(0xffffff, 1);
    light1.position.set(5, 5, 5);
    scene1.add(light1);







    // ---------- Scene 2 ----------
    const scene2 = new THREE.Scene();
    scene2.background = new THREE.Color(0x111133);
    const camera2 = new THREE.PerspectiveCamera(60, 0.5 * window.innerWidth / window.innerHeight, 0.1, 1000);
    camera2.position.z = 6;

    const renderer2 = new THREE.WebGLRenderer({ antialias: true });
    renderer2.setSize(window.innerWidth / 2, window.innerHeight);
    container.appendChild(renderer2.domElement);

    const controls2 = new OrbitControls(camera2, renderer2.domElement);
    controls2.enableDamping = true;

    // Object 2: Blue Torus
    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(1.2, 0.3, 16, 100),
      new THREE.MeshStandardMaterial({ color: 0x00aaff, metalness: 0.5, roughness: 0.2 })
    );
    scene2.add(torus);

    const light2 = new THREE.DirectionalLight(0xffffff, 2);
    light2.position.set(5, 5, 5);
    scene2.add(light2);





    // ---------- Animation Loop ----------
    function animate() {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      torus.rotation.x += 0.01;
      torus.rotation.y += 0.01;

      controls1.update();
      controls2.update();

      renderer1.render(scene1, camera1);
      renderer2.render(scene2, camera2);
    }
    animate();



    // Cleanup on unmount
    return () => {
      container.removeChild(renderer1.domElement);
      container.removeChild(renderer2.domElement);
    };
  }, []);

  return (
    <div id="multi-scenes-container" className="flex w-full h-screen bg-black overflow-hidden"></div>
  );
}
