import Scene from './scene';

import { GizmoViewport } from '@react-three/drei';
import { GizmoHelper } from '@react-three/drei';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';

import { Canvas } from '@react-three/fiber';

const ExampleApp = () => (
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
);

export default ExampleApp;
