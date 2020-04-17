import * as React from 'react';
import './main.css';
import Header from './components/header/header';
import { Loader } from 'semantic-ui-react';
import autobind from 'autobind-decorator';
import MobileSidebar from './components/mobileSidebar/mobileSidebar';
import { pushHistory } from "./handler/historyHandler"
import { handleSetListeners, handleScrollEvent, handleInitalScroll } from "./handler/scrollHandler"

interface IMainState {
    loading: boolean;
    activeView: number;
    showSidebar: boolean;
}

let divstyle = {
    width: window.innerWidth,
    height: window.innerHeight,//-40,
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

var delay = false;

let mobile = true;

export class Main extends React.Component<any, IMainState> {

	constructor(props) {
		super(props);
		this.state = {
            loading: true,
            activeView: 1,
            showSidebar: false
		}
    }

	async componentDidMount() {
        handleSetListeners(handler, this.handleScroll);
        let newActiveView = handleInitalScroll(this.state.activeView)
        await this.setState({activeView: newActiveView, loading: false})
        document.getElementById('div'+ this.state.activeView +'click').click();
    }

    @autobind
    setView(view: number) {
        //updates state
        this.setState({activeView: view})
        //updates history
        pushHistory(view)
    }

    @autobind
    toggleSidebar() {
        //debounce
        if(delay) return
        delay = true;
        setTimeout(()=> {delay = false;}, 500)
        //sets sidebar state
        this.setState({showSidebar: !this.state.showSidebar})
    }

    @autobind
    async handleScroll(event?) {
        //debounce with 1 sec
        if(delay) return;
        delay = true;
        setTimeout(()=> {delay = false;}, 1000)
        //scrolling by wheel event
        let newView = await handleScrollEvent(this.state.activeView, event);
        this.setState({activeView: newView})
    }

	render() {
        if(this.state.loading) return <Loader active/>
		return (
		<div className="App" id="App">
            {mobile ? 
                <MobileSidebar 
                    toggleSidebar={this.toggleSidebar} 
                    showSidebar={this.state.showSidebar} 
                    setView={this.setView} 
                    views={dummyViews}
                />
            : 
                <Header setView={this.setView} views={dummyViews}/>
            }    
            <div className="test xfirst" style={divstyle} id="div1">Div1</div>
            <div className="test" style={divstyle} id="div2">Div2</div>
            <div className="test" style={divstyle} id="div3">Div3</div>
            <div className="test" style={divstyle} id="div4">Div4</div>
            <div className="test" style={divstyle} id="div5">Div5</div>
		</div>
		);
	}

}
export default Main;