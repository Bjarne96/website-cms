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
                {this.props.views.map((obj, key) => {
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
}
  

export default MobileSidebar
