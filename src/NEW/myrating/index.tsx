import * as React from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import cx from 'classnames';

import App from '../components/app';
import useDelayed from '../utils/useDelayed';
import Header from '../header';

import StartPage from './start';
import SelectYearPage from './select-year';
import SelectSubjectsPage from './select-subjects';
import SelectScorePage from './select-score';
import MyRatingLoading from './result';
import MyRatingResult from './result';


import './index.scss';
import AppContent from '../components/app/content';

const AppContentAnimated = ({ children }: { children: React.ReactElement }) => {
  const index = React.useRef(0);
  const olderPage = React.useRef<React.ReactNode>(null);
  const oldPage = React.useRef<React.ReactNode>(null);
  // const [olderPage, setOlderPage] = React.useState<React.ReactElement | null>(null);
  // const [oldPage, setOldPage] = React.useState<React.ReactElement | null>(null);

  // const prevPage = useDelayed(children, 1000);

  // React.useEffect(() => {
  //   let changed = lastChildren.current !== children && lastChildren.current !== null;
  //   if (changed) {
  //     setOldPage( 
  //       <div key={index.current++} className='AppContentAnimated_Block old'>
  //         { lastChildren.current }
  //       </div>
  //     );
  //   }

  //   lastChildren.current = children;

  //   if (changed) {
  //     const timeout = setTimeout(() => setOldPage(null), 500);
  //     return () => clearTimeout(timeout);
  //   }
  // }, [ children ]);

  if (oldPage.current !== children) {
    if (index.current > 1) {
      olderPage.current = oldPage.current;
      oldPage.current = children;
    }
    index.current++;
  }

  const indexNum = Math.max(2, index.current);

  return (
    <div className='AppContentAnimated'>
      <div
        className={cx('AppContentAnimated_Block', { first: indexNum <= 3 })}
        key={indexNum}
      >
        { children }
      </div>
      {
        olderPage.current && 
          <div
            className='AppContentAnimated_Block old'
            key={indexNum + 1}
          >
            { olderPage.current }
          </div>
      }
    </div>
  )
}

const MyRatingApp = () => {
  let location = useLocation();

  return (
    <App>
      <Header />
      {/* <AppContentAnimated>
          <CSSTransition
            key={location.pathname}
            timeout={150}
          > */}
            <Switch location={location}>
              <Route path="/myrating/result/:year/:subject/:scores" component={MyRatingResult} />
              <Route path="/myrating/loading/:year/:subject/:scores" component={MyRatingLoading} />
              <Route path="/myrating/scores/:year/:subject" component={SelectScorePage} />
              <Route path="/myrating/subjects/:year" component={SelectSubjectsPage} />
              <Route path="/myrating/years" component={SelectYearPage} />
              <Route path="/myrating" component={StartPage} />
            </Switch>
          {/* </CSSTransition>
      </AppContentAnimated> */}
    </App>
  );
}

export default MyRatingApp;