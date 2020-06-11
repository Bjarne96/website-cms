import * as React from 'react';
import './header.css';
import { Link, animateScroll as scroll } from "react-scroll";
import { Navbar, Nav, Spinner, Image } from 'react-bootstrap';

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
        if(this.state.loading) return <Spinner animation="grow" />
        return<Navbar bg="dark" variant="dark" fixed="top" expand="lg">
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Item>
                    <Image src="./../../../public/logo.png" alt="logo.png" width="40" height="40" />
                </Nav.Item>
                <Nav.Link>&nbsp;&nbsp;&nbsp;&nbsp;Tiefschlaf&nbsp;&nbsp;&nbsp;&nbsp;</Nav.Link>
                {this.props.views.map((obj, key) => {
                    return <Nav.Link key={obj.id}>
                        <Link
                            onClick={() => {this.props.setView(key+1)}}
                            activeClass="active"
                            to={obj.id}
                            id={obj.id+"click"}
                            spy={true}
                            smooth={true}
                            offset={-56}
                            duration={1000}>
                            
                            {obj.name}
                        </Link>
                    </Nav.Link>
                })}
            </Nav>
        </Navbar.Collapse>
      </Navbar>
        /*return <Menu secondary fixed="top" attached="top" className="navbar">
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
        </Menu>*/
    }
}
export default Header;