import { shaderMaterial } from "@react-three/drei";

import vertexShader from "./shaders/grass.vert";
import fragmentShader from "./shaders/grass.frag";
import { extend } from "@react-three/fiber";

const GrassMaterial = shaderMaterial(
    {

        uGrassTexture: null,
        uCloudTexture: null,
        uTime: null,
    },
    vertexShader,
    fragmentShader,

);

extend({ GrassMaterial });
export default GrassMaterial;
