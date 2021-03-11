import * as React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    useLocation
} from "react-router-dom";

import MainPage from './Pages/Main';
import StudentsPage from './Pages/Students';
import Registration from "./Pages/Registration/registration";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={MainPage}/>
                <Route exact path="/students" component={StudentsPage}/>
                <Route exact path="/sign-up" component={Registration}/>
            </Switch>
        </Router>
    );
}

export default App;
