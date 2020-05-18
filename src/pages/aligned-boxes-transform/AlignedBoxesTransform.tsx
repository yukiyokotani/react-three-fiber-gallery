/** @jsx jsx */
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import { css, jsx } from '@emotion/core';
import * as THREE from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import FrontText from '../../components/FrontText';


const theme = css`
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
            mesh.current.rotation.x += 0.005
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

const Scene = () => {
    return (
        <React.Fragment>
            {Boxes()}
        </React.Fragment>
    )
}

const AlignedBoxes = () => {
    return (
        <React.Fragment>
            <FrontText title="Aligned Boxes" />
            <div css={theme}>
                <Canvas>
                    <Scene />
                </Canvas>
            </div>
        </React.Fragment>
    )
}

export default AlignedBoxes;