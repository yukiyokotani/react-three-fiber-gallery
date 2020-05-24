import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import styled from 'styled-components';
import FrontText from '../../components/FrontText';

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
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
            <meshNormalMaterial attach="material" />
        </mesh>
    )
}

const Scene = () => {
    return (
        <React.Fragment>
            <ambientLight />
            <Box position={[0, 0, 0]} />
        </React.Fragment>
    )
}

const DefaultBox = () => {
    return (
        <React.Fragment>
            <FrontText title="Default Box" />
            <CanvasStyle>
                <Canvas>
                    <Scene />
                </Canvas>
            </CanvasStyle>
        </React.Fragment>
    )
}

export default DefaultBox;
