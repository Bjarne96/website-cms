import * as React from 'react';
import './main.css';
import Header from './components/header/header';
import autobind from 'autobind-decorator';
import MobileSidebar from './components/mobileSidebar/mobileSidebar';
import { pushHistory } from "./handler/historyHandler"
import { handleSetListeners, handleScrollEvent, handleInitalScroll } from "./handler/scrollHandler"
import { getStructure } from './handler/structureRequests';
import { IStructure } from '../schemas';
import * as DisplayArticles from './components/displayArticle';
import { Spinner } from 'react-bootstrap';

interface IMainState {
    loading: boolean;
    activeView: number;
    showSidebar: boolean;
}

let divstyle = {
    width: window.innerWidth,
    height: window.innerHeight
}

let structureId = "5ecf937004cc1b001752148d";

let componentStructure = [];

//todo dummy views from db
let dummyViews:any = [
    {
        id: "div1",
        name: "Frontpage"
    },
    {
        id: "div2",
        name: "Product"
    },
    {
        id: "div3",
        name: "Sets"
    }
]

var handler = document.body;
var delay = false;
let mobile = false;

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
        console.log("did mount")
        //load structure
        let structureResponse = await getStructure(structureId);
        //todo exception
        //build componentstructure for components
        let structure: IStructure = structureResponse.result;
        this.loadComponentStructure(structure);
        //sets listeners for scrolling
        handleSetListeners(handler, this.handleScroll);
        //gets active view from router
        let newActiveView = handleInitalScroll(this.state.activeView)
        //sets state
        await this.setState({activeView: newActiveView, loading: false})
        //scrolls intially
        document.getElementById('div'+ this.state.activeView +'click').click();
    }

    componentWillUpdate() {
        console.log("test")
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

    @autobind
    loadComponentStructure(structure: IStructure) {
        //sets object dummy for filling in set data
        let setObject = {
            componentType : "set",
            content : []
        };
        //temp variable for last active set
        let setTouchedBy = 1;
        for(let i = 0; i < structure.content.length; i++){
            let _obj = structure.content[i];
            switch(_obj.componentType) {
                //widescreen and product detail just need to be pushed
                case ("widescreen"): 
                case ("productdetail"): {
                    componentStructure.push(_obj)
                    break;
                }
                //sets need to be filled into one object
                case ("set"): { 
                    let setNumber = parseInt(_obj.properties);
                    if(setNumber == 1) {
                        setTouchedBy = setNumber;
                        setObject.content = [];
                        setObject.content.push(_obj)
                    }else if(setNumber == setTouchedBy+1){
                        setTouchedBy++;
                        setObject.content.push(_obj)
                    }
                    if(setNumber == 6){
                        componentStructure.push(setObject)
                    }
                    break;
                }
            }
        }
    }

	render() {
        console.log("rendermain")
        if(this.state.loading) return <Spinner animation="grow" />
        //checks for undefined componentstructure  - todo exception
        let structureComps;
        structureComps = <></>
        if(componentStructure != undefined) {
            //maps componentstrcuture into components
            structureComps = componentStructure.map((data, index) => {
                let displayComponent = <></>
                if(data.componentType == "widescreen"){
                    displayComponent = <DisplayArticles.DisplayWidePicture component={data.content} />
                }else if(data.componentType == "productdetail") {
                    displayComponent = <DisplayArticles.DisplayDetails component={data.content} />
                }else if(data.componentType == "set") {
                    displayComponent = <DisplayArticles.DisplaySet component={data.content}/>
                }
                //basic frame for each scrollable component
                return(
                    <div key={"div"+index} className={"test" + (index == 0 ? " xfirst" : "")} style={divstyle} id={"div"+(index+1)}>
                        {displayComponent}
                    </div>
                )
            })
        }
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
            {structureComps}
		</div>
		);
	}
}
export default Main;