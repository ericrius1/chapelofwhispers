import * as THREE from "three";
import * as RAPIER from "@dimforge/rapier3d-compat";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { CapsuleCollider, RigidBody, useRapier } from "@react-three/rapier";

const SPEED = 7;
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();

export function Player({ lerp = THREE.MathUtils.lerp }) {
  const ref = useRef();
  const rapier = useRapier();
  const [, get] = useKeyboardControls();
  useFrame((state) => {
    if (!ref.current) return;
    const { forward, backward, left, right, jump } = get();
    const velocity = ref.current.linvel();
    // update camera
    const translation = ref.current.translation();

    state.camera.position.set(translation.x, translation.y, translation.z);
    // movement
    frontVector.set(0, 0, backward - forward);
    sideVector.set(left - right, 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(state.camera.rotation);
    ref.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z });
    // jumping
  });
  return (
    <>
      <RigidBody
        ref={ref}
        colliders={false}
        mass={1}
        type="dynamic"
        position={[0, 3, 0]}
        enabledRotations={[false, false, false]}
      >
        <CapsuleCollider args={[0.75, 4.5]} />
      </RigidBody>
    </>
  );
}
