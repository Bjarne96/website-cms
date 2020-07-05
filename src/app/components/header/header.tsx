import * as React from 'react';
import './header.css';
import { Link, animateScroll as scroll } from "react-scroll";
import { Link as RouterLink } from 'react-router-dom';
import { Navbar, Nav, Spinner, Image } from 'react-bootstrap';
import { INavArray, IRouteArray } from '../../interfaces/componentInterfaces';
import { Icon, Sidebar, Menu } from 'semantic-ui-react';
import autobind from 'autobind-decorator';

interface IProps {
    navs: INavArray;
    routes: IRouteArray;
    showSidebar: boolean;
    setView(view);
    toggleSidebar(newHandler);
    activeView: number;
}


interface Istate {
}

let mobile = false;

export class Header extends React.Component <IProps, Istate>{

    constructor(props) {
        super(props);
    }

    @autobind
    renderSidebar() {
        return <div className="infrontandfixed">
            <Icon className="mobileSidebarToggle margin10" name='bars' onClick={this.props.toggleSidebar}/>
            <Sidebar
                animation='overlay'
                icon='labeled'
                inverted={"true"}
                onHide={() => this.props.toggleSidebar}
                vertical={"true"}
                visible={this.props.showSidebar}
                width='thin'
                as={Menu}
                className="mobileSidebarContainer"
            >
                <Icon className="mobileSidebarToggle mobileSidebarClose margin10" name='window close outline' onClick={this.props.toggleSidebar}/>
                {this.props.navs.map((obj, key) => {
                    return <Menu.Item className="mobileSidebarItem" as='a' key={obj.id}>
                        <Link
                            onClick={() => {this.props.setView(key+1)}}
                            activeClass="active"
                            to={obj.id}
                            id={obj.id+"click"}
                            spy={true}
                            smooth={true}
                            offset={0}
                            duration={1000}>
                            
                            {obj.name}
                        </Link>
                    </Menu.Item>
                })}
            </Sidebar>
        </div>
    }

    @autobind
    renderNavbar() {
        return <Navbar bg="dark" variant="dark" fixed="top" expand="lg">
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Item>
                    <Image src="./../../../public/logo.png" alt="logo.png" width="40" height="40" />
                </Nav.Item>
                <Navbar.Brand>&nbsp;&nbsp;&nbsp;&nbsp;Tiefschlaf&nbsp;&nbsp;&nbsp;&nbsp;</Navbar.Brand>
                {this.props.navs.map((obj, key) => {
                    return <Link
                        key={obj.nav}
                        className="nav-link"
                        onClick={() => {this.props.setView(key+1)}}
                        activeClass="active"
                        to={obj.id}
                        id={obj.nav}
                        spy={true}
                        smooth={true}
                        offset={-56}
                        duration={1000}>
                        {obj.name}
                    </Link>
                })}
                {this.props.routes.map((route) => {
                    return <RouterLink 
                        className="nav-link" 
                        key={route.url} 
                        to={route.url} 
                    >
                        {route.title}
                    </RouterLink>
                })}
            </Nav>
        </Navbar.Collapse>
      </Navbar>
    }

    render() {
        if(mobile)return this.renderSidebar();
        return this.renderNavbar();
    }
}
export default Header;