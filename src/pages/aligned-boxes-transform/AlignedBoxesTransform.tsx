import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree, extend } from 'react-three-fiber';
import styled from 'styled-components';
import * as THREE from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';

import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { WebGLRenderer, OrthographicCamera, PerspectiveCamera } from 'three';
import FrontText from '../../components/FrontText';

extend({ EffectComposer, RenderPass, UnrealBloomPass });

const CanvasStyle = styled.div`
    width: 100vw;
    height: 100vh;
    z-index: -100;
    background-color: $black;
`;

interface BoxProps {
    // position: [number, number, number];
    sphere: THREE.Object3D;
    grid: THREE.Object3D;
}

const Box: React.FC<BoxProps> = (props) => {
    const mesh = useRef<THREE.Mesh>();
    const [active, setActive] = useState(false);

    const frame = 20000;
    const vectorSphereToGrid: [number, number, number] = useMemo(() => [
        (props.grid.position.x - props.sphere.position.x),
        (props.grid.position.y - props.sphere.position.y),
        (props.grid.position.z - props.sphere.position.z),
    ], []);

    // const unitVectorSphereToGrid: [number, number, number][] = useMemo(()=> {
    //     new Array(frame).map(f => {
    //     (props.grid.position.x - props.sphere.position.x) / frame,
    //     (props.grid.position.y - props.sphere.position.y) / frame,
    //     (props.grid.position.z - props.sphere.position.z) / frame
    // })}, []);

    let i = 0;
    useFrame(() => {
        if (mesh.current) {
            // mesh.current.rotation.x += 0.005 + i / 10000
            // mesh.current.rotation.y += 0.01 + i / 1000
            mesh.current.position.x += vectorSphereToGrid[0] * Math.sin(i / (frame));
            mesh.current.position.y += vectorSphereToGrid[1] * Math.sin(i / (frame));
            mesh.current.position.z += vectorSphereToGrid[2] * Math.sin(i / (frame));
        }
        i++;
    });

    return (
        <mesh
            ref={mesh}
            position={props.sphere.position}
            scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
            onClick={e => setActive(!active)}
        >
            <boxBufferGeometry attach="geometry" args={[0.1, 0.1, 0.1]} />
            <meshNormalMaterial attach="material" />
        </mesh>
    )
}

const Boxes = () => {
    const { gl, scene, camera, size } = useThree();

    const targets = useMemo(() => {
        let targets = { sphere: Array<THREE.Object3D>(), grid: Array<THREE.Object3D>() };

        // 球体に整列するの場合の座標計算
        for (let i = 0, n = 100; i < n; i++) {
            let phi = Math.acos(- 1 + (2 * i) / n);
            let theta = Math.sqrt(n * Math.PI) * phi;
            let object = new THREE.Object3D();
            object.position.setFromSphericalCoords(2, phi, theta);
            targets.sphere.push(object);
        };

        // 格子に整列するの場合の座標計算
        for (let i = 0, n = 100; i < n; i++) {
            var object = new THREE.Object3D();
            object.position.x = ((i % 5) * 1) - 2;
            object.position.y = (- (Math.floor(i / 5) % 5) * 1) + 2;
            object.position.z = (Math.floor(i / 25)) * 2.5 - 7;
            targets.grid.push(object);
        };

        return targets;
    }, []);

    return (
        targets.sphere.map((object, i) => {
            return (
                <Box
                    key={i}
                    sphere={targets.sphere[i]}
                    grid={targets.grid[i]}
                />)
        })
    );
}

const Effects = () => {
    const { gl, scene, camera, size } = useThree();
    const composer = useRef<EffectComposer>();
    scene.fog = new THREE.Fog(0x000000, 1, 1000);

    useEffect(() => {
        if (composer.current)
            composer.current.setSize(size.width, size.height)
    }, [size]);

    useFrame(() => {
        if (composer.current) {
            composer.current.render();
        };
    });

    return (
        <React.Fragment>
            <effectComposer ref={composer} args={[gl]}>
                <renderPass attachArray="passes" args={[scene, camera]} />
                <unrealBloomPass attachArray="passes" args={[new THREE.Vector2(window.innerWidth, window.innerHeight), 2.0, 1.0, 0]} />
            </effectComposer>
        </React.Fragment>
    )
}

const Scene = () => {
    return (
        <React.Fragment>
            {Boxes()}
            <Effects />
        </React.Fragment>
    )
}

const AlignedBoxesTransform = () => {
    // const [isAlignSphere, setIsAlignSphere]= useState(true);

    return (
        <React.Fragment>
            <FrontText title="Aligned Boxes Transform" />
            <CanvasStyle>
                <Canvas>
                    <Scene />
                </Canvas>
            </CanvasStyle>
        </React.Fragment>
    )
}

export default AlignedBoxesTransform;