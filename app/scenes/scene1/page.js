'use client';
import { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function Scene1() {
  const mountRef = useRef(null);
  const [reloadKey, setReloadKey] = useState(Date.now()); // unique key on load

  useEffect(() => {

    // ✅ Clean previous canvas if exists
    if (mountRef.current && mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }

    // 1️⃣ Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x222222); // Dark background



    const camera = new THREE.PerspectiveCamera(
      60,                                 // Field of view (how wide you see)
      window.innerWidth / window.innerHeight, // Keeps proportions correct
      0.1,                                // Objects closer than this are not visible
      1000                                // Objects farther than this are not visible
    );
    camera.position.z = 25; // Move the camera 5 units away from center
    camera.position.y = 10; // Move the camera up a bit
    camera.position.x = -20; // Center the camera horizontally
    camera.lookAt(0, 0, 0); // Look at the center of the scene (0, 0, 0)





    // 3️⃣ Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);


    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });





    // 4️⃣ Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Smooth movement
    controls.dampingFactor = 0.05; // How smooth the movement is
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



    // Cone
    const coneGeometry = new THREE.ConeGeometry(0.5, 1.5, 32);
    const coneMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
    const cone = new THREE.Mesh(coneGeometry, coneMaterial);
    cone.position.set(0.5, 1.5, -4);
    scene.add(cone);

    // Cylinder
    const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1.5, 32);
    const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 0xff00ff });
    const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinder.position.set(-1.5, 0.75, -4);
    scene.add(cylinder);


    // Ground plane
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.MeshStandardMaterial({ color: 'red', side: THREE.DoubleSide })
    );
    plane.rotation.x = Math.PI / 2;
    plane.position.y = -1.5;
    scene.add(plane);




    // Ground plane2
    const planeGeometry2 = new THREE.PlaneGeometry(10, 10);
    const planeMaterial2 = new THREE.MeshStandardMaterial({ color: 'gray', side: THREE.DoubleSide });
    const plane2 = new THREE.Mesh(planeGeometry2, planeMaterial2);
    plane2.rotation.x = Math.PI / 1; // Rotate flat
    plane2.position.y = 3.5;
    plane2.position.x = 0
    plane2.position.z = -5; // Move it to the right
    scene.add(plane2);








    // road plane
    const road = new THREE.Mesh(
      new THREE.BoxGeometry(20, 0.2, 120),
      new THREE.MeshStandardMaterial({ color: 'gray', side: THREE.DoubleSide })
    );

    road.position.x = 20;
    road.position.y = -1.5;
    road.position.z = -20;

    scene.add(road);



    // road plane
    const road3 = new THREE.Mesh(
      new THREE.BoxGeometry(20, 0.2, 120),
      new THREE.MeshStandardMaterial({ color: 'gray', side: THREE.DoubleSide })
    );

    road3.position.x = 40.5;
    road3.position.y = -1.5;
    road3.position.z = -20;

    scene.add(road3);




    const strip = new THREE.Mesh(
      new THREE.BoxGeometry(2, 0.4, 12),
      new THREE.MeshStandardMaterial({ color: 'dark-grey', side: THREE.DoubleSide })
    );

    strip.position.x = 20;
    strip.position.y = -1.5;
    strip.position.z = -20;

    scene.add(strip);








    const road2 = new THREE.Mesh(
      new THREE.BoxGeometry(120, 0.2, 20),
      new THREE.MeshStandardMaterial({ color: 'gray', side: THREE.DoubleSide })
    );

    road2.position.x = -20;
    road2.position.y = -1.5;
    road2.position.z = -40;

    scene.add(road2);





    const road4 = new THREE.Mesh(
      new THREE.BoxGeometry(120, 0.2, 20),
      new THREE.MeshStandardMaterial({ color: 'red', side: THREE.DoubleSide })
    );

    road4.position.x = -60;
    road4.position.y = -1.5;
    road4.position.z = -40;

    scene.add(road4);


    const road5 = new THREE.Mesh(
      new THREE.BoxGeometry(120, 0.2, 20),
      new THREE.MeshStandardMaterial({ color: 'black', side: THREE.DoubleSide })
    );

    road5.position.x = 60;
    road5.position.y = -1.5;
    road5.position.z = -60;

    scene.add(road5);























    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100),
      new THREE.MeshStandardMaterial({ color: 'gray', side: THREE.DoubleSide })
    );
    ground.rotation.x = Math.PI / 2;

    ground.position.x = 0;
    ground.position.y = -3;
    ground.position.z = 0;
    scene.add(ground);

    // 5️⃣ Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // Soft light
    scene.add(ambientLight);

    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(20, 3, 10);
    scene.add(light);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);




    // 6️⃣ Animation Loop
    function animate() {
      requestAnimationFrame(animate);

      // cube.position.y = Math.sin(Date.now() * 0.002) * 2; // Moves up/down
      // cube.rotation.y += 0.01; // Spins continuously
      cube.scale.set(
        1 + Math.sin(Date.now() * 0.003) * 0.2,
        1 + Math.sin(Date.now() * 0.003) * 0.2,
        1 + Math.sin(Date.now() * 0.003) * 0.2
      ); // "breathing" effect



      sphere.rotation.y += 0.02;

      torus.rotation.x += 0.01;
      torus.position.y = Math.sin(Date.now() * 0.001) * 0.5; // Bounce effect


      controls.update(); // Required for damping effect
      renderer.render(scene, camera);
    }


    animate();



    // ✅ Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [reloadKey]); // ✅ This makes the scene reload every time reloadKey changes




  // ✅ Trigger remount on hot reload
  if (import.meta?.hot) {
    import.meta.hot.accept(() => {
      setReloadKey(Date.now());
    });
  }



  return <div ref={mountRef}></div>;
}
