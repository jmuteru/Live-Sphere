"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

import { useGlobeStore } from "@/lib/store"

export default function Earth() {
  const { isDarkMode } = useGlobeStore()
  const earthRef = useRef<THREE.Mesh>(null)
  const cloudsRef = useRef<THREE.Mesh>(null)

  // Create a simple Earth texture with a grid pattern
  const earthTexture = new THREE.TextureLoader().load("/placeholder.svg?height=1024&width=2048")

  // Animate clouds
  useFrame(({ clock }) => {
    if (cloudsRef.current) {
      // Create a new rotation quaternion instead of modifying directly
      const rotation = new THREE.Euler(0, clock.getElapsedTime() * 0.05, 0)
      cloudsRef.current.setRotationFromEuler(rotation)
    }
  })

  return (
    <group>
      {/* Earth sphere */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          color={isDarkMode ? 0x1a4275 : 0x2a6ac1}
          map={earthTexture}
          shininess={5}
          emissive={new THREE.Color(isDarkMode ? 0x112244 : 0x000000)}
          emissiveIntensity={isDarkMode ? 0.1 : 0}
        />
      </mesh>

      {/* Clouds layer */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.01, 64, 64]} />
        <meshPhongMaterial
          color={0xffffff}
          opacity={0.4}
          depthWrite={false}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Atmosphere glow */}
      <mesh>
        <sphereGeometry args={[1.015, 64, 64]} />
        <meshPhongMaterial
          color={isDarkMode ? 0x3a85e0 : 0x88ccff}
          opacity={0.1}
          transparent={true}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}
