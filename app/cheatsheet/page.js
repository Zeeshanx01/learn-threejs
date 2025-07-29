'use client';

export default function Cheatsheet() {
  const cheatsheetData = [
    {
      category: 'Core',
      items: [
        { code: 'THREE.Scene()', desc: 'Creates a container for all 3D objects, lights, and cameras.' },
        { code: 'THREE.WebGLRenderer({ antialias: true })', desc: 'Renders the scene with smooth edges using WebGL.' },
        { code: 'THREE.Color(0x000000)', desc: 'Defines a color using a hexadecimal value (black in this case).' },
      ],
    },
    {
      category: 'Camera',
      items: [
        { code: 'THREE.PerspectiveCamera(fov, aspect, near, far)', desc: 'Simulates a real-world camera with perspective view.' },
        { code: 'THREE.OrthographicCamera(left, right, top, bottom, near, far)', desc: 'Camera without perspective, useful for 2D-like scenes.' },
      ],
    },
    {
      category: 'Geometry',
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
      category: 'Materials',
      items: [
        { code: 'THREE.MeshBasicMaterial({ color })', desc: 'Material that does not react to light.' },
        { code: 'THREE.MeshStandardMaterial({ color, metalness, roughness })', desc: 'Physically-based material that reacts to lights realistically.' },
        { code: 'THREE.MeshPhongMaterial({ color, shininess })', desc: 'Material with shiny highlights (specular reflection).' },
        { code: 'THREE.MeshLambertMaterial({ color })', desc: 'Non-shiny, matte surface material that reacts to light.' },
      ],
    },
    {
      category: 'Lights',
      items: [
        { code: 'THREE.AmbientLight(color, intensity)', desc: 'Soft light that illuminates all objects equally.' },
        { code: 'THREE.DirectionalLight(color, intensity)', desc: 'Light shining in a specific direction, like sunlight.' },
        { code: 'THREE.PointLight(color, intensity)', desc: 'Light that radiates from a single point in all directions.' },
        { code: 'THREE.SpotLight(color, intensity)', desc: 'Cone-shaped light, like a flashlight or stage light.' },
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
      category: 'Animation',
      items: [
        { code: 'object.position.x/y/z', desc: 'Move an object along the X, Y, or Z axis.' },
        { code: 'object.rotation.x/y/z', desc: 'Rotate an object around the X, Y, or Z axis (in radians).' },
        { code: 'object.scale.set(x, y, z)', desc: 'Resize an object along X, Y, Z axes.' },
        { code: 'requestAnimationFrame(animate)', desc: 'Creates a loop that updates and re-renders the scene each frame.' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white sm:p-10 px-2 py-10">
      <h1 className="text-4xl font-bold mb-6">📜 Three.js Cheatsheet</h1>
      <p className="text-lg text-gray-400 mb-8">Quick reference for essential Three.js classes, methods, and their purpose.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cheatsheetData.map((section, idx) => (
          <div key={idx} className="bg-gray-800 sm:p-5 p-2 rounded-xl shadow-md border border-gray-700">
            <h2 className="text-2xl font-semibold mb-3 text-blue-400">{section.category}</h2>
            <div className="space-y-3">
              {section.items.map((item, i) => (
                <div key={i} className="bg-gray-900 rounded-lg sm:p-3 p-1 border border-gray-700 hover:border-blue-400 transition">
                  <code className="block text-green-400 font-mono text-lg mb-1">
                    {item.code}
                  </code>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
