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
import PersonalArea from "./Pages/PersonalArea/PersonalArea";
import DeletePage from "./Pages/DeletePage/DeletePage";
import StatsPage from './Pages/StatsPage';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={MainPage}/>
                {/* <Route exact path="/students" component={StudentsPage}/> */}
                <Route exact path="/rating" component={StatsPage}/>
                <Route exact path="/sign-up" component={Registration}/>
                <Route exact path="/personal-area" component={PersonalArea}/>
                <Route exact path="/delete-page" component={DeletePage}/>
            </Switch>
        </Router>
    );
}

export default App;
