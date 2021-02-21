import * as React from 'react';
import { Students } from '../../Helpers/api';

import './index.scss';

const StudentsBlock = ({ children }: { children: React.ReactNode }) => 
  <div className="StudentsBlock">{children}</div>;

export default StudentsBlock;