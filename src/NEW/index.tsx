import * as React from 'react';
import { Route } from 'react-router-dom';

import MyRatingApp from './myrating';

// @ts-ignore
CSS?.['paintWorklet']?.addModule?.('/smooth-corners.js')

const redesignRoutes = <>
  <Route path="/myrating/:page?" component={MyRatingApp} />
</>

export default redesignRoutes;