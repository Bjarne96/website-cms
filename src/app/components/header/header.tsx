import * as React from 'react';
import  { Image, Menu } from 'semantic-ui-react';
import { Loader } from 'semantic-ui-react'
import './header.css';
import { Link, animateScroll as scroll } from "react-scroll";

interface IProps {
}

interface Istate {
    loading: Boolean;
}

export class Header extends React.Component <IProps, Istate>{

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    render() {
        if(this.state.loading) return <Loader active />
        return <Menu secondary fixed="top" attached="top" className="navbar">
            <Menu.Item className="logoMenu">
                <Image size="mini" src='./../../../public/logo.png'/>
                <strong className="whiteColor">&nbsp;&nbsp;Tiefschlaf</strong>
            </Menu.Item>
            <Menu.Item>
                <div>simulate here</div>
            </Menu.Item>
        </Menu>
   }
}
export default Header;