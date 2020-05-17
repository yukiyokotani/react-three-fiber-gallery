import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/home/Home'));
const DefaultBox = lazy(() => import('./pages/default-box/DefaultBox'));
const TailingBox = lazy(() => import('./pages/tailing-box/TailingBox'));
const HalftoneBox = lazy(() => import('./pages/halftone-box/HalftoneBox'));
const LuminousBox = lazy(() => import('./pages/luminous-box/LuminousBox'));
const LuminousAndHalftoneBox = lazy(() => import('./pages/luminous-and-halftone-box/LuminousAndHalftoneBox'));


const Loading = () => {
  return <p>Loading...</p>;
}

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Suspense fallback={Loading}>
        <Switch>
          <Route path='/' exact children={<Home />} />
          <Route path='/default-box' children={<DefaultBox />} />
          <Route path='/tailing-box' children={<TailingBox />} />
          <Route path='/halftone-box' children={<HalftoneBox />} />
          <Route path='/luminous-box' children={<LuminousBox />} />
          <Route path='/luminous-and-halftone-box' children={<LuminousAndHalftoneBox />} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  </div>
);

export default App;