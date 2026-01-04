import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Group } from 'three';

// Ginger - Irregular organic root shape with multiple segments
const Ginger = ({ position }: { position: [number, number, number] }) => {
  const groupRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.25;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Main body */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
        <capsuleGeometry args={[0.25, 0.6, 8, 16]} />
        <meshStandardMaterial color="#d4a574" roughness={0.8} metalness={0.1} />
      </mesh>
      {/* Branch 1 */}
      <mesh position={[0.3, 0.2, 0.1]} rotation={[0, 0, -Math.PI / 4]}>
        <capsuleGeometry args={[0.15, 0.4, 8, 16]} />
        <meshStandardMaterial color="#c9a067" roughness={0.8} metalness={0.1} />
      </mesh>
      {/* Branch 2 */}
      <mesh position={[-0.2, -0.1, 0]} rotation={[0, Math.PI / 3, Math.PI / 5]}>
        <capsuleGeometry args={[0.12, 0.3, 8, 16]} />
        <meshStandardMaterial color="#b8925a" roughness={0.8} metalness={0.1} />
      </mesh>
      {/* Small knob */}
      <mesh position={[0.1, 0.4, -0.1]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#d4a574" roughness={0.9} metalness={0.05} />
      </mesh>
    </group>
  );
};

// Honey - Honeycomb structure
const Honey = ({ position }: { position: [number, number, number] }) => {
  const groupRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * 0.7) * 0.4;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Main honeycomb block */}
      <mesh>
        <boxGeometry args={[0.8, 0.5, 0.3]} />
        <meshStandardMaterial 
          color="#f0c14b" 
          roughness={0.4} 
          metalness={0.2}
          emissive="#8b6914"
          emissiveIntensity={0.1}
        />
      </mesh>
      {/* Hexagonal pattern details */}
      {[...Array(6)].map((_, i) => (
        <mesh 
          key={i}
          position={[
            (i % 3 - 1) * 0.25,
            (Math.floor(i / 3) - 0.5) * 0.2,
            0.16
          ]}
        >
          <cylinderGeometry args={[0.08, 0.08, 0.02, 6]} />
          <meshStandardMaterial color="#c9a43a" roughness={0.5} />
        </mesh>
      ))}
      {/* Honey drip effect */}
      <mesh position={[0.3, -0.3, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial 
          color="#d4a017" 
          roughness={0.2} 
          metalness={0.3}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  );
};

// Coffee - Multiple coffee beans clustered together
const Coffee = ({ position }: { position: [number, number, number] }) => {
  const groupRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.15;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6 + 2) * 0.35;
    }
  });

  // Coffee bean shape (ellipsoid with center crease)
  const CoffeeBean = ({ pos, rotation }: { pos: [number, number, number], rotation: [number, number, number] }) => (
    <group position={pos} rotation={rotation}>
      <mesh scale={[1, 1.3, 0.7]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#3e2723" roughness={0.7} metalness={0.1} />
      </mesh>
      {/* Center crease */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.02, 0.25, 0.08]} />
        <meshStandardMaterial color="#2a1810" roughness={0.9} />
      </mesh>
    </group>
  );

  return (
    <group ref={groupRef} position={position}>
      <CoffeeBean pos={[0, 0, 0]} rotation={[0.2, 0, 0.3]} />
      <CoffeeBean pos={[0.25, 0.15, 0.1]} rotation={[0.5, 0.3, 0.1]} />
      <CoffeeBean pos={[-0.2, 0.1, -0.15]} rotation={[-0.3, 0.5, 0.4]} />
      <CoffeeBean pos={[0.1, -0.2, 0.2]} rotation={[0.1, -0.4, 0.2]} />
      <CoffeeBean pos={[-0.15, -0.15, 0]} rotation={[0.4, 0.2, -0.3]} />
    </group>
  );
};

// Sugar - Crystalline cube structure with sparkle
const Sugar = ({ position }: { position: [number, number, number] }) => {
  const groupRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * 0.8 + 4) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Main crystal */}
      <mesh>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial 
          color="#ffffff" 
          roughness={0.1} 
          metalness={0.8}
          transparent
          opacity={0.95}
        />
      </mesh>
      {/* Smaller crystals */}
      {[...Array(4)].map((_, i) => (
        <mesh 
          key={i}
          position={[
            Math.cos(i * Math.PI / 2) * 0.35,
            Math.sin(i * Math.PI / 2) * 0.35,
            0
          ]}
          rotation={[i * 0.3, i * 0.5, i * 0.2]}
        >
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshStandardMaterial 
            color="#f8f8f8" 
            roughness={0.15} 
            metalness={0.7}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  );
};

const ProductFloatingObjects = () => {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-10, -10, -5]} intensity={0.4} />
      <pointLight position={[0, 5, 5]} intensity={0.5} color="#fff4e6" />
      
      {/* Position objects across the scene */}
      <Ginger position={[-4, 1, -2]} />
      <Honey position={[4, -1, -3]} />
      <Coffee position={[-3, -2, -1]} />
      <Sugar position={[3, 2, -2]} />
      
      {/* Duplicate for more density */}
      <Ginger position={[5, 0, -4]} />
      <Coffee position={[-5, 1, -3]} />
      <Sugar position={[0, -2, -2]} />
      <Honey position={[-1, 2, -3]} />
    </>
  );
};

export default ProductFloatingObjects;
