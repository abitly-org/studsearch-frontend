import * as React from 'react';
import {
    Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import { createBrowserHistory } from "history";

import redesignRoutes from './NEW/index';

import Header from './Components/Header';
import Footer from './Components/Footer';
import useUTM from './Helpers/useUTM';

const shouldShowHeader = (url: string) =>
    !url?.startsWith?.('/register') &&
    !url?.startsWith?.('/widget/') &&
    // NEW
    !url?.startsWith?.('/myrating')

function App() {
    useUTM();

    const history = React.useMemo(() => createBrowserHistory(), []);

    const [showHeader, setShowHeader] = React.useState(shouldShowHeader(history?.location?.pathname));
    history.listen(() => setShowHeader(shouldShowHeader(history?.location?.pathname)));

    return (
        <Router history={history}>
            { showHeader && <Header /> }
            <Switch>
                { redesignRoutes }
            </Switch>
            { showHeader && <Footer /> }
        </Router>
    );
}

export default App;
