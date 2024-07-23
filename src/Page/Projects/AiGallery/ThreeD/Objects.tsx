import { CuboidCollider } from "@react-three/rapier"
import { Scene } from "./Scene"

export const Objects = () => {
    return (
        <>
            <Scene />
            <Ground />

        </>
    )
}

const Ground = () => {
    return (
        <>
            <CuboidCollider args={[5, 0.01, 5]} position={[0, 0, 0]} friction={18} />
        </>
    )
}