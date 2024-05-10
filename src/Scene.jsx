import React from "react";
import { useRef, useEffect, useState } from "react";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { Uniform } from "three";

import {
  OrbitControls,
  PointerLockControls,
  useKeyboardControls,
} from "@react-three/drei";
import { LumaSplatsThree, LumaSplatsSemantics } from "@lumaai/luma-web";

import * as THREE from "three";

import { Model as Chapel } from "./canvas/Chapel";
import MyEnvironment from "./canvas/MyEnvironment";
import MagicFrame from "./canvas/MagicFrame";

import { Physics } from "@react-three/rapier";
import { Ground } from "./canvas/Ground";
import { Player } from "./canvas/Player.jsx";
import Grass from "./canvas/grass/Grass.jsx";
import Birds from "./canvas/Birds.jsx";
import { Owl } from "./canvas/Owl.jsx";

const showSplat = true;

const decoyCam = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  500
);

// Make LumaSplatsThree available to R3F
extend({ LumaSplats: LumaSplatsThree });

let uniformTime = new Uniform(0);
export default function Scene(props) {
  const camera = useThree((state) => state.camera);

  const splat = useRef();

  useEffect(() => {
    if (splat && splat.current) splat.current.material.transparent = false;
    splat.current.setShaderHooks({
      vertexShaderHooks: {
        additionalUniforms: {
          time_s: ["float", uniformTime],
        },

        getSplatTransform: /*glsl*/ `
                    (vec3 position, uint layersBitmask) {
                        // sin wave on x-axis
                        float x = 0.;
                        float z = 0.;
                        float y = sin(position.x *2. + time_s) * .1;
                        // float y = sin(position.z * 20. + time_s) *1. ;

                        return mat4(
                            1., 0., 0., 0,
                            0., 1., 0., 0,
                            0., 0., 1., 0,
                            x,  y,  z, 1.
                        );
                    }
                `,
      },
    });
  }, []);

  useFrame(() => {
    uniformTime.value = performance.now() / 1000;
  });
  return (
    <>
      {/* <OrbitControls makeDefault /> */}
      <Physics gravity={[0, -7, 0]}>
        <Player />
        <Ground />
      </Physics>
      <PointerLockControls makeDefault />

      <Owl position={[-1.5, 8.5, -28.5]} />
      <Grass />
      <Chapel position={[0, 0, 0]} />
      <MyEnvironment />
      <Birds />
      <MagicFrame position={[-4, 6, -9.5]} scale={[2.216 * 3, 1.44 * 3, 1]} />
      <lumaSplats
        ref={splat}
        semanticsMask={LumaSplatsSemantics.FOREGROUND}
        source="https://lumalabs.ai/capture/85756A76-EE95-43B2-A58A-D7B95DFFD9FB"
        position={[-0.2, 4.5, 9]}
        rotation-y={Math.PI / 2.15}
        scale={1}
      />
      <lumaSplats
        semanticsMask={LumaSplatsSemantics.FOREGROUND}
        source="https://lumalabs.ai/capture/DF98A33B-12A2-4F2E-A479-3A1D141A945C"
        position={[0.2, 2.7, -9.5]}
        scale={1.7}
        rotation-y={-Math.PI / 2.5}
      />
    </>
  );
}
