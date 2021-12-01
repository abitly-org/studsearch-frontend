import * as React from 'react';

import './index.scss';

const App : React.FC = ({ children }) => (
  <div className='App'>
    { children }
  </div>
);

export default App;