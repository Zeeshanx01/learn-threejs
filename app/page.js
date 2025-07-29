'use client';
import Link from 'next/link';

export default function Home() {
  const scenes = [
    { id: 1, name: 'Scene 1 - Objects Playground', path: '/scene1' },
    { id: 2, name: 'Scene 2 - Galaxy of Stars', path: '/scene2' },
  ];


  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-10">
      <h1 className="text-4xl font-bold mb-8">🎨 Three.js Playground</h1>
      <p className="text-lg mb-6 text-gray-300">
        Explore different 3D scenes built with Three.js
      </p>

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
