
// when you click on it, it zooms into frame, and you can interact with the painting or image like its a 2d thing. for example have the orb cavern scene or dome scene, ////
//and you can use your hands to move particles when youve entered magic frame world portal realm

import { useTexture, useVideoTexture } from "@react-three/drei"

export default function MagicFrame(props) {


    const videoTexture = useVideoTexture('/videos/orb.mp4')
    return (

        <mesh {...props} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial map={videoTexture} toneMapped={false} />
        </mesh>
    )

}