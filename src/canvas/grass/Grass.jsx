
// Grass modified from James Smyth's awesome Breath of the Wild Grass  https://smythdesign.com/blog/stylized-grass-webgl/

import * as THREE from "three";
import GrassMaterial from "./GrassMaterial";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useTexture } from "@react-three/drei";



// Parameters
const PLANE_SIZE = 6;
const BLADE_COUNT = 100000;
const BLADE_WIDTH = 0.1;
const BLADE_HEIGHT = .2;
const BLADE_HEIGHT_VARIATION = 0.6;

export default function Grass() {
    const grassFieldGeometry = generateField();
    const grassMaterialRef = useRef()

    const grassTexture = useTexture("/textures/grass.jpg");
    grassTexture.colorSpace = THREE.SRGBColorSpace

    const cloudTexture = useTexture("/textures/cloud.jpg");
    cloudTexture.wrapS = cloudTexture.wrapT = THREE.RepeatWrapping;

    useFrame(({ clock }) => {
        grassMaterialRef.current.uniforms.uTime.value = clock.getElapsedTime() * 1000;
    });
    return (
        <mesh geometry={grassFieldGeometry} position-z={-8.5}>
            <grassMaterial ref={grassMaterialRef} key={GrassMaterial.key} vertexColors uGrassTexture={grassTexture} uCloudTexture={cloudTexture} />
        </mesh>
    );
}

function convertRange(val, oldMin, oldMax, newMin, newMax) {
    return (((val - oldMin) * (newMax - newMin)) / (oldMax - oldMin)) + newMin;
}

function generateField() {
    const positions = [];
    const uvs = [];
    const indices = [];
    const colors = [];

    for (let i = 0; i < BLADE_COUNT; i++) {
        const VERTEX_COUNT = 5;
        const surfaceMin = PLANE_SIZE / 2 * -1;
        const surfaceMax = PLANE_SIZE / 2;
        const radius = PLANE_SIZE / 2;

        const r = radius * Math.sqrt(Math.random());
        const theta = Math.random() * 2 * Math.PI;
        const x = r * Math.cos(theta);
        const y = r * Math.sin(theta);

        const pos = new THREE.Vector3(x, 0, y);

        const uv = [convertRange(pos.x, surfaceMin, surfaceMax, 0, 1), convertRange(pos.z, surfaceMin, surfaceMax, 0, 1)];

        const blade = generateBlade(pos, i * VERTEX_COUNT, uv);
        // if (i === BLADE_COUNT - 1) { debugger }
        blade.verts.forEach(vert => {
            positions.push(...vert.pos);
            uvs.push(...vert.uv);
            colors.push(...vert.color);
        });
        blade.indices.forEach(indice => indices.push(indice));
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    geom.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2));
    geom.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));
    geom.setIndex(indices);
    geom.computeVertexNormals();
    return geom;
}

function generateBlade(center, vArrOffset, uv) {
    const MID_WIDTH = BLADE_WIDTH * 0.5;
    const TIP_OFFSET = 0.1;
    const height = BLADE_HEIGHT + (Math.random() * BLADE_HEIGHT_VARIATION);

    const yaw = Math.random() * Math.PI * 2;
    const yawUnitVec = new THREE.Vector3(Math.sin(yaw), 0, -Math.cos(yaw));
    const tipBend = Math.random() * Math.PI * 2;
    const tipBendUnitVec = new THREE.Vector3(Math.sin(tipBend), 0, -Math.cos(tipBend));

    // Find the Bottom Left, Bottom Right, Top Left, Top right, Top Center vertex positions
    const bl = new THREE.Vector3().addVectors(center, new THREE.Vector3().copy(yawUnitVec).multiplyScalar((BLADE_WIDTH / 2) * 1));
    const br = new THREE.Vector3().addVectors(center, new THREE.Vector3().copy(yawUnitVec).multiplyScalar((BLADE_WIDTH / 2) * -1));
    const tl = new THREE.Vector3().addVectors(center, new THREE.Vector3().copy(yawUnitVec).multiplyScalar((MID_WIDTH / 2) * 1));
    const tr = new THREE.Vector3().addVectors(center, new THREE.Vector3().copy(yawUnitVec).multiplyScalar((MID_WIDTH / 2) * -1));
    const tc = new THREE.Vector3().addVectors(center, new THREE.Vector3().copy(tipBendUnitVec).multiplyScalar(TIP_OFFSET));

    tl.y += height / 2;
    tr.y += height / 2;
    tc.y += height;

    // Vertex Colors
    const black = [0, 0, 0];
    const gray = [0.5, 0.5, 0.5];
    const white = [1.0, 1.0, 1.0];

    const verts = [
        { pos: bl.toArray(), uv: uv, color: black },
        { pos: br.toArray(), uv: uv, color: black },
        { pos: tr.toArray(), uv: uv, color: gray },
        { pos: tl.toArray(), uv: uv, color: gray },
        { pos: tc.toArray(), uv: uv, color: white }
    ];

    const indices = [
        vArrOffset,
        vArrOffset + 1,
        vArrOffset + 2,
        vArrOffset + 2,
        vArrOffset + 4,
        vArrOffset + 3,
        vArrOffset + 3,
        vArrOffset,
        vArrOffset + 2
    ];

    return { verts, indices };
}
