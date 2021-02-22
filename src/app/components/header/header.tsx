import * as React from 'react';
import './header.css';
import { withRouter } from 'react-router-dom';
import Sidebar from "./../sidebar/sidebar";
import Navbar from "./../navbar/navbar";
// import { IRouteArray } from '../../interfaces/componentInterfaces';

interface IProps {
    routes: any; // temporary fix for tslint
    showSidebar: boolean;
    isMobile: boolean;
    toggleSidebar();
    history;
}


interface Istate {
}

export class Header extends React.Component<IProps, Istate>{

    constructor(props) {
        super(props);
        this.changeHistory = this.changeHistory.bind(this);
    }

    changeHistory(url) {
        console.log('url', url);
        if (this.props.isMobile) this.props.toggleSidebar();
        this.props.history.push(url);
    }

    render() {
        return <>
            <Navbar
                isMobile={this.props.isMobile}
                toggleSidebar={this.props.toggleSidebar}
                changeHistory={this.changeHistory}
                routes={this.props.routes}
                history={this.props.history}
            />
            <Sidebar
                changeHistory={this.changeHistory}
                showSidebar={this.props.showSidebar}
                routes={this.props.routes}
                history={this.props.history}
            />
        </>
    }
}
// @ts-ignore
export default withRouter(Header);