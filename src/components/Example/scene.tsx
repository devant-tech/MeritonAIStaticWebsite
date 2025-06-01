import { PivotControls, Sphere } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { GUI } from 'lil-gui';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import shortid from 'shortid';
import * as THREE from 'three';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';

import { exportSTL, uploadSTL } from './index';
import FFD, { ParametricCoordinate } from './ffd';

// Default configuration values for the 3D scene
const DEFAULT_MODEL_URL = 'sample.stl';
const DEFAULT_SKELETON_URL = 'skeleton.stl';
const DEFAULT_OUTPUT_NAME = 'output.stl';
const DEFAULT_GRID_DIMENSION: [number, number, number] = [2, 1, 2];

// Matrix for handling transformations
const matrix = new THREE.Matrix4();

/**
 * Interface for control points used in model deformation
 */
interface ControlPoint {
    id: string;
    ref: THREE.Vector3;
    position: [number, number, number];
}

/**
 * Calculates the center point of a geometry
 * @param geometry - The geometry to calculate center for
 * @param center - Optional vector to store the result
 * @returns The center point of the geometry
 */
const getCenter = (
    geometry: THREE.BufferGeometry,
    center = new THREE.Vector3()
) => {
    geometry.computeBoundingBox();
    geometry.boundingBox!.getCenter(center);
    return center;
};

/**
 * Normalizes the geometry for consistent scaling and orientation
 * @param geometry - The geometry to normalize
 * @returns The normalized geometry
 */
const customNormalize = (geometry: THREE.BufferGeometry) => {
    const transformed = geometry.clone();
    transformed.scale(0.01, 0.01, 0.01);
    transformed.translate(...getCenter(transformed).negate().toArray());
    transformed.rotateX(-Math.PI / 2);
    transformed.rotateY(Math.PI / 2);
    return transformed;
};

/**
 * Denormalizes the geometry back to original scale
 * @param geometry - The geometry to denormalize
 * @returns The denormalized geometry
 */
const customDenormalize = (geometry: THREE.BufferGeometry) => {
    const transformed = geometry.clone();
    transformed.rotateY(-Math.PI / 2);
    transformed.rotateX(Math.PI / 2);
    transformed.scale(100, 100, 100);
    return transformed;
};

/**
 * Custom hook for loading and processing STL files
 * @param url - The URL of the STL file to load
 * @returns The processed geometry
 */
const useSTLGeometry = (url: string) => {
    const geometry = useLoader(STLLoader, url);
    return useMemo(() => customNormalize(geometry), [geometry]);
};

/**
 * Main Scene Component
 * Handles 3D model loading, manipulation, and interaction
 */
const Scene = () => {
    // Refs and state management
    const meshRef = useRef<THREE.Mesh>(null!);
    const [selected, setSelected] = useState<THREE.Object3D | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [showSkeleton, setShowSkeleton] = useState(true);
    const [gridDimension, setGridDimension] = useState<
        [number, number, number]
    >(DEFAULT_GRID_DIMENSION);
    const [isImplantVisible, setIsImplantVisible] = useState(true);
    const [hideMesh, setHideMesh] = useState(false);

    // Model URLs state
    const [implantDataUrl, setImplantDataUrl] =
        useState<string>(DEFAULT_MODEL_URL);
    const [skeletonDataUrl, setSkeletonDataUrl] =
        useState<string>(DEFAULT_SKELETON_URL);

    // Load geometries
    const modelGeometry = useSTLGeometry(implantDataUrl);
    const skeletonGeometry = useSTLGeometry(skeletonDataUrl);

    // Initialize FFD (Free-Form Deformation) and control points
    const [ffd, controlPoints] = useMemo(() => {
        // Get position attribute from geometry
        const position = modelGeometry.getAttribute(
            'position'
        ) as THREE.BufferAttribute;
        // Create parametric coordinate system from bounding box
        const coord = ParametricCoordinate.fromBbox(
            new THREE.Box3().setFromBufferAttribute(position)
        );
        // Initialize FFD with geometry and grid dimensions
        const ffd = new FFD(modelGeometry, coord, ...gridDimension);

        // Filter control points for surface manipulation
        const filteredPoints: THREE.Vector3[] = [];
        const { l, m, n } = ffd.controlPoints;
        for (const [point, i, j, k] of ffd.controlPoints) {
            // Only keep points on the surface of the control grid
            if (
                i === 0 ||
                i === l ||
                j === 0 ||
                j === m ||
                k === 0 ||
                k === n
            ) {
                filteredPoints.push(point);
            }
        }

        // Create control points with unique IDs
        const controlPoints: ControlPoint[] = filteredPoints.map((point) => ({
            id: shortid.generate(),
            ref: point,
            position: point.toArray() as [number, number, number]
        }));

        return [ffd, controlPoints];
    }, [modelGeometry, gridDimension]);

    /**
     * Handle drag operations for model deformation
     */
    const handleDrag = useCallback(
        (m: THREE.Matrix4) => {
            matrix.copy(m);
            if (selected) {
                // Update selected point position and rotation
                selected.position.setFromMatrixPosition(m);
                selected.rotation.setFromRotationMatrix(m);

                // Update control point and deform model
                const { index } = selected.userData;
                controlPoints[index].ref.copy(selected.position);
                ffd.deform();
            }
        },
        [selected, ffd, controlPoints]
    );

    /**
     * Setup GUI controls and event handlers
     */
    useEffect(() => {
        // Initialize GUI
        const gui = new GUI();
        // Position GUI panel
        gui.domElement.style.position = 'fixed';
        gui.domElement.style.top = '50%';
        gui.domElement.style.right = '32px';
        gui.domElement.style.left = 'auto';
        gui.domElement.style.transform = 'translateY(-50%)';
        gui.domElement.style.zIndex = '1300';

        // Make GUI draggable
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;

        // Mouse event handlers for GUI dragging
        const onMouseDown = (e: MouseEvent) => {
            isDragging = true;
            offsetX = e.clientX - gui.domElement.getBoundingClientRect().left;
            offsetY = e.clientY - gui.domElement.getBoundingClientRect().top;
            document.body.style.userSelect = 'none';
        };

        const onMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;
            gui.domElement.style.left = `${e.clientX - offsetX}px`;
            gui.domElement.style.top = `${e.clientY - offsetY}px`;
            gui.domElement.style.right = 'auto';
            gui.domElement.style.transform = 'none';
        };

        const onMouseUp = () => {
            isDragging = false;
            document.body.style.userSelect = '';
        };

        // Add event listeners for GUI dragging
        gui.domElement.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);

        // GUI configuration
        const config = {
            showSkeleton: true,
            download: () => {
                if (meshRef.current) {
                    const geometry = customDenormalize(
                        meshRef.current.geometry
                    );
                    exportSTL(new THREE.Mesh(geometry), DEFAULT_OUTPUT_NAME);
                }
            },
            uploadImplant: async () => {
                setImplantDataUrl(await uploadSTL());
                setSelected(null);
            },
            uploadSkeleton: async () => {
                setSkeletonDataUrl(await uploadSTL());
            },
            l: DEFAULT_GRID_DIMENSION[0],
            m: DEFAULT_GRID_DIMENSION[1],
            n: DEFAULT_GRID_DIMENSION[2],
            showImplant: true,
            hideMesh: false
        };

        /**
         * Add grid dimension controller to GUI
         */
        const addGridDimensionController = (
            gui: GUI,
            property: keyof typeof config,
            name: string,
            index: number
        ) =>
            gui
                .add(config, property)
                .min(1)
                .max(4)
                .step(1)
                .name(name)
                .onChange((value: number) => {
                    setGridDimension(
                        (dimension) =>
                            dimension.map((n, i) =>
                                i === index ? value : n
                            ) as [number, number, number]
                    );
                    setSelected(null);
                });

        // Add GUI controls
        gui.add(config, 'showSkeleton')
            .name('Show Skeleton')
            .onChange((value: boolean) => setShowSkeleton(value));
        gui.add(config, 'uploadImplant').name('Upload Implant');
        gui.add(config, 'uploadSkeleton').name('Upload Skeleton');
        gui.add(config, 'download');
        addGridDimensionController(gui, 'l', 'Width', 0);
        addGridDimensionController(gui, 'm', 'Height', 1);
        addGridDimensionController(gui, 'n', 'Length', 2);

        // Add implant visibility toggle
        gui.add(config, 'showImplant')
            .name('Show Implant')
            .onChange((value: boolean) => {
                setIsImplantVisible(value);
                if (!value) {
                    setHideMesh(false);
                    config.hideMesh = false;
                    // Force GUI to update
                    gui.controllers.forEach((controller) =>
                        controller.updateDisplay()
                    );
                }
            });

        // Add hide mesh toggle
        gui.add(config, 'hideMesh')
            .name('Hide Mesh')
            .onChange((value: boolean) => setHideMesh(value));

        // Cleanup
        return () => gui.destroy();
    }, []);

    return (
        <>
            {/* Main model mesh with visibility toggle */}
            {isImplantVisible && (
                <mesh
                    geometry={modelGeometry}
                    onClick={(e) => e.stopPropagation()}
                >
                    <meshStandardMaterial
                        color="#B17457"
                        transparent
                        opacity={1}
                    />
                </mesh>
            )}

            {/* Wireframe mesh with visibility toggle */}
            {isImplantVisible && !hideMesh && (
                <mesh ref={meshRef} geometry={modelGeometry}>
                    <meshStandardMaterial
                        color="white"
                        transparent
                        opacity={0.9}
                        wireframe
                    />
                </mesh>
            )}

            {/* Skeleton visualization with pivot controls */}
            <group position={[-0.33, 0.55, 0.025]} visible={showSkeleton}>
                <PivotControls
                    scale={0.1}
                    disableScaling
                    disableSliders
                    disableRotations
                    offset={[-0.25, -0.25, 0]}
                >
                    <mesh geometry={skeletonGeometry}>
                        <meshStandardMaterial color="grey" />
                    </mesh>
                </PivotControls>
            </group>

            {/* Control points group for model deformation */}
            {isImplantVisible && (
                <group
                    onPointerMissed={() => {
                        if (!isDragging) {
                            setSelected(null);
                        }
                    }}
                >
                    {/* Pivot controls for selected point */}
                    <PivotControls
                        scale={0.1}
                        matrix={matrix}
                        visible={selected !== null}
                        disableScaling
                        disableSliders
                        onDragStart={() => setIsDragging(true)}
                        onDragEnd={() => setIsDragging(false)}
                        onDrag={handleDrag}
                    />

                    {/* Render control points as spheres */}
                    {controlPoints.map(({ id, position }, index) => (
                        <Sphere
                            key={id}
                            args={[0.008]}
                            position={position}
                            userData={{ index }}
                            onClick={(e) => {
                                matrix.copy(e.object.matrixWorld);
                                setSelected(e.object);
                            }}
                        >
                            <meshStandardMaterial color="white" />
                        </Sphere>
                    ))}
                </group>
            )}
        </>
    );
};

export default Scene;
