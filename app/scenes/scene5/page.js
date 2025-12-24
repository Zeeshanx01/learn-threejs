'use client';
import { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function Scene5() {
  useEffect(() => {
    // =============================
    // Common Renderer
    // =============================
    const container = document.getElementById('viewport-scenes-container');

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // ---------- Scene 1 ----------
    const scene1 = new THREE.Scene();
    scene1.background = new THREE.Color(0x222222);

    const camera1 = new THREE.PerspectiveCamera(60, window.innerWidth / 2 / window.innerHeight, 0.1, 1000);
    camera1.position.z = 4;

    const controls1 = new OrbitControls(camera1, renderer.domElement);
    controls1.enableDamping = true;

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
    scene2.background = new THREE.Color(0x113344);

    const camera2 = new THREE.PerspectiveCamera(60, window.innerWidth / 2 / window.innerHeight, 0.1, 1000);
    camera2.position.z = 5;

    const controls2 = new OrbitControls(camera2, renderer.domElement);
    controls2.enableDamping = true;

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 32),
      new THREE.MeshStandardMaterial({ color: 0x00aaff, metalness: 0.6, roughness: 0.2 })
    );
    scene2.add(sphere);

    const light2 = new THREE.DirectionalLight(0xffffff, 1.5);
    light2.position.set(5, 5, 5);
    scene2.add(light2);


    // ---------- Animation Loop ----------
    function animate() {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      sphere.rotation.y += 0.01;

      controls1.update();
      controls2.update();

      // Scene 1 → Left side
      renderer.setViewport(0, 0, window.innerWidth / 2, window.innerHeight);
      renderer.setScissor(0, 0, window.innerWidth / 2, window.innerHeight);
      renderer.setScissorTest(true);
      renderer.render(scene1, camera1);

      // Scene 2 → Right side
      renderer.setViewport(window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight);
      renderer.setScissor(window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight);
      renderer.setScissorTest(true);
      renderer.render(scene2, camera2);
    }
    animate();

    // Cleanup
    return () => {
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div id="viewport-scenes-container" className="w-full h-screen bg-black overflow-hidden"></div>
  );
}
