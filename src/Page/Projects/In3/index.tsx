

import { Canvas } from '@react-three/fiber'
import './index.css'
import { OrthographicCamera } from '@react-three/drei'
import { Suspense, useEffect, useRef, useState } from 'react'
import { Scene } from './component/Scene'
// import A from './component/A'





export const In3 = () => {
  // 使用 useRef 并指定类型为 HTMLElement，这将创建一个 MutableRefObject<HTMLElement>
  const container = useRef<HTMLDivElement>(null)
  // const domContent = useRef()
  const [isContainerReady, setContainerReady] = useState(false);

  useEffect(() => {
    if (container.current) {
      console.log(container.current);
      setContainerReady(true);
    }
  }, []);

  useEffect(() => {
    // 确保在 DOM 渲染后 container.current 已被赋值
    if (container.current) {
      // 可以安全地使用 container.current
      console.log(container.current);
    }
  }, []);
  return (
    <>
      <div
        ref={container}
        className="content-container"
        style={{ backgroundColor: '#272727 ' }}
      >
        {/* Container for the HTML view */}
        <div
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden' }}
        // ref={domContent}
        ></div>

        <Suspense fallback={
          <LoadingIndicator />
        }>
          <div
            style={{ zIndex: -1, display: 'none' }}
          >{isContainerReady}</div>
          {container.current && (
            <Canvas
              shadows
              flat
              linear
              style={{ pointerEvents: 'none' }}
              eventSource={container.current} // 确保这里不是 null
              eventPrefix="page"
            >

              {/* 接受投影 */}
              <directionalLight castShadow intensity={0.4} position={[-10, 50, 300]} shadow-mapSize={[512, 512]} shadow-bias={-0.002}>
                <orthographicCamera attach="shadow-camera" args={[-2000, 2000, 2000, -2000, -10000, 10000]} />
              </directionalLight>
              <OrthographicCamera
                makeDefault={true}
                zoom={0.98}
                far={100000}
                near={-100000}
                position={[25.48, -44.14, 1000]}
              />
              <hemisphereLight intensity={0.5} color="#eaeaea" position={[0, 1, 0]} />
              {/* <OrbitControls /> */}
              <Scene />
              {/* Canvas 内容 */}
            </Canvas>
          )}
        </Suspense>
      </div></>
  )

}


const LoadingIndicator: React.FC = () => {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((prevDots) => (prevDots + 1) % 4); // Cycle through 0, 1, 2, 3
    }, 500); // Update every 500 milliseconds

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);

  return (
    <div
      className={
        'h-screen w-screen p-8 max-w-screen-2xl mx-auto flex flex-col items-center justify-center'
        //padding:2rem 元素最大宽度为1536px
      }>
      <div
        className='text-6xl font-extrabold leading-snug font-Nunito text-cyan-200'
        style={{ color: 'cyan' }}
      >
        Loading{'.'.repeat(dots)}
      </div>
    </div >
  )
};