import * as React from 'react';
import  { Image, Menu } from 'semantic-ui-react';
import { Loader } from 'semantic-ui-react'
import './header.css';
import { Link, animateScroll as scroll } from "react-scroll";
import Views from '../router/router';

interface MyView {
    id: string;
    name: string;
}

interface IProps {
    views: [MyView];
    setView(view);
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
            {this.props.views.map((obj, key) => {
                return <Menu.Item key={obj.id}>
                    <Link
                        onClick={() => {this.props.setView(key+1)}}
                        activeClass="active"
                        to={obj.id}
                        id={obj.id+"click"}
                        spy={true}
                        smooth={true}
                        offset={-40}
                        duration={1000}>
                        
                        {obj.name}
                    </Link>
                </Menu.Item>
            })}
        </Menu>
   }
}
export default Header;