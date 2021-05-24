import * as React from 'react';
import { Helmet } from 'react-helmet';

import Header from "../../Components/Header";

import BlockDiscover from '../../Blocks/Discover';
import BlockHowItWorks from '../../Blocks/HowItWorks';
import BlockStudents from '../../Blocks/Students';

import './index.scss';

const MainPage = () => {

  return (
    <div className="MainPage">
      {/* <Helmet>
        <title>StudSearch — Дізнайся про навчання в університеті від студентів</title>
        <meta name="title" content="StudSearch — Дізнайся про навчання в університеті від студентів" />
        <meta property="og:title" content="StudSearch — Дізнайся про навчання в університеті від студентів" />
        <meta name="twitter:title" content="StudSearch — Дізнайся про навчання в університеті від студентів" />
      </Helmet> */}
      <BlockDiscover />
      <BlockHowItWorks />
      <BlockStudents />
      {/*
        <BlockSomeStudents />
        <BlockStats />
      */}
    </div>
  );
}

export default MainPage;
