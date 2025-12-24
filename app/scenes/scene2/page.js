'use client';
import { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function Scene2() {
  useEffect(() => {


    // 1️⃣ Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000011); // Deep space color






    // 2️⃣ Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;






    // 3️⃣ Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);







    // 4️⃣ Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;







    // 5️⃣ Starfield (particles)
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 2000;
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i++) {
      starPositions[i] = (Math.random() - 0.5) * 200;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5 });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);






    // 6️⃣ Planet (sphere)
    const planet = new THREE.Mesh(
      new THREE.SphereGeometry(5, 32, 32),
      new THREE.MeshStandardMaterial({
        color: 0x2266ff,
        metalness: 0.6,
        roughness: 0.4
      })
    );
    scene.add(planet);






    // 7️⃣ Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 2);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);





    // 8️⃣ Animate
    function animate() {
      requestAnimationFrame(animate);

      // Rotate planet and stars slowly
      planet.rotation.y += 0.002;
      stars.rotation.y += 0.0005;

      controls.update();
      renderer.render(scene, camera);
    }
    animate();




    // 9️⃣ Handle resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });







    // 🔟 Cleanup
    return () => {
      renderer.dispose();
      document.body.removeChild(renderer.domElement);
    };


    
  }, []);

  return null;
}
