import * as React from 'react';

import Header from "../../Components/Header";

import BlockDiscover from '../../Blocks/Discover';
import BlockHowItWorks from '../../Blocks/HowItWorks';
import BlockStudents from '../../Blocks/Students';

import './index.scss';

const MainPage = () => {
  return (
    <div className="MainPage">
      <Header />
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
