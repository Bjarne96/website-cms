import * as React from 'react';
import { Header, Icon, Image, Menu, Segment, Sidebar, Loader } from 'semantic-ui-react'
import autobind from 'autobind-decorator';
import './mobileSidebar.css';
import { Link } from 'react-scroll';

interface MyView {
    id: string;
    name: string;
}

interface IState {
    loading: boolean;
}

interface IProps {
    views: [MyView];
    showSidebar: boolean;
    setView(view);
    toggleSidebar(newHandler);
}

let divstyle = {
    width: window.innerWidth,
    height: window.innerHeight,
    border: "1px solid red"
}

let delay = false;

export class MobileSidebar extends React.Component<IProps, IState> {

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
        if(this.state.loading) return <Loader active />
        return  <div className="infrontandfixed">
            <Menu.Item className="mobileSidebarToggle margin10" color="black" as='a'onClick={this.props.toggleSidebar}>
                <Icon name='bars' />
            </Menu.Item>
            <Sidebar
                animation='overlay'
                icon='labeled'
                inverted={"true"}
                onHide={() => this.props.toggleSidebar}
                vertical={"true"}
                visible={this.props.showSidebar}
                width='thin'
                className="mobileSidebarContainer"
            >
                <Menu.Item className="mobileSidebarToggle margin10" color="black" as='a'onClick={this.props.toggleSidebar}>
                    <Icon name='close' />
                </Menu.Item>
                <Menu vertical className="mobileSidebarMenu">
                    <Menu.Item className="mobileSidebarHeadline">
                        Home
                    </Menu.Item>
                    <Menu vertical className="mobileSidebarMenu">
                    {this.props.views.map((obj, key) => {
                        return <Menu.Item key={obj.id}>
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
                    </Menu>
                </Menu>
            </Sidebar>
        </div>
    }
}
  

export default MobileSidebar
