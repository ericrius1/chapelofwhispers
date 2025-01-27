/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 chapel.glb --transform 
Files: chapel.glb [49.95MB] > /Users/eric/codeprojects/Chapel/public/glb/chapel-transformed.glb [5.32MB] (89%)
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/chapel-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.candle.geometry} material={materials['default']} />
      <mesh geometry={nodes.woman.geometry} material={materials['default.001']} />
      <mesh geometry={nodes.table.geometry} material={materials['/mat/defaultMat']} />
      <mesh geometry={nodes.Cube.geometry} material={nodes.Cube.material} position={[-0.647, 26.24, 8.429]} />
      <mesh geometry={nodes.altar.geometry} material={materials.altar} position={[0.076, 2.692, -8.917]} scale={0.951} />
      <mesh geometry={nodes.innerwalls.geometry} material={materials.innerwalls} />
      <mesh geometry={nodes.Object_454.geometry} material={materials.Roofin02} />
      <mesh geometry={nodes.Object_456.geometry} material={materials.Transluc} />
      <mesh geometry={nodes.Object_458.geometry} material={materials.Wood_Boa} />
      <mesh geometry={nodes.lowerroof.geometry} material={materials.lowerroof} />
      <mesh geometry={nodes.Object_461.geometry} material={materials.FrontCol} />
      <mesh geometry={nodes.roof.geometry} material={materials.roof} />
      <mesh geometry={nodes.Object_484.geometry} material={materials.Roofing} />
      <mesh geometry={nodes.Windows.geometry} material={materials.Wood_Flo} />
    </group>
  )
}

useGLTF.preload('/chapel-transformed.glb')
