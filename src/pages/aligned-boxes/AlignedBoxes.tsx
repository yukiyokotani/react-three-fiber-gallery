import React, { useRef, useState, useEffect } from 'react';
import { extend, Canvas, useFrame, useThree } from 'react-three-fiber';
import styled from 'styled-components';
import * as THREE from 'three';

import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import FrontText from '../../components/FrontText';

extend({ EffectComposer, RenderPass, UnrealBloomPass })

const CanvasStyle = styled.div`
    width: 100vw;
    height: 100vh;
    z-index: -100;
    background-color: $black;
`;

interface BoxProps {
    position: [number, number, number];
}

const Box: React.FC<BoxProps> = (props) => {
    const mesh = useRef<THREE.Mesh>();
    const [active, setActive] = useState(false);

    useFrame(() => {
        if (mesh.current) {
            mesh.current.rotation.y += 0.01
        }
    })

    return (
        <mesh
            ref={mesh}
            position={props.position}
            scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
            onClick={e => setActive(!active)}
        >
            <boxBufferGeometry attach="geometry" args={[0.1, 0.1, 0.1]} />
            <meshNormalMaterial attach="material" />
        </mesh>
    )
}

const Boxes = () => {
    let targets = { sphere: Array<THREE.Object3D>() };

    for (let i = 0, n = 100; i < n; i++) {
        let phi = Math.acos(- 1 + (2 * i) / n);
        let theta = Math.sqrt(n * Math.PI) * phi;
        let object = new THREE.Object3D();
        object.position.setFromSphericalCoords(2, phi, theta);
        targets.sphere.push(object);
    }

    return (
        targets.sphere.map((object, index) => {
            return <Box position={[object.position.x, object.position.y, object.position.z]} key={index} />
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
    }, 10);

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

const AlignedBoxes = () => {
    return (
        <React.Fragment>
            <FrontText title="Aligned Boxes" />
            <CanvasStyle>
                <Canvas>
                    <Scene />
                </Canvas>
            </CanvasStyle>
        </React.Fragment>
    )
}

export default AlignedBoxes;