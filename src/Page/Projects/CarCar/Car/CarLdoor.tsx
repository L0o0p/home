/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 seperate.glb 
*/

import { useGLTF } from '@react-three/drei'
interface SeperateProps {
  nodes: any;
  materials: any;
}

export default function CarLdoor() {
  const { nodes, materials } = useGLTF('/carCar/sport_car/seperate.glb') as unknown as SeperateProps
  return (
    <group dispose={null}>
      <group scale={0.01}>
        <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh geometry={nodes.CarBody_1_Car_Paint_0003_3.geometry} material={materials.Windows} />
          <mesh geometry={nodes.CarBody_1_Car_Paint_0003_1.geometry} material={materials.Car_Paint} />
          <mesh geometry={nodes.CarBody_1_Car_Paint_0003_4.geometry} material={materials.Interior} />
        </group>



        <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh geometry={nodes.CarBody_1_Car_Paint_0003_2.geometry} material={materials.Side_Mirrors} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/carCar/sport_car/seperate.glb')