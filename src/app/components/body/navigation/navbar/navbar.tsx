import * as React from 'react';
import { Menu, Loader, Icon, Label } from 'semantic-ui-react';
import './navbar.css';
import * as config from "./../../../../../../config";
import { INavItem } from '../../../../../schemas';

interface INavbarProps {
    history;
    routes: Array<INavItem>;
    warenkorbCount: Number;
    navbarTransparent: boolean;
    changeHistory(title: string, url: string);
    toggleSidebar();
    evaluateStyle(url);
}

interface INavbarState {
    loading: boolean;
    showSidebar: boolean;
}

export default class Navbar extends React.Component<INavbarProps, INavbarState> {

    constructor(props) {
        super(props);
        this.navbarEvent = this.navbarEvent.bind(this);
        this.state = {
            loading: false,
            showSidebar: false
        }
    }

    componentDidMount() {
        window.onscroll = this.navbarEvent;
        if (window.scrollY > 0) document.getElementById("navbar").classList.add("animateT");
        this.setState({ loading: false })
        this.props.evaluateStyle(this.props.history.location.pathname);
    }

    navbarEvent() {
        if (window.scrollY > 100) document.getElementById("navbar").classList.add("animateT");
    }

    render() {
        if (this.state.loading) return <Loader active />
        let navbarClassName = "navbar-container";
        if (this.props.navbarTransparent) {
            navbarClassName += " transparent"
        }
        return <nav id="navbar" className={navbarClassName} key="mainnav">
            <img src="./../../../public/logo.png" className="logo" alt="logo" onClick={() => window.location.href = config.domain} />
            <div onClick={() => window.location.href = config.domain}><h2>Tiefschlafen</h2></div>
            <div className={"navbar-menu"}>
                {this.props.routes.map((route, key) => {
                    let itemClass = "";
                    if (this.props.history.location.pathname == route.url) itemClass += " active";
                    if (route.hide === true) itemClass += " hide";
                    return <Menu.Item
                        className={itemClass}
                        as='div'
                        key={key + "route"}
                        onClick={() => this.props.changeHistory(route.url, route.title)}>
                        <p className={itemClass} id={route.url}>{route.name}</p>
                    </Menu.Item>
                })}
            </div>
            <div className="navbar-btns">
                {this.props.warenkorbCount != null && this.props.warenkorbCount != 0 ?
                    <Label color='blue' pointing='right'>{this.props.warenkorbCount}</Label>
                    :
                    ""
                }
                <Icon className="btn cart-btn" name='cart' size="big" onClick={() => this.props.changeHistory("/warenkorb", "Warenkorb")} />
                <Icon className="btn sidebar-btn" name='bars' size="big" onClick={this.props.toggleSidebar} />

            </div>
        </nav>;
    }
}