import { useKeyboardControls } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { CapsuleCollider, RigidBody, RigidBodyApi, useRapier } from "@react-three/rapier"
import * as RAPIER from "@dimforge/rapier3d-compat"
import { useRef } from "react"
import * as THREE from "three"

export const Player = () => {
    const rb = useRef<RigidBodyApi>(null)
    const rapier = useRapier()
    const [, get] = useKeyboardControls()
    // console.log(get);
    const SPEED = 5
    const direction = new THREE.Vector3()
    const frontVector = new THREE.Vector3()
    const sideVector = new THREE.Vector3()
    useFrame((state) => {
        if (rb.current) {
            const { forward, backward, left, right, jump } = get()
            // console.log(forward, backward, left, right, jump);

            const velocity = rb.current.linvel()
            // update camera
            const { x, y, z } = rb.current.translation();
            state.camera.position.set(x, y, z);
            // update axe
            // movement
            frontVector.set(0, 0, Number(backward) - Number(forward))
            sideVector.set(Number(left) - Number(right), 0, 0)
            direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(state.camera.rotation)
            rb.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z })
            // jumping
            const world = rapier.world.raw()
            const ray = new RAPIER.Ray(rb.current.translation(), { x: 0, y: -1, z: 0 });
            const maxToi = 1;  // 你可以根据实际情况调整这个值
            const solid = true;  // 根据你的需要选择是检测穿透还是碰撞
            const rayResult = world.castRay(ray, maxToi, solid);
            // const ray = world.castRay(new RAPIER.Ray(rb.current.translation(), { x: 0, y: -1, z: 0 }))
            const grounded = rayResult && rayResult.collider && Math.abs(rayResult.toi) <= 1.75
            if (jump && grounded) rb.current.setLinvel({ x: 0, y: 7.5, z: 0 })
        }
    })

    return (
        <>
            <RigidBody ref={rb} colliders={false} mass={1} type="dynamic" position={[4, 1.5, 2]} enabledRotations={[false, false, false]}>
                <CapsuleCollider args={[0.5, 0.5]} />
            </RigidBody>

        </>
    )
}

