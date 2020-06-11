import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import autobind from 'autobind-decorator';

import { IRouteArray } from './../../interfaces/componentInterfaces'
import { Spinner } from 'react-bootstrap';

interface IRouterProps {
    checkSession(): Promise<void>;
    routes: IRouteArray;
}

interface IRouterState {
    loading: boolean;
}

export class Views extends React.Component<IRouterProps, IRouterState> {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        this.setState({loading: false});
    }



    render() {
        if(this.state.loading) return <Spinner animation="grow" />
        let Routes  = this.renderRoutes();
        return <Switch>
            {Routes}
        </Switch>
    }

    @autobind
    renderRoutes() {
        return(this.props.routes.map((route) => {
            return <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                component={route.component}
            />
        }))
    }   
}

export default Views;