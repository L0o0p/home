/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 ./public/XBot.glb 
*/

// 对于frustumCulled = {false}:
// 动态变化: 某些对象可能会基于某些动态条件频繁地进入和离开视锥。在这些情况下，频繁的剔除和添加可能导致性能开销，特别是当这些对象涉及复杂的计算或状态变更时。
// 始终可见: 某些对象，如环境光源或者背景音乐控制器（尽管它们不是视觉对象），可能需要始终存在于场景中，无论它们的位置如何。
// 渲染特效: 某些特效可能需要对象始终被渲染，即使它们在视觉上不直接可见，因为它们可能影响其它可见对象的渲染效果（例如光源的光晕效果可能部分在视锥外）。

import React, { useEffect, useRef, useState } from 'react'
import { useAnimations, useFBX, useGLTF, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import * as THREE from 'three';
import { MeshBasicMaterial } from 'three';
import { GroupProps } from '@react-three/fiber';
import { GLTF } from 'three';
import { Mesh } from 'three';




interface XBotProps {
  animation: string;
  menuOpened: boolean
  // section: number | string
}
// 定义GLTFResult接口，根据你的GLTF结构进行调整
interface GLTFResult extends GLTF {
  nodes: {
    [name: string]: Mesh;
  },
  materials: {
    [name: string]: THREE.Material
  };
}

export default function XBot(props: XBotProps) {

  const { animation, menuOpened }: XBotProps = props;
  const data = useScroll()
  const [section, setSection] = useState(0)

  // 从GLTF文件加载模型和材质
  const xBot = useRef<GroupProps>()
  const { nodes, materials } = useGLTF('/threeDCharacter/models/XBot.glb') as unknown as GLTFResult;

  // 从FBX文件加载动画
  const { animations: TypingAnimation } = useFBX('/threeDCharacter/animations/Typing.fbx');
  const { animations: PrayingAnimation } = useFBX('/threeDCharacter/animations/Praying.fbx');
  const { animations: FallAnimation } = useFBX('/threeDCharacter/animations/Fall.fbx');
  const { animations: StandingAnimation } = useFBX('/threeDCharacter/animations/Standing.fbx'); // 应该是不同的FBX文件


  // 使用useEffect来加载动画，并将它们分配给相应的动作变量。
  console.log(PrayingAnimation, FallAnimation);
  PrayingAnimation[0].name = "Praying";
  FallAnimation[0].name = "FallAnimation";
  StandingAnimation[0].name = "Standing";
  TypingAnimation[0].name = "Typing";


  // 将动画分配给 ref，以便 drei 的 useAnimations hook 可以访问它们。
  const { actions } = useAnimations([TypingAnimation[0], PrayingAnimation[0], FallAnimation[0], StandingAnimation[0]], xBot);
  // 设置人物是否跟随光标，并根据用户的偏好进行动画切换。
  const { headFollow, cursorFollow, wireframe } = useControls({
    headFollow: false,
    cursorFollow: false,
    wireframe: false,
  });
  // useFrame hook 用于动画。它每一帧被调用，并允许我们操作场景对象的属性。
  // 让头部对准光标或镜头的方法定义
  useFrame((state) => {
    // 确保 headFollow 是 true
    if (headFollow && xBot.current) {
      // 使用可选链（optional chaining）确保不会在 undefined 上调用 lookAt
      const neck = xBot.current!.getObjectByName('mixamorigNeck')!;
      if (neck) {
        neck.lookAt(state.camera.position);
      } else {
        console.error('没有找到名为 mixamorigNeck 的对象');
      }
    }
    // 确保 headFollow 是 true
    if (cursorFollow && xBot.current) {
      // 使用可选链（optional chaining）确保不会在 undefined 上调用 lookAt
      const neck = xBot.current.getObjectByName('mixamorigSpine');
      const target = new THREE.Vector3(state.pointer.x, state.pointer.y, 0);
      if (neck) {
        neck.lookAt(target);
      } else {
        console.error('没有找到名为 mixamorigSpine 的对象');
      }
    }
  });

  // 在组件挂载时播放动作 'Praying'，并在组件卸载时重置并停止它。
  useEffect(() => {
    actions[animation]?.reset().play();
  }, [actions]);

  // 在组件挂载时遍历所有子物体并打印出它们的名称。
  useEffect(() => {
    if (xBot.current) {
      xBot.current?.traverse((object) => {
        console.log(object.name); // 打印出所有物体的名称
      });
    }
  }, [xBot.current]);


  // 切换材质
  useEffect(() => {
    Object.values(materials).forEach((material) => {
      if (material instanceof MeshBasicMaterial) {
        material.wireframe = wireframe;
      }
    });
  }, [wireframe, materials]);

  return (
    <group rotation={[0, 0, 0]} >
      <group ref={xBot}{...props} dispose={null}>
        <group rotation={[0, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            frustumCulled={false}// 即使这个对象不在当前摄像机的视锥体内，也不要将其剔除”
            geometry={nodes.Beta_Joints.geometry}
            material={materials.Beta_Joints_MAT1}
            skeleton={nodes.Beta_Joints.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.Beta_Surface.geometry}
            material={materials.Beta_HighLimbsGeoSG3}
            skeleton={nodes.Beta_Surface.skeleton}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/threeDCharacter/XBot.glb')
