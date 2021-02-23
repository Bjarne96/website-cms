import * as React from 'react';
import { Menu, Loader, Icon } from 'semantic-ui-react';
import './navbar.css';
import * as config from "./../../../../config";
import { IRouteArray } from './../../interfaces/componentInterfaces'

interface INavbarState {
    loading: boolean;
    transparent: boolean;
}

interface INavbarProps {
    routes: IRouteArray;
    history;
    isMobile: boolean;
    toggleSidebar();
    changeHistory(url);
}

export default class Navbar extends React.Component<INavbarProps, INavbarState> {

    constructor(props) {
        super(props);
        this.navbarEvent = this.navbarEvent.bind(this);
        this.navbarRouteChange = this.navbarRouteChange.bind(this);
        this.evaluateStyle = this.evaluateStyle.bind(this);
        this.state = {
            loading: false,
            transparent: false
        }
    }

    componentDidMount() {
        window.onscroll = this.navbarEvent;

        this.setState({ loading: false })
        console.log('mount');
        this.evaluateStyle(this.props.history.location.pathname);
    }

    navbarEvent() {
        if (window.scrollY > 200) document.getElementById("navbar").classList.add("animateT");
    }

    navbarRouteChange(url) {
        this.evaluateStyle(url);
        this.props.changeHistory(url);
    }

    evaluateStyle(url) {
        if (url == "/home") {
            this.setState({ transparent: true })
        } else {
            this.setState({ transparent: false })
        }
    }

    render() {
        console.log('render');
        if (this.state.loading) return <Loader active />
        let navbarClassName = "navbar-container misterT";
        if (this.state.transparent) {
            console.log('this.state.transparent', this.state.transparent);
            navbarClassName += " transparent"
        }
        return <nav id="navbar" className={navbarClassName} key="mainnav">
            <img src="./../../../public/logo.png" className="logo" alt="logo" onClick={() => window.location.href = config.domain} />
            <div onClick={() => window.location.href = config.domain}><h2>Tiefschlafen</h2></div>
            <div className={"navbar-menu"}>
                {this.props.routes.map((route, key) => {
                    let itemClass = "mobileSidebarItem";
                    if (this.props.history.location.pathname == route.url) itemClass += " active";
                    return <Menu.Item
                        as='div'
                        key={key + "route"}
                        onClick={() => this.navbarRouteChange(route.url)}>
                        <p className={itemClass}>{route.title}</p>
                    </Menu.Item>
                })}
            </div>
            <div className="navbar-btns">
                <Icon className="btn cart-btn" name='cart' size="big" />
                <Icon className="btn sidebar-btn" name='bars' size="big" onClick={this.props.toggleSidebar} />
            </div>
        </nav>;
    }
}