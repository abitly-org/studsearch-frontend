import * as React from 'react';
import { Route } from 'react-router-dom';

import MyRatingApp from './myrating';

const redesignRoutes = <>
  <Route path="/myrating/:page?" component={MyRatingApp} />
</>

export default redesignRoutes;