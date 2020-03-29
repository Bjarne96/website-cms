import * as React from 'react';

import './main.css';
import { IRouteArray } from './interfaces/componentInterfaces'

import Default from './views/default/default';

import Header from './components/header/header';
import Bar from './components/sidebar/sidebar';
import View from './components/router/router';
import Navbar from "./components/navbar/navbar";
import Link from "react-scroll";
import { Loader } from 'semantic-ui-react';
import autobind from 'autobind-decorator';

interface IMainState {
    loading: boolean;
    documentHeight: number;
}

let divstyle = {
    width: window.innerWidth,
    height: window.innerHeight-40,
    border: "1px solid red"
}

let dummyElemes = [

]

export class Main extends React.Component<{}, IMainState> {

	constructor(props) {
		super(props);
		this.state = {
            loading: true,
            documentHeight: 0
		}
	}

	componentDidMount() {
        this.setState({loading: false})
        console.log("setlistener")
        window.addEventListener('scroll', this.handleScroll);
    }

    @autobind
    handleScroll(event) {
        event.preventDefault();
        console.log("handleScroll")
        let docelem = document.documentElement.scrollTop;
        console.log("docelem", docelem)
    }

    @autobind
    handleNewView() {
        console.log("handleNewView")
        window.removeEventListener('scroll', this.handleScroll);

        //simulate click
        //fileElement.click();

    }
    
	render() {
        if(this.state.loading) return <Loader active/>
		return (
		<div className="App">
			<Header />
			<div className="test first" style={divstyle} id="div1">Div1</div>
			<div className="test" style={divstyle} id="div2">Div2</div>
			<div className="test" style={divstyle} id="div3">Div3</div>
			<div className="test" style={divstyle} id="div4">Div4</div>
			<div className="test" style={divstyle} id="div5">Div5</div>
            {/*<Link
                activeClass="active"
                to="div3"
                spy={true}
                smooth={true}
                offset={-40}
                duration={500}
            >Test</Link>*/}
		</div>
		);
	}

}
export default Main;