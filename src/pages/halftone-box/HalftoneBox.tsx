import React, { useRef, useState, useEffect, MutableRefObject } from 'react';
import { extend, Canvas, useFrame, useThree } from 'react-three-fiber';
import styled from 'styled-components';
import * as THREE from 'three';

import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { HalftonePass } from 'three/examples/jsm/postprocessing/HalftonePass';
import { WebGLRenderer, OrthographicCamera, PerspectiveCamera } from 'three';
import FrontText from '../../components/FrontText';

extend({ EffectComposer, RenderPass, HalftonePass })

const CanvasStyle = styled.div`
    width: 100vw;
    height: 100vh;
    z-index: -100;
    background-color: $black;
`;

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'effectComposer': { children: Element[]; ref: MutableRefObject<EffectComposer | undefined>; args: WebGLRenderer[]; },
            'renderPass': { attachArray: string; args: (THREE.Scene | OrthographicCamera | PerspectiveCamera)[]; },
            'halftonePass': { attachArray: string; },
        }
    }
}

interface BoxProps {
    position: [number, number, number];
};

const Box: React.FC<BoxProps> = (props) => {
    const mesh = useRef<THREE.Mesh>();
    const [active, setActive] = useState(false);

    useFrame(() => {
        if (mesh.current) {
            mesh.current.rotation.x += 0.005;
            mesh.current.rotation.y += 0.01;
        }
    })

    return (
        <mesh
            ref={mesh}
            position={props.position}
            scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
            onClick={e => setActive(!active)}
        >
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
            <meshNormalMaterial attach="material" />
        </mesh>
    );
};

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
                <halftonePass attachArray="passes" />
            </effectComposer>
        </React.Fragment>
    )
}

const Scene = () => {
    return (
        <React.Fragment>
            <ambientLight />
            <Box position={[0, 0, 0]} />
            <Effects />
        </React.Fragment>
    )
}

const HalftoneBox = () => {
    return (
        <React.Fragment>
            <FrontText title="Halftone Box" />
            <CanvasStyle>
                <Canvas>
                    <Scene />
                </Canvas>
            </CanvasStyle>
        </React.Fragment>
    )
}

export default HalftoneBox;
