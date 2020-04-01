import * as React from 'react';

import './main.css';
import { IRouteArray } from './interfaces/componentInterfaces'

import Default from './views/default/default';

import Header from './components/header/header';
import Bar from './components/sidebar/sidebar';
import View from './components/router/router';
import Navbar from "./components/navbar/navbar";
import { Loader } from 'semantic-ui-react';
import autobind from 'autobind-decorator';
import { createBrowserHistory } from 'history';

interface IMainState {
    loading: boolean;
    activeView: number;
}

let divstyle = {
    width: window.innerWidth,
    height: window.innerHeight-40,
    border: "1px solid red"
}

let dummyViews:any = [
    {
        id: "div1",
        name: "View 1"
    },
    {
        id: "div2",
        name: "View 2"
    },
    {
        id: "div3",
        name: "View 3"
    },
    {
        id: "div4",
        name: "View 4"
    },
    {
        id: "div5",
        name: "View 5"
    }
]

var handler = document.body;

var position:any = handler.scrollTop;

var delay = false;

const history = createBrowserHistory();

export class Main extends React.Component<any, IMainState> {

	constructor(props) {
		super(props);
		this.state = {
            loading: true,
            activeView: 1
		}
    }

	async componentDidMount() {
        this.setListeners(true);
        let body = document.querySelector('body');
        body.classList.add("stop-scrolling");
        console.log("loca", history.location);
        if(history.location.pathname !== "/") {
            console.log("test")
            let string = history.location.pathname;
            let newView = Number(string.slice(1,2));
            console.log("newView", 'div'+ newView +'click')
            await this.setState({activeView: newView}) 
        }
        await this.setState({loading: false})
        let actualElem = document.getElementById('div'+ this.state.activeView +'click')
            actualElem.click();
        console.log("state", this.state)
    }

    @autobind
    setView(view: number) {
        this.setState({activeView: view})
        history.push('/'+view)
    }

    @autobind
    setListeners(add: boolean) {
        if(add) {
            handler.addEventListener('wheel', (e:any) => {this.handleScroll(e)}, false); 
            handler.addEventListener("", (e:any) => {this.handleScroll(e)}); // modern desktop
            handler.addEventListener('touchmove', (e:any) => {this.handleScroll(e)}); // mobile
            handler.addEventListener('keydown', (e:any) => {this.handleScroll(e)}, false);
        } else {
            handler.removeEventListener('scroll', (e:any) => {this.handleScroll(e)});
            handler.removeEventListener('wheel', (e:any) => {this.handleScroll(e)}, false); 
            handler.removeEventListener("", (e:any) => {this.handleScroll(e)}); // modern desktop
            handler.removeEventListener('touchmove', (e:any) => {this.handleScroll(e)}); // mobile
            handler.removeEventListener('keydown', (e:any) => {this.handleScroll(e)}, false);
        }
    }

    @autobind
    handleScroll(event?) {
        // scroll interactin cant befaster than 1.5 seconds
        if(delay) return
        delay = true;
        setTimeout(()=> {delay = false;}, 1500)
        //scrolling by wheel event
        let scroll = document.scrollingElement.scrollTop;
        let newView: number;
        if(event != undefined && event.deltaY != undefined) {
            if(event.deltaY > 0) {
                //down
                if(this.state.activeView === 5) return(newView = 1);
                newView = this.state.activeView+1;
            } else {
                //up
                if(this.state.activeView === 1) return(newView = 5);
                newView = this.state.activeView-1;
            }
        } else {
            //other events
            if (scroll >= position) {
                //down
                if(this.state.activeView === 5) return(newView = 1);
                newView = this.state.activeView+1;
            } else {
                //up
                if(this.state.activeView === 1) return(newView = 5);
                newView = this.state.activeView-1;
            }
        }
        //clicks and updates actual view
        let actualElem = document.getElementById('div'+newView+'click')
        actualElem.click();
        this.setState({activeView: newView})
        history.push('/'+newView)
        position = document.scrollingElement.scrollTop;
    }
    
	render() {
        if(this.state.loading) return <Loader active/>
		return (
		<div className="App">
			<Header setView={this.setView} views={dummyViews}/>
			<div className="test first" style={divstyle} id="div1">Div1</div>
			<div className="test" style={divstyle} id="div2">Div2</div>
			<div className="test" style={divstyle} id="div3">Div3</div>
			<div className="test" style={divstyle} id="div4">Div4</div>
			<div className="test" style={divstyle} id="div5">Div5</div>
		</div>
		);
	}

}
export default Main;