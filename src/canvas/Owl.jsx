import {
  useAnimations,
  useGLTF,
  useKeyboardControls,
  useTexture,
} from "@react-three/drei";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { clamp } from "three/src/math/MathUtils";
import { damp3 } from "maath/easing";

import GamepadControls from "../controls/GamepadControls";

const camTargetPosition = new THREE.Vector3();

const cameraDistance = 4;
const euler = new THREE.Euler(0, 0, 0, "YXZ");

export function Owl(props) {
  const [flyControls, setFlyControls] = useState(false);

  const { scene, animations } = useGLTF("/glb/macaw.glb");
  const { actions, ref } = useAnimations(animations, scene);

  const camTarget = useRef();
  const toggleControls = useKeyboardControls((state) => state.toggleControls);

  const diffuse = useTexture("/textures/owl/diffuse.jpg");
  const birdMat = useMemo(
    () => new THREE.MeshStandardMaterial({ map: diffuse }),
    []
  );

  useEffect(() => {
    if (toggleControls) {
      console.log("toggleControls");
      setFlyControls(!flyControls);
    }
  }, [toggleControls]);
  // Assuming controls is an instance of OrbitControls

  useEffect(() => {
    if (actions["Flying"]) {
      actions["Flying"].play();
      actions["Flying"].timeScale = 0.44;
    }
  }, []);

  useLayoutEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        const mesh = child;
        mesh.material = birdMat;
        mesh.frustumCulled = false;
        mesh.material.side = THREE.DoubleSide;

        mesh.scale.setScalar(0.01);
        // mesh.visible = false;
      }
    });
  }, [scene]);

  useFrame(({ camera }, delta) => {
    if (!ref.current || !flyControls) return;

    camera.lookAt(ref.current.position);
    camTarget.current?.getWorldPosition(camTargetPosition);
    damp3(camera.position, camTargetPosition, 0.4, delta);
  });

  return (
    <>
      <primitive object={scene} ref={ref} {...props}>
        <mesh position={[0, 3, cameraDistance]} ref={camTarget} visible={false}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="hotpink" />
        </mesh>
      </primitive>
      {flyControls && <GamepadControls object={ref} />}
    </>
  );
}
