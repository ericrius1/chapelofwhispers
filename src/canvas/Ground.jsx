import { CuboidCollider, RigidBody } from "@react-three/rapier"

export function Ground(props) {
    return (
        <RigidBody {...props} type="fixed" colliders={false}>
            <mesh position={[0, 0, 0]} rotation-x={-Math.PI / 2} visible={false}>
                <planeGeometry args={[1000, 1000]} />
                <meshBasicMaterial color="green" />
            </mesh>
            <CuboidCollider args={[1000, 2, 1000]} position={[0, -2, 0]} />
        </RigidBody>
    )
}
