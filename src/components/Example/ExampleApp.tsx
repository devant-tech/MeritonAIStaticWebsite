import Scene from './scene';
import { GizmoViewport, GizmoHelper, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Box } from '@mui/material';

const ExampleApp = () => (
    <Box
        sx={{
            width: '100%',
            height: '100%',
            position: 'relative',
            overflow: 'hidden'
        }}
    >
        <Canvas
            style={{
                width: '100%',
                height: `calc(100vh - ${32}px)`,
                display: 'block' // Prevents any unwanted spacing
            }}
        >
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
    </Box>
);

export default ExampleApp;
