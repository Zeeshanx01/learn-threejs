'use client'

import React from 'react'
import { Canvas } from '@react-three/fiber'
import Experience from './components/Experience'
import { OrbitControls } from '@react-three/drei'






const scene8 = () => {
  return (
    <Canvas
      camera={{ position: [2.3, 1.5, 2.3], fov: 64 }}
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#d9afd9',
        backgroundImage: 'linear-gradient(0deg, #d9afd9 0%, #97d9e1 100%)'
      }}
    >
    {/* <OrbitControls zoom={false}/> */}

      <Experience />
      
    </Canvas>
  )
}

export default scene8
