export const Light = () => {
    return (
        <>
            <ambientLight intensity={2} />
            {/* <PivotControls  visible={true} > */}
            {/* <pointLight position={[0 + 4, 1.7, 2]} intensity={80} /> */}
            <pointLight color={'lightyellow'} intensity={.07} position={[-3.752, 1.8, -2.4]} />
            <pointLight color={'lightyellow'} intensity={.07} position={[-13.63, 1.3, -2.593]} />
            <pointLight color={'lightyellow'} intensity={.07} position={[3.039, 1.3, -2.555]} />
            <pointLight color={'lightyellow'} intensity={.07} position={[2.790, 1.3, 2.733]} />
            <pointLight color={'lightyellow'} intensity={.07} position={[-1.907, 1.3, 2.853]} />
            {/* </PivotControls> */}
        </>
    )
}