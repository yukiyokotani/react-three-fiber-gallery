import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Main = styled.div`
    padding: 2% 5%;
    color: white;
    font-family: Sans-Serif;
    a {
        color: hotpink;
        text-decoration: none;
      };
`;

const Home: React.FC = () => {
    return (
        <Main>
            <h1>Gallery</h1>
            <li><Link to='/default-box' >Default Box</Link></li>
            <li><Link to='/tailing-box' >Tailing Box</Link></li>
            <li><Link to='/halftone-box' >Halftone Box</Link></li>
            <li><Link to='/luminous-box' >Luminous Box</Link></li>
            <li><Link to='/luminous-and-halftone-box' >Luminous & Halftone Box</Link></li>
            <li><Link to='/aligned-boxes'>Aligned Boxes</Link></li>
            {/* <li><Link to='/aligned-boxes-transform'>Aligned Boxes Transform</Link></li> */}
            {/* <li><Link to='/colorful-lines'>Colorful Lines</Link></li> */}
        </Main>
    );
};

export default Home;