import * as React from 'react';
import  { Menu, Sidebar, Loader  } from 'semantic-ui-react';
import './sidebar.css';
import autobind from 'autobind-decorator';
import { Link } from 'react-router-dom';

import { IRouteArray } from './../../interfaces/componentInterfaces'
import { Spinner } from 'react-bootstrap';

interface ISidebarState {
    loading: boolean;
}

interface ISidebarProps {
    routes: IRouteArray;
    showSidebar: boolean;
}

export default class Base extends React.Component<ISidebarProps, ISidebarState> {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }
    
    componentDidMount() {
        this.setState({loading: false})
    }
      
    render() {
        if(this.state.loading) return <Spinner animation="grow" />
        let menuItems = this.renderMenuItems();
        return  <Sidebar 
            as={Menu} 
            animation="overlay" 
            visible={this.props.showSidebar} 
            icon="labeled" 
            vertical
            width='thin'
            className='noBorderTop sidebarCustomStyle'
        >
            {menuItems}
        </Sidebar>
    }

    @autobind
    renderMenuItems() {
        return(this.props.routes.map((route) => {
            if(route.showInSidebar){
                return <Menu.Item className='sidebarItem' key={route.path}>
                    <Link key={route.path} to={route.path} >
                        <strong className="whiteColor">{route.title}</strong>
                    </Link>
                </Menu.Item>
            }
        }))
    }
}