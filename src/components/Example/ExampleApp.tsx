import Scene from './scene';
import {
    GizmoViewport,
    GizmoHelper,
    PerspectiveCamera,
    OrbitControls
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Box } from '@mui/material';

/**
 * ExampleApp Component
 * Main container for the 3D visualization environment
 * Sets up the canvas, lighting, camera, and controls
 */
const ExampleApp = () => (
    // Container box that takes full width and height
    <Box
        sx={{
            width: '100%',
            height: '100%',
            position: 'relative',
            overflow: 'hidden'
        }}
    >
        {/* Three.js Canvas - the main container for 3D rendering */}
        <Canvas
            style={{
                width: '100%',
                height: `calc(100vh - ${32}px)`, // Full viewport height minus header
                display: 'block' // Prevents any unwanted spacing
            }}
        >
            {/* Scene background color */}
            <color attach="background" args={['black']} />

            {/* Ambient light for overall scene illumination */}
            <ambientLight intensity={Math.PI / 2} />

            {/* Point light for directional illumination */}
            <pointLight position={[5, 5, 0]} decay={0} intensity={Math.PI} />

            {/* Main camera setup */}
            <PerspectiveCamera makeDefault position={[1, 1, 1]} />

            {/* Camera controls for user interaction */}
            <OrbitControls makeDefault />

            {/* Helper gizmo for orientation reference */}
            <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                <GizmoViewport labelColor="white" />
            </GizmoHelper>

            {/* Main scene component containing 3D models and interactions */}
            <Scene />
        </Canvas>
    </Box>
);

export default ExampleApp;
