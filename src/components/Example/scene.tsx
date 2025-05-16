import { PivotControls, Sphere } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { GUI } from 'lil-gui'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import shortid from 'shortid'
import * as THREE from 'three'
import { STLLoader } from 'three/addons/loaders/STLLoader.js'

import { exportSTL, uploadSTL } from './index'
import FFD, { ParametricCoordinate } from './ffd'

const DEFAULT_MODEL_URL = 'sample.stl'
const DEFAULT_SKELETON_URL = 'skeleton.stl'
const DEFAULT_OUTPUT_NAME = 'output.stl'
const DEFAULT_GRID_DIMENSION: [number, number, number] = [2, 1, 2]

const matrix = new THREE.Matrix4()

interface ControlPoint {
  id: string
  ref: THREE.Vector3
  position: [number, number, number]
}

const getCenter = (geometry: THREE.BufferGeometry, center = new THREE.Vector3()) => {
  geometry.computeBoundingBox()
  geometry.boundingBox!.getCenter(center)
  return center
}

const customNormalize = (geometry: THREE.BufferGeometry) => {
  const transformed = geometry.clone()
  transformed.scale(0.01, 0.01, 0.01)
  transformed.translate(...getCenter(transformed).negate().toArray())
  transformed.rotateX(-Math.PI / 2)
  transformed.rotateY(Math.PI / 2)
  return transformed
}

const customDenormalize = (geometry: THREE.BufferGeometry) => {
  const transformed = geometry.clone()
  transformed.rotateY(-Math.PI / 2)
  transformed.rotateX(Math.PI / 2)
  transformed.scale(100, 100, 100)
  return transformed
}

const useSTLGeometry = (url: string) => {
  const geometry = useLoader(STLLoader, url)
  return useMemo(() => customNormalize(geometry), [geometry])
}

const Scene = () => {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [selected, setSelected] = useState<THREE.Object3D | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [showSkeleton, setShowSkeleton] = useState(true)
  const [gridDimension, setGridDimension] =
    useState<[number, number, number]>(DEFAULT_GRID_DIMENSION)

  const [implantDataUrl, setImplantDataUrl] = useState<string>(DEFAULT_MODEL_URL)
  const [skeletonDataUrl, setSkeletonDataUrl] = useState<string>(DEFAULT_SKELETON_URL)
  const modelGeometry = useSTLGeometry(implantDataUrl)
  const skeletonGeometry = useSTLGeometry(skeletonDataUrl)

  const [ffd, controlPoints] = useMemo(() => {
    const position = modelGeometry.getAttribute('position') as THREE.BufferAttribute
    const coord = ParametricCoordinate.fromBbox(new THREE.Box3().setFromBufferAttribute(position))
    const ffd = new FFD(modelGeometry, coord, ...gridDimension)

    const filteredPoints: THREE.Vector3[] = []
    const { l, m, n } = ffd.controlPoints
    for (const [point, i, j, k] of ffd.controlPoints) {
      if (i === 0 || i === l || j === 0 || j === m || k === 0 || k === n) {
        filteredPoints.push(point)
      }
    }

    const controlPoints: ControlPoint[] = filteredPoints.map((point) => ({
      id: shortid.generate(),
      ref: point,
      position: point.toArray() as [number, number, number],
    }))

    return [ffd, controlPoints]
  }, [modelGeometry, gridDimension])

  const handleDrag = useCallback(
    (m: THREE.Matrix4) => {
      matrix.copy(m)
      if (selected) {
        selected.position.setFromMatrixPosition(m)
        selected.rotation.setFromRotationMatrix(m)

        const { index } = selected.userData
        controlPoints[index].ref.copy(selected.position)
        ffd.deform()
      }
    },
    [selected, ffd, controlPoints]
  )

  useEffect(() => {
    const gui = new GUI()

    const config = {
      showSkeleton: true,
      download: () => {
        if (meshRef.current) {
          const geometry = customDenormalize(meshRef.current.geometry)
          exportSTL(new THREE.Mesh(geometry), DEFAULT_OUTPUT_NAME)
        }
      },
      uploadImplant: async () => {
        setImplantDataUrl(await uploadSTL())
        setSelected(null)
      },
      uploadSkeleton: async () => {
        setSkeletonDataUrl(await uploadSTL())
      },
      l: DEFAULT_GRID_DIMENSION[0],
      m: DEFAULT_GRID_DIMENSION[1],
      n: DEFAULT_GRID_DIMENSION[2],
    }

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
              dimension.map((n, i) => (i === index ? value : n)) as [number, number, number]
          )
          setSelected(null)
        })

    gui
      .add(config, 'showSkeleton')
      .name('Show Skeleton')
      .onChange((value: boolean) => setShowSkeleton(value))
    gui.add(config, 'uploadImplant').name('Upload Implant')
    gui.add(config, 'uploadSkeleton').name('Upload Skeleton')
    gui.add(config, 'download')
    addGridDimensionController(gui, 'l', 'Width', 0)
    addGridDimensionController(gui, 'm', 'Height', 1)
    addGridDimensionController(gui, 'n', 'Length', 2)
    return () => gui.destroy()
  }, [])

  return (
    <>
      <mesh geometry={modelGeometry} onClick={(e) => e.stopPropagation()}>
        <meshStandardMaterial color="#B17457" transparent opacity={0.95} />
      </mesh>

      <mesh ref={meshRef} geometry={modelGeometry}>
        <meshStandardMaterial color="white" transparent opacity={0.9} wireframe />
      </mesh>

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

      <group
        onPointerMissed={() => {
          if (!isDragging) {
            setSelected(null)
          }
        }}
      >
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

        {controlPoints.map(({ id, position }, index) => (
          <Sphere
            key={id}
            args={[0.008]}
            position={position}
            userData={{ index }}
            onClick={(e) => {
              matrix.copy(e.object.matrixWorld)
              setSelected(e.object)
            }}
          >
            <meshStandardMaterial color="white" />
          </Sphere>
        ))}
      </group>
    </>
  )
}

export default Scene
