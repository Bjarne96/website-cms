import * as React from 'react';
import './navigation.css';
import { withRouter } from 'react-router-dom';
import Sidebar from "./sidebar/sidebar";
import Navbar from "./navbar/navbar";
import { INavItem } from '../../../../schemas';

interface IProps {
    routes: Array<INavItem>;
    history;
}

interface Istate {
    navbarTransparent: boolean;
    showSidebar: boolean;
}

var delay = false;
var touchstartHandler;
var touchX;

export class Navigation extends React.Component<IProps, Istate>{

    constructor(props) {
        super(props);
        this.changeHistory = this.changeHistory.bind(this);
        this.evaluateStyle = this.evaluateStyle.bind(this);
        this.toggleSidebar = this.toggleSidebar.bind(this);
        this.touchstartHandler = this.touchstartHandler.bind(this);
        this.state = {
            navbarTransparent: true,
            showSidebar: false
        }
    }

    toggleSidebar() {
        // Debounce
        if (delay) return
        delay = true;
        setTimeout(() => { delay = false; }, 500)

        //Toggles showSidebar State
        this.setState({ showSidebar: !this.state.showSidebar })

        if (!this.state.showSidebar) {
            //Shows Sidebar
            document.getElementById("sidebar").classList.add("sidebar-active");
            //Set Listener
            window.addEventListener('touchstart', touchstartHandler, false)
        } else {
            //Hides Sidebar
            document.getElementById("sidebar").classList.remove("sidebar-active");
            //Remove Listener
            window.removeEventListener('touchstart', touchstartHandler, false)
        }
    }

    //Mobile Sidebar Handler
    touchstartHandler(event) {
        touchX = event.touches[0].clientX;
        if (touchX > (window.innerWidth * 0.7)) this.toggleSidebar();
    }

    evaluateStyle(url) {
        if (url == "/home" || url == "/") {
            this.setState({ navbarTransparent: true })
        } else {
            this.setState({ navbarTransparent: false })
        }
    }

    changeHistory(url: string, title: string) {
        this.evaluateStyle(url);
        document.getElementById("document-title").innerHTML = title;
        if (this.state.showSidebar) this.toggleSidebar();
        let pushableUrl = url.toLowerCase();
        this.props.history.push(pushableUrl);
        window.scrollTo(0, 0);
    }

    render() {
        return <>
            <Navbar
                changeHistory={this.changeHistory}
                toggleSidebar={this.toggleSidebar}
                evaluateStyle={this.evaluateStyle}
                navbarTransparent={this.state.navbarTransparent}
                routes={this.props.routes}
                history={this.props.history}
            />
            <Sidebar
                changeHistory={this.changeHistory}
                routes={this.props.routes}
                history={this.props.history}
            />
        </>
    }
}
// @ts-ignore
export default withRouter(Navigation);