import {
    // OrbitControls,
    PerspectiveCamera,
} from "@react-three/drei"
// import { useRef } from "react"
// import { CameraHelper } from "three/src/helpers/CameraHelper"

export const Camera = () => {
    // const move = useRef()
    return (
        <>
            {/* <PerspectiveCamera
                makeDefault
                position={[0 + 4, 1, 2]}
            /> */}
            {/* <PerspectiveCamera  position={[-4, 2, 2]} fov={75} rotation={[0, -Math.PI / 2, 0]} /> */}
            <PerspectiveCamera makeDefault position={[1, 2, 5]} fov={45} rotation={[0, Math.PI / 2, 0]} />
            {/* <OrbitControls target={[0, 1, 0]}  /> */}
            {/* <CameraVisualizer cameraRef={move} /> */}
            {/* <PerspectiveCamera makeDefault position={[0, 0, 0]} fov={75} /> */}
        </>
    )
}
