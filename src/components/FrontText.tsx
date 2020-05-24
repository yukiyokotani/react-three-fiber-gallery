import React from 'react';
import styled from 'styled-components';

const StyledText = styled.h1`
    color: white;
    position: absolute;
    top: 2%;
    left: 5%;
    z-index: 100;
    font-family: Sans-Serif;
`;

interface FrontTextProps {
    title: string
}

const FrontText: React.FC<FrontTextProps> = (props) => {
    return (
        <StyledText>{props.title}</StyledText>
    )
};

export default FrontText;