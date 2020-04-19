/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const theme = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
`;

const Text = () => {
    return (
        <div css={theme}>
            <h1>Which do you like?</h1>
        </div >
    )
};

export default Text;