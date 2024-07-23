import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Sky, Text, KeyboardControls, PointerLockControls } from "@react-three/drei"
import { useEffect, useState } from "react"
import { Vector3 } from "three"
import { motion } from "framer-motion-3d"
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Player } from "./Player"
import { Camera } from "./Camera"
import { Light } from "./Light"
import { Objects } from "./Objects"
import { Physics } from "@react-three/rapier"

export const ThreeD = () => {
    return (
        <KeyboardControls
            map={[
                { name: "forward", keys: ["ArrowUp", "w", "W"] },
                { name: "backward", keys: ["ArrowDown", "s", "S"] },
                { name: "left", keys: ["ArrowLeft", "a", "A"] },
                { name: "right", keys: ["ArrowRight", "d", "D"] },
                { name: "jump", keys: ["Space"] },
            ]}>
            <Canvas
                shadows
                flat
                dpr={[1, 1.5]}
                gl={{ antialias: false }}
            >
                <Camera />
                <Light />
                <Sky />
                <Physics>
                    <Player />
                    <Objects />
                </Physics>
                <PointerLockControls
                    maxPolarAngle={Math.PI / 2 + Math.PI / 10}
                    minPolarAngle={Math.PI / 2.155}
                />
                <InteractiveFloor />
            </Canvas>
        </KeyboardControls>
    )
}

function InteractiveFloor() {
    const { camera } = useThree();
    const [isOverTarget, setIsOverTarget] = useState(false);
    const targetPosition = new Vector3(0 - 1.800, 1, 2); // 目标区域的中心位置
    const range = 0.5; // 考虑范围的大小，1.5单位范围内有效

    useFrame(() => {
        if (camera.position.distanceTo(targetPosition) <= range) {
            if (!isOverTarget) {
                setIsOverTarget(true);
                console.log("摄像机现在在目标区域上方");
                // 这里可以触发任何相关的事件
            }
        } else {
            if (isOverTarget) {
                setIsOverTarget(false);
                console.log("摄像机已离开目标区域");
            }
        }
    });

    useEffect(() => {
        const handleKeyDown = (event: { code: string }) => {
            if (event.code === 'Space' && isOverTarget) {
                window.location.href = "https://onedrive.live.com/embed?resid=21889EC93588D7D9%21320&authkey=!AKMP5TfXY5bDJxk"
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOverTarget]);

    return (
        <group>

            <motion.group
                position={[-2.903 - 1.5, 1, 1.56]}
                rotation={[0, Math.PI / 2, 0]}
                animate={{
                    scale: isOverTarget ? 0.6 : 0
                }}
            >
                <Text
                    children={
                        '<开始创作>'
                    }
                    color={'greenyellow'}
                />
            </motion.group>
            {isOverTarget && (
                <>
                    <mesh position={[-4.8, 1.14, 1.56]} rotation={[0, Math.PI / 2, 0]}  >
                        <planeGeometry args={[6.8, 2.08]} />
                        <meshStandardMaterial color='black' transparent opacity={0.1} />
                    </mesh>
                    <mesh
                        position={[-2.903, 0, 1.56]}
                        rotation={[0, Math.PI / 2, 0]}
                        onClick={() => console.log("Floor clicked!")}
                        castShadow
                    >
                        <boxGeometry args={[6.8, 0.1, 4.14]} />
                        <meshStandardMaterial color='greenyellow' />
                    </mesh>
                    <EffectComposer>
                        <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.9} height={300} />
                    </EffectComposer>
                </>
            )}
        </group >

    );
}
