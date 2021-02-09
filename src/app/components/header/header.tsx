import * as React from 'react';
import './header.css';
import { Link as RouterLink, withRouter } from 'react-router-dom';
// import { IRouteArray } from '../../interfaces/componentInterfaces';
import { Icon, Sidebar, Menu } from 'semantic-ui-react';

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
        this.renderSidebar = this.renderSidebar.bind(this);
        this.renderNavbar = this.renderNavbar.bind(this);
        this.changeHistory = this.changeHistory.bind(this);
    }


    changeHistory(url) {
        console.log('url', url);
        document.getElementById("mobileSidebarClose").click();
        this.props.history.push(url);
    }


    renderSidebar() {
        return <div className="mobileSidebarContainer">
            <Icon className="mobileSidebarToggle mobileSidebarOpen margin10" name='bars' size="big" onClick={this.props.toggleSidebar} />
            <Sidebar
                className="mobileSidebar"
                animation='overlay'
                icon='labeled'
                inverted={true}
                onHide={() => this.props.toggleSidebar}
                vertical={true}
                visible={this.props.showSidebar}
                width='thin'
                as={Menu}
            >
                <div id="mobileSidebarClose" onClick={this.props.toggleSidebar} className="mobileSidebarToggle mobileSidebarClose"><div className="mdiv"><div className="md"></div></div></div>
                <i className="mobileSidebarToggle mobileSidebarClose mobileSidebarAngle angleIconSidebar" />
                {/* <Icon className=" margin10" size="big" name='angle left' onClick={this.props.toggleSidebar} /> */}
                {/* <Icon id="mobileSidebarClose" className="mobileSidebarToggle mobileSidebarClose margin10" size="big" name='close' onClick={this.props.toggleSidebar} /> */}
                <Menu.Item
                    className="mobileSidebarItem mobileSidebarHeaderItem"
                    as='div'
                    onClick={() => this.changeHistory("/")}
                >
                    <p>Tiefschlafen</p>
                </Menu.Item>

                {this.props.routes.map((obj, key) => {
                    return <Menu.Item
                        className={this.props.history.location.pathname == obj.url ? "mobileSidebarItem active" : "mobileSidebarItem"}
                        as='div'
                        key={key + "route"}
                        onClick={() => this.changeHistory(obj.url)}>
                        <p>{obj.title}</p>
                    </Menu.Item>
                })}
            </Sidebar>
        </div>
    }


    renderNavbar() {
        return <nav className="main-nav" key="mainnav">
            <img src="./../../../public/logo.png" alt="logo.png" width="40" height="40" />
            <ul className="main-menu">
                {this.props.routes.map((route, index) => {
                    return <li key={route.url + index}><RouterLink
                        className="nav-link"
                        to={route.url}
                        onClick={() => { window.scrollTo(0, 0); }}
                    >
                        {route.title}
                    </RouterLink></li>
                })}
            </ul>
        </nav>;
    }

    render() {
        if (this.props.isMobile) return this.renderSidebar();
        return this.renderNavbar();
    }
}
// @ts-ignore
export default withRouter(Header);