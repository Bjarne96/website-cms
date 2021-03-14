import * as React from 'react';
import { Loader } from 'semantic-ui-react';
import './sidebar.css';
import { INavItem } from '../../../../../schemas';

interface ISidebarState {
    loading: boolean;
}

interface ISidebarProps {
    routes: Array<INavItem>;
    history;
    changeHistory(title: string, url: string);
}

export default class Sidebar extends React.Component<ISidebarProps, ISidebarState> {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        this.setState({ loading: false })
    }

    render() {
        if (this.state.loading) return <Loader active />
        return <>
            <div id="sidebar" className="sidebar">
                {this.props.routes.map((route, key) => {
                    return <p
                        className={this.props.history.location.pathname == route.url ? "item active" : "item"}
                        key={key + "route"}
                        onClick={() => this.props.changeHistory(route.url, route.title)}
                    >
                        {route.name}
                    </p>
                })}
            </div>
        </>
    }
}