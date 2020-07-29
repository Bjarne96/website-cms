import * as React from 'react';
import './header.css';
import { Link as RouterLink } from 'react-router-dom';
import { INavArray, IRouteArray } from '../../interfaces/componentInterfaces';
import { Icon, Sidebar, Menu } from 'semantic-ui-react';
import autobind from 'autobind-decorator';

interface IProps {
    routes: IRouteArray;
    showSidebar: boolean;
    isMobile: boolean;
    toggleSidebar(newHandler);
}


interface Istate {
}

export class Header extends React.Component<IProps, Istate>{

    constructor(props) {
        super(props);
    }

    @autobind
    renderSidebar() {
        return <div className="infrontandfixed">
            <Icon className="mobileSidebarToggle margin10" name='bars' onClick={this.props.toggleSidebar} />
            <Sidebar
                animation='overlay'
                icon='labeled'
                inverted={true}
                onHide={() => this.props.toggleSidebar}
                vertical={true}
                visible={this.props.showSidebar}
                width='thin'
                as={Menu}
                className="mobileSidebarContainer"
            >
                <Icon className="mobileSidebarToggle mobileSidebarClose margin10" name='window close outline' onClick={this.props.toggleSidebar} />
                {this.props.routes.map((obj, key) => {
                    return <Menu.Item className="mobileSidebarItem" as='a' key={key + "route"}>
                        <RouterLink
                            className="nav-link"
                            key={obj.url}
                            to={obj.url}
                        >
                            {obj.title}
                        </RouterLink>
                    </Menu.Item>
                })}
            </Sidebar>
        </div>
    }

    @autobind
    renderNavbar() {
        return <nav className="main-nav">
            <img src="./../../../public/logo.png" alt="logo.png" width="40" height="40" />
            <ul className="main-menu">
                {this.props.routes.map((route) => {
                    return <li><RouterLink
                        className="nav-link"
                        key={route.url}
                        to={route.url}
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
export default Header;