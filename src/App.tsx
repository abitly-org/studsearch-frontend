import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation
} from "react-router-dom";

import Header from './Components/Header';
import MainPage from './Pages/Main';
import StudentsPage from './Pages/Students';

function App() {
  return (
    <Router>
      <Header />
      <Route exact path="/" component={MainPage} />
      <Route exact path="/students" component={StudentsPage} />
    </Router>
  );
}

export default App;
