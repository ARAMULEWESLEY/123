import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Group, Vector3 } from 'three';
import * as THREE from 'three';

const Hexagon = ({ 
  position, 
  mousePosition 
}: { 
  position: [number, number, number];
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);
  const initialY = position[1];
  
  useFrame((state) => {
    if (meshRef.current && edgesRef.current) {
      // Floating animation
      const time = state.clock.elapsedTime;
      meshRef.current.position.y = initialY + Math.sin(time * 0.5 + position[0] + position[2]) * 0.2;
      
      // Interactive: React to mouse position
      const distanceX = (mousePosition.current.x * 5 - position[0]) * 0.1;
      const distanceZ = (mousePosition.current.y * 5 - position[2]) * 0.1;
      const distance = Math.sqrt(distanceX * distanceX + distanceZ * distanceZ);
      const maxDistance = 3;
      
      if (distance < maxDistance) {
        const influence = 1 - distance / maxDistance;
        meshRef.current.position.y += influence * 0.5;
        const material = edgesRef.current.material as THREE.LineBasicMaterial;
        material.opacity = 0.3 + influence * 0.7;
        material.color.setHSL(
          0.55, // Blue hue
          0.7 + influence * 0.3,
          0.4 + influence * 0.4
        );
      } else {
        const material = edgesRef.current.material as THREE.LineBasicMaterial;
        material.opacity = 0.3;
        material.color.setHSL(0.55, 0.7, 0.4);
      }
      
      // Sync edges with mesh
      edgesRef.current.position.copy(meshRef.current.position);
      edgesRef.current.rotation.copy(meshRef.current.rotation);
    }
  });

  // Create hexagon geometry
  const hexGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const radius = 0.5;
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      if (i === 0) {
        shape.moveTo(x, y);
      } else {
        shape.lineTo(x, y);
      }
    }
    shape.closePath();
    
    const extrudeSettings = {
      depth: 0.1,
      bevelEnabled: false,
    };
    
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  const edgesGeometry = useMemo(() => new THREE.EdgesGeometry(hexGeometry), [hexGeometry]);

  return (
    <group>
      <mesh 
        ref={meshRef} 
        position={position} 
        rotation={[Math.PI / 2, 0, 0]}
        geometry={hexGeometry}
      >
        <meshStandardMaterial 
          color="#0a1628"
          transparent
          opacity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <lineSegments 
        ref={edgesRef}
        geometry={edgesGeometry}
      >
        <lineBasicMaterial 
          color="#3b82f6"
          transparent
          opacity={0.3}
          linewidth={2}
        />
      </lineSegments>
    </group>
  );
};

const HexagonalPattern = () => {
  const { viewport } = useThree();
  const mousePosition = useRef({ x: 0, y: 0 });
  const groupRef = useRef<Group>(null);

  // Create hexagonal grid
  const hexagons = useMemo(() => {
    const hexes: Array<[number, number, number]> = [];
    const hexWidth = 1;
    const hexHeight = Math.sqrt(3) * hexWidth / 2;
    const rows = 12;
    const cols = 16;
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * hexWidth * 1.5 - (cols * hexWidth * 1.5) / 2;
        const z = row * hexHeight - (rows * hexHeight) / 2;
        const offsetX = row % 2 === 0 ? 0 : hexWidth * 0.75;
        hexes.push([x + offsetX, -1, z]);
      }
    }
    
    return hexes;
  }, []);

  useFrame((state) => {
    // Track mouse position
    mousePosition.current = {
      x: state.mouse.x,
      y: state.mouse.y
    };
    
    // Gentle rotation of entire pattern
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -5]}>
      {hexagons.map((pos, i) => (
        <Hexagon 
          key={i} 
          position={pos} 
          mousePosition={mousePosition}
        />
      ))}
    </group>
  );
};

export default HexagonalPattern;
