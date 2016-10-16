import { combineReducers } from 'redux';

import Background from './Background';
import Music from './Music';
import Projects from './Projects';

const rootReducer = combineReducers({
  Background,
  Music,
  Projects
});

export default rootReducer;
