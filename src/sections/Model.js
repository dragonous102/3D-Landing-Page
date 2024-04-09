import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { Canvas, useThree, useLoader, useFrame  } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents, Environment, OrbitControls, Stage, useGLTF, PerspectiveCamera    } from "@react-three/drei";
import { Suspense } from "react";
import { Vector3 } from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 1;
  background-color: transparent;
  transition: all 0.3s ease;
`;

const Model = () => {
  const gltf = useGLTF("scene/Demo_Scene_D.gltf");
  const {nodes, materials} = useGLTF("scene/Demo_Scene_D.gltf");
  console.log("nodes:", nodes);
  console.log("materials:", materials);
  // const fbx = useLoader(FBXLoader, "3d/proceduraL planet.fbx");

  function CameraController() {
    const { camera, gl: { domElement }} = useThree();
    const minZoom = 5;
    // Refs for target values which will be used for smooth transitions
    const move = useRef({  positionX: -0.64,positionY: 53, positionZ: -150, rotationY: 0 });
    const velocity = useRef({ positionX: 0,positionY: 0, positionZ: 0, rotationY: 0 });
    // Programmatically setting the zoom level
    

    const handleWheel = (event) => {
      // Update the scroll position based on the wheel delta
      const zoomIntensity = 1;
      const rotationIntensity = 0.05;
      const delta = Math.sign(event.deltaY) * zoomIntensity;

      // Calculate new camera position. Here it's using the Z-axis but you can
      // adjust the vector to pan around or zoom differently like camera.position.add(new THREE.Vector3(x, y, z))

      // Adjust the targets based on scroll input
      move.current.positionX -= delta;
      move.current.positionZ -= delta;
      // move.current.rotationY += Math.sign(event.deltaY) * rotationIntensity;

      // Update the camera's matrices after changing its properties
    };
    useEffect(() => {
      console.log(camera);
      camera.zoom = minZoom; // Set your desired initial zoom level

      // Add event listener
      domElement.addEventListener('wheel', handleWheel);
      
  
      // Remove event listener on cleanup
      return () => {
        domElement.removeEventListener('wheel', handleWheel);
      };
    }, [domElement]);

    const dampingFactor = 0.05;

    // Update loop
    useFrame((state, delta) => {
      // Gradually reduce the velocity based on the damping factor
      
        velocity.current.positionX = (move.current.positionX - camera.position.x) * dampingFactor;
        velocity.current.positionZ = (move.current.positionZ - camera.position.z) * dampingFactor;
    
        // // Update camera positions and rotations with the reduced velocity for smooth effect
        const threshold = 0.001;
  
        if (Math.abs(velocity.current.positionX) < threshold) {
          velocity.current.positionZ = 0;
        }
        if (Math.abs(velocity.current.positionZ) < threshold) {
          velocity.current.positionZ = 0;
        }
        // if (Math.abs(velocity.current.rotationY) < threshold) {
        //   velocity.current.rotationY = 0;
        // }
        // console.log("ve", (camera.position));
        camera.position.x += velocity.current.positionX;
        camera.position.z += velocity.current.positionZ;

        // camera.rotation.y += velocity.current.rotationY;
  
        // // Reduce velocity over time to create a smooth stopping effect
        velocity.current.positionX *= (1 - dampingFactor);
        velocity.current.positionZ *= (1 - dampingFactor);
        // velocity.current.rotationY *= (1 - dampingFactor);
    
        // Update the camera projection matrix
        // camera.updateProjectionMatrix();
      
      
    });

    // return null;
    return <OrbitControls args={[camera, domElement]}  enableZoom={false} enableRotate={true}/>;
  }
  // const orbitControlsRef = useRef();

// function TextSprite({ text }) {
//   // Load a texture to be used as the text
//   const fontTexture = useLoader(TextureLoader, '/path-to-your-texture.png');
  
//   const spriteMaterial = new SpriteMaterial({ map: fontTexture });
  
//   // Create the sprite with the text material
//   return <primitive  />;
// }

  return (
    <Container >
      <Canvas >
        {/* <PerspectiveCamera makeDefault position={[2, 2, 5]} /> */}
        <ambientLight intensity={0.8} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Stage>
          {/* <primitive object={fbx} /> */}
          <primitive object={gltf.scene} dispose={null} />
          <group>
            {/* Map through the nodes or manually pick an object and attach an event */}
            <mesh
              geometry={nodes.Planet_B.geometry}
              material={materials.Planet_B}
              // onClick={handleClick} // Attaching the click event to the specific mes
            >
              {/* <TextSprite text="Your Description" position={[0, 50, -150]} /> */}

              </mesh>
            {/* ... include other parts of the model here as needed */}
          </group>
        </Stage>
        <CameraController />
        
      </Canvas>
    </Container>
  );
};

export default Model;
