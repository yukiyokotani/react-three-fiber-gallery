/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const theme = css`
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
        <div css={theme}>
            <h1>{props.title}</h1>
        </div >
    )
};

export default FrontText;