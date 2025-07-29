'use client';
import Link from 'next/link';

export default function Home() {

  // 🎬 Scenes list
const scenes = [
  { id: 1, name: 'Scene 1 - Objects Playground', path: '/scenes/scene1' },
  { id: 2, name: 'Scene 2 - Galaxy of Stars', path: '/scenes/scene2' },
  { id: 3, name: 'Scene 3 - Auto Camera Orbit', path: '/scenes/scene3' },
  { id: 4, name: 'Scene 4 - Two Scenes Side by Side', path: '/scenes/scene4' },
  { id: 5, name: 'Scene 5 - Split Viewport (Single Canvas)', path: '/scenes/scene5' },
];



  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-10">
      <h1 className="text-4xl font-bold mb-8">🎨 Three.js Playground</h1>
      <p className="text-lg mb-6 text-gray-300">
        Explore different 3D scenes built with Three.js
      </p>

      {/* =====================
          📜 Cheatsheet Section
      ====================== */}
      <div className="w-full max-w-xl mb-10">
        <Link
          href="/cheatsheet"
          className="block p-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 cursor-pointer text-center border border-blue-400"
        >
          <h2 className="text-2xl font-semibold mb-2">📜 Three.js Cheatsheet</h2>
          <p className="text-gray-100">Quick reference for essential Three.js classes and methods</p>
        </Link>
      </div>

      {/* =====================
          🎬 Scenes Section
      ====================== */}
      <h2 className="text-3xl font-bold mb-5">🎬 Available Scenes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-xl">
        {scenes.map((scene) => (
          <Link
            key={scene.id}
            href={scene.path}
            className="p-6 bg-gray-800 rounded-xl shadow-md hover:bg-gray-700 transition-all duration-300 cursor-pointer border border-gray-700 hover:border-blue-500"
          >
            <h2 className="text-2xl font-semibold mb-2">{scene.name}</h2>
            <p className="text-gray-400">Click to view this 3D scene</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
