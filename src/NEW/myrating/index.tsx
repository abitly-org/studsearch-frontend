import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from '../components/app';
import Header from '../header';

import StartPage from './start';
import SelectYearPage from './select-year';
import SelectSubjectsPage from './select-subjects';
import SelectScorePage from './select-score';
import LoadingPage from './loading';

const MyRatingApp = (props: any) => {

  return (
    <App>
      <Header />
      <Switch>
        <Route exact path="/myrating/loading" component={LoadingPage} />
        <Route exact path="/myrating/score" component={SelectScorePage} />
        <Route exact path="/myrating/subjects" component={SelectSubjectsPage} />
        <Route exact path="/myrating/year" component={SelectYearPage} />
        <Route exact path="/myrating/" component={StartPage} />
      </Switch>
    </App>
  );
}

export default MyRatingApp;