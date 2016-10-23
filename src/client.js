import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist'
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import Main from './components/Main';
import * as Pages from './pages';

import './scss/main.scss';

const loggerMiddleware = createLogger();
const store = createStore(
  rootReducer,
  applyMiddleware(
  	thunkMiddleware,
    loggerMiddleware
  ),
  autoRehydrate()
);
persistStore(store);

console.log("OK?");

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="" component={Main}>
        <Route path="/" component={Pages.Home} />
        <Route path="createproject" component={Pages.ProjectForm} />
        <Route path="editproject/:project" component={Pages.ProjectForm} />
        <Route path="projects" component={Pages.Projects} />
        <Route path="projects/:project" component={Pages.Project} />
        <Route path="about" component={Pages.About} />
        <Route path="blog" component={Pages.Blog} />
        <Route path="ambience" component={Pages.Ambience} />
        <Route path="*" component={Pages.NotFound} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
