import { GizmoHelper, GizmoViewport, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import Scene from './scene'

const App = () => (
  <Canvas>
    <color attach="background" args={['black']} />
    <ambientLight intensity={Math.PI / 2} />
    <pointLight position={[5, 5, 0]} decay={0} intensity={Math.PI} />

    <PerspectiveCamera makeDefault position={[1, 1, 1]} />
    <OrbitControls makeDefault />

    <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
      <GizmoViewport labelColor="white" />
    </GizmoHelper>

    <Scene />
  </Canvas>
)

export default App
