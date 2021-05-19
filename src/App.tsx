import * as React from 'react';
import {
    Router,
    Route,
    Switch,
    useHistory,
    useLocation
} from "react-router-dom";
import { createBrowserHistory } from "history";

import MainPage from './Pages/Main';
import StudentsPage from './Pages/Students';
import Registration from "./Pages/Registration/registration";
import PersonalArea from "./Pages/PersonalArea/PersonalArea";
import DeletePage from "./Pages/DeletePage/DeletePage";
import StatsPage from './Pages/StatsPage';
import AboutPage from './Pages/AboutPage';
import PrivacyPolicyPage from './Pages/PrivacyPolicy';
import HelpPage from './Pages/HelpPage';

import Header from './Components/Header';

function App() {
    const history = React.useMemo(() => createBrowserHistory(), []);

    const [showHeader, setShowHeader] = React.useState(!history?.location?.pathname?.startsWith?.('/register'));
    history.listen(() => setShowHeader(!history?.location?.pathname?.startsWith?.('/register')));

    return (
        <Router history={history}>
            { showHeader && <Header /> }
            <Switch>
                <Route exact path="/" component={MainPage}/>
                {/* <Route exact path="/students" component={StudentsPage}/> */}
                <Route exact path="/rating" component={StatsPage}/>
                <Route exact path="/register" component={Registration}/>
                <Route exact path="/cabinet" component={PersonalArea}/>
                <Route exact path="/about" component={AboutPage} />
                <Route exact path="/help" component={HelpPage} />
                {/* <Route exact path="/delete-page" component={DeletePage}/> */}

                <Route exact path="/privacy-policy" component={PrivacyPolicyPage}/>
            </Switch>
        </Router>
    );
}

export default App;
