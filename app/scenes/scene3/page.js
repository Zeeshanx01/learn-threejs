'use client';
import { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function Scene3() {


  useEffect(() => {

    // 1️⃣ Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111); // Dark background

    // 2️⃣ Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(10, 5, 15); // Start slightly away from center

    // 3️⃣ Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 4️⃣ Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    
    // 5️⃣ Objects (Static)
    const material = new THREE.MeshStandardMaterial({ color: 0xff8844, metalness: 0.5, roughness: 0.3 });

    // Big cube
    const cube = new THREE.Mesh(new THREE.BoxGeometry(4, 4, 4), material);
    scene.add(cube);

    // Small spheres around cube
    const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x44aaff });
    for (let i = 0; i < 10; i++) {
      const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), sphereMaterial);
      const angle = (i / 10) * Math.PI * 2;
      const radius = 8;
      sphere.position.set(Math.cos(angle) * radius, Math.random() * 4 - 2, Math.sin(angle) * radius);
      scene.add(sphere);
    }

    // 6️⃣ Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.3));

    const pointLight = new THREE.PointLight(0xffffff, 1.5);
    pointLight.position.set(5, 10, 5);
    scene.add(pointLight);

    // 7️⃣ Animate Camera around center
    let angle = 0;
    function animate() {
      requestAnimationFrame(animate);

      // Auto orbit camera around the center
      angle += 0.002;
      camera.position.x = 15 * Math.cos(angle);
      camera.position.z = 15 * Math.sin(angle);
      camera.lookAt(0, 0, 0); // Always face center

      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    // 8️⃣ Handle resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // 9️⃣ Cleanup
    return () => {
      renderer.dispose();
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  return null;
}
