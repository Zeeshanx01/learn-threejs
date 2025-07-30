'use client';
import { useState } from 'react';

export default function Cheatsheet() {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedCode, setCopiedCode] = useState('');

  const cheatsheetData = [
    {
      category: 'Core (Three.js)',
      items: [
        { code: 'THREE.Scene()', desc: 'Creates a container for all 3D objects, lights, and cameras.' },
        { code: 'THREE.WebGLRenderer({ antialias: true })', desc: 'Renders the scene with smooth edges using WebGL.' },
        { code: 'THREE.Color(0x000000)', desc: 'Defines a color using a hexadecimal value (black in this case).' },
      ],
    },
    {
      category: 'Core (R3F)',
      items: [
        { code: '<Canvas shadows camera={{ position: [0, 5, 10], fov: 60 }} />', desc: 'Main R3F canvas that manages scene, camera, and renderer automatically.' },
        { code: '<color attach="background" args={["#222222"]} />', desc: 'Sets the background color of the scene in R3F.' },
      ],
    },
    {
      category: 'Camera (Three.js)',
      items: [
        { code: 'THREE.PerspectiveCamera(fov, aspect, near, far)', desc: 'Simulates a real-world camera with perspective view.' },
        { code: 'THREE.OrthographicCamera(left, right, top, bottom, near, far)', desc: 'Camera without perspective, useful for 2D-like scenes.' },
      ],
    },
    {
      category: 'Camera (R3F)',
      items: [
        { code: '<PerspectiveCamera makeDefault position={[0, 5, 10]} />', desc: 'Adds a perspective camera as the default one in R3F.' },
        { code: '<OrthographicCamera makeDefault args={[-10, 10, 10, -10, 0.1, 100]} />', desc: 'Adds an orthographic camera in R3F.' },
      ],
    },
    {
      category: 'Geometry (Three.js)',
      items: [
        { code: 'THREE.BoxGeometry(width, height, depth)', desc: 'Creates a cube or rectangular box.' },
        { code: 'THREE.SphereGeometry(radius, widthSegments, heightSegments)', desc: 'Creates a sphere with customizable detail.' },
        { code: 'THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments)', desc: 'Creates a donut-shaped geometry.' },
        { code: 'THREE.PlaneGeometry(width, height)', desc: 'Creates a flat 2D plane.' },
        { code: 'THREE.ConeGeometry(radius, height, radialSegments)', desc: 'Creates a cone shape.' },
        { code: 'THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments)', desc: 'Creates a cylinder.' },
      ],
    },
    {
      category: 'Geometry (R3F)',
      items: [
        { code: '<mesh><boxGeometry args={[1,1,1]} /><meshStandardMaterial color="red" /></mesh>', desc: 'Adds a cube mesh with material in R3F.' },
        { code: '<mesh><sphereGeometry args={[0.5,32,32]} /><meshStandardMaterial color="blue" /></mesh>', desc: 'Creates a sphere mesh in R3F.' },
      ],
    },
        {
      category: 'Materials',
      items: [
        { code: 'THREE.MeshBasicMaterial({ color })', desc: 'Material that does not react to light.' },
        { code: 'THREE.MeshStandardMaterial({ color, metalness, roughness })', desc: 'Physically-based material that reacts to lights realistically.' },
        { code: 'THREE.MeshPhongMaterial({ color, shininess })', desc: 'Material with shiny highlights (specular reflection).' },
        { code: 'THREE.MeshLambertMaterial({ color })', desc: 'Non-shiny, matte surface material that reacts to light.' },
      ],
    },
    {
      category: 'Lights (Three.js)',
      items: [
        { code: 'THREE.AmbientLight(color, intensity)', desc: 'Soft light that illuminates all objects equally.' },
        { code: 'THREE.DirectionalLight(color, intensity)', desc: 'Light shining in a specific direction, like sunlight.' },
        { code: 'THREE.PointLight(color, intensity)', desc: 'Light that radiates from a single point in all directions.' },
        { code: 'THREE.SpotLight(color, intensity)', desc: 'Cone-shaped light, like a flashlight or stage light.' },
      ],
    },
    {
      category: 'Lights (R3F)',
      items: [
        { code: '<ambientLight intensity={0.4} />', desc: 'Soft global light in R3F.' },
        { code: '<directionalLight position={[10,10,5]} intensity={2} />', desc: 'Directional light similar to sunlight.' },
        { code: '<pointLight position={[5,5,5]} />', desc: 'Point light emitting in all directions.' },
      ],
    },
        {
      category: 'Objects',
      items: [
        { code: 'THREE.Mesh(geometry, material)', desc: 'Combines geometry and material to create a visible 3D object.' },
        { code: 'THREE.Group()', desc: 'Groups multiple meshes together to manipulate as one.' },
      ],
    },    
    {
      category: 'Helpers',
      items: [
        { code: 'THREE.AxesHelper(size)', desc: 'Displays X (red), Y (green), Z (blue) axes for reference.' },
        { code: 'THREE.GridHelper(size, divisions)', desc: 'Creates a floor grid for positioning objects easily.' },
      ],
    },
    {
      category: 'Animation (Three.js)',
      items: [
        { code: 'object.position.x/y/z', desc: 'Move an object along the X, Y, or Z axis.' },
        { code: 'object.rotation.x/y/z', desc: 'Rotate an object around the X, Y, or Z axis (in radians).' },
        { code: 'object.scale.set(x, y, z)', desc: 'Resize an object along X, Y, Z axes.' },
        { code: 'requestAnimationFrame(animate)', desc: 'Creates a loop that updates and re-renders the scene each frame.' },
      ],
    },
    {
      category: 'Animation (R3F)',
      items: [
        { code: 'useFrame((state, delta) => { ref.current.rotation.y += delta })', desc: 'Updates an object on every frame in R3F.' },
      ],
    },
    {
      category: 'Controls (Three.js)',
      items: [
        { code: 'new OrbitControls(camera, renderer.domElement)', desc: 'Adds orbit controls to navigate around the scene.' },
      ],
    },
    {
      category: 'Controls (R3F)',
      items: [
        { code: '<OrbitControls enableDamping />', desc: 'Adds orbit controls directly in R3F with smooth damping.' },
      ],
    },
        {
      category: 'Colors Palette',
      items: [
        { code: '0xffffff', desc: 'Pure white color (hexadecimal).' },
        { code: '0x000000', desc: 'Pure black color (hexadecimal).' },
        { code: '0xff0000', desc: 'Red color (hexadecimal).' },
        { code: '0x00ff00', desc: 'Green color (hexadecimal).' },
        { code: '0x0000ff', desc: 'Blue color (hexadecimal).' },
        { code: '0xffff00', desc: 'Yellow color (hexadecimal).' },
        { code: '0xff00ff', desc: 'Magenta color (hexadecimal).' },
        { code: '0x00ffff', desc: 'Cyan color (hexadecimal).' },
        { code: '"white"', desc: 'CSS color names can be used as strings.' },
        { code: '"blue"', desc: 'CSS named colors also work for materials and lights.' },
        { code: 'new THREE.Color("hsl(200, 100%, 50%)")', desc: 'Defines color using HSL values.' },
        { code: 'new THREE.Color("rgb(255, 100, 50)")', desc: 'Defines color using RGB values.' },
      ],
    },
  ];

  // Highlight search match
  const highlightMatch = (text) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, `<mark class="bg-yellow-500 text-black rounded px-1">$1</mark>`);
  };

  const filteredData = cheatsheetData
    .map(section => ({
      ...section,
      items: section.items.filter(item =>
        item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        section.category.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter(section => section.items.length > 0);

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white sm:p-10 px-2 py-10">
      <h1 className="text-4xl font-bold mb-6">📜 Three.js & R3F Cheatsheet</h1>
      <p className="text-lg text-gray-400 mb-4">Quick reference for essential Three.js and React Three Fiber methods, components, and colors.</p>

      {/* Search */}
      <input
        type="text"
        placeholder="🔍 Search methods or components..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-8 px-4 py-3 rounded-lg text-white/70 bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filteredData.length > 0 ? (
          filteredData.map((section, idx) => (
            <div key={idx} className="bg-gray-800 sm:p-5 p-2 rounded-xl shadow-md border border-gray-700">
              <h2
                className="text-2xl font-semibold mb-3 text-blue-400"
                dangerouslySetInnerHTML={{ __html: highlightMatch(section.category) }}
              />
              <div className="space-y-3">
                {section.items.map((item, i) => (
                  <div key={i} className="bg-gray-900 rounded-lg sm:p-3 p-2 border border-gray-700 hover:border-blue-400 transition relative">
                    <div className="flex justify-between items-start">
                      <code
                        className="block text-green-400 font-mono text-lg mb-1 break-all"
                        dangerouslySetInnerHTML={{ __html: highlightMatch(item.code) }}
                      />
                      <button
                        onClick={() => copyToClipboard(item.code)}
                        className="ml-1 text-[0.6rem] bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-white transition"
                      >
                        {copiedCode === item.code ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <p
                      className="text-gray-400 text-sm"
                      dangerouslySetInnerHTML={{ __html: highlightMatch(item.desc) }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-2">No results found.</p>
        )}
      </div>
    </div>
  );
}
