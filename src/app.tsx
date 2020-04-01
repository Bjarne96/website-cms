import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Main } from './app/main';
import { BrowserRouter as Router, Switch, Route, withRouter  } from 'react-router-dom';


ReactDOM.render(
    <Router>
        <Switch>
            <Route path=""  component={() => <Main />}/>
            <Main />
        </Switch>
    </Router>,
    document.getElementById('root')
);