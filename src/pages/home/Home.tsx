/** @jsx jsx */
import React from 'react';
import { Link } from 'react-router-dom';
import { css, jsx } from '@emotion/core';

const theme = css`
    padding: 2% 5%;
    color: white;
    a {
        color: hotpink;
        text-decoration: none;
      };
`;

const Home: React.FC = () => {
    return (
        <div css={theme}>
            <h1>Gallery</h1>
            <li><Link to='/default-box' >Default Box</Link></li>
            <li><Link to='/tailing-box' >Tailing Box</Link></li>
            <li><Link to='/halftone-box' >Halftone Box</Link></li>
            <li><Link to='/luminous-box' >Luminous Box</Link></li>
            <li><Link to='/luminous-and-halftone-box' >Luminous & Halftone Box</Link></li>
        </div>
    );
};

export default Home;