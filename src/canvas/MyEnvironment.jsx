import { Environment, useTexture, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
export default function MyEnvironment() {
  const mesh = useRef();

  const { height, rotation, envMapUrl } = useControls("environment", {
    height: { value: 0, min: -10000, max: 10000, step: 1 },
    rotation: { value: 2.08, min: 0, max: Math.PI * 2, step: 0.01 },
    envMapUrl: {
      value: "sunset",
      options: ["sunset", "day", "night"],
    },
  });

  const envMap = useTexture(`/environmentmaps/${envMapUrl}.jpg`);

  useFrame(({ clock }, delta) => {
    mesh.current.rotation.y += delta * 0.3;
  });

  return (
    <>
      <mesh
        scale={10000}
        position-y={height}
        ref={mesh}
        rotation={[0, rotation, 0]}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial map={envMap} side={THREE.BackSide} />
      </mesh>
      <Environment
        background
        near={1}
        far={10000}
        resolution={256}
        frames={Infinity}
      >
        <mesh
          scale={100}
          position-y={height}
          ref={mesh}
          rotation={[0, rotation, 0]}
        >
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial map={envMap} side={THREE.BackSide} />
        </mesh>
      </Environment>
    </>
  );
}
