import * as React from 'react';
import './home.css';
import FullscreenScroller from '../../components/fullscreenScroller/fullscreenScroller';

interface IProps {
    componentStructure: any;
    navs: any;
    isMobile: boolean;
}

interface IState {
}

export class Home extends React.Component<IProps, IState>{

    render() {
        return <FullscreenScroller
            navs={this.props.navs}
            componentStructure={this.props.componentStructure}
            isMobile={this.props.isMobile}
        />
    }
}