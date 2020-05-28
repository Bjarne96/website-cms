import * as React from 'react';
import './main.css';
import Header from './components/header/header';
import { Loader } from 'semantic-ui-react';
import autobind from 'autobind-decorator';
import MobileSidebar from './components/mobileSidebar/mobileSidebar';
import { pushHistory } from "./handler/historyHandler"
import { handleSetListeners, handleScrollEvent, handleInitalScroll } from "./handler/scrollHandler"
import { getArticles } from './handler/articleRequests';
import { getStructure } from './handler/structureRequests';
import { IArticle, IStructure, IContent } from '../schemas';
import * as DisplayArticles from './components/displayArticle';

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

let dummyArticleIds = [
    //frontview
    "5e735458e4195a0017bcfed5",
    //set
    "5ea08770e1b53f0017fd8da7",
    "5ea087fce1b53f0017fd8da9",
    "5ea088b5e1b53f0017fd8dab",
    "5ea08a62e1b53f0017fd8db0",
    "5ea08b76e1b53f0017fd8db3",
    "5ea08c3be1b53f0017fd8db5",
    //detail
    "5ea08eb3e1b53f0017fd8db9"
]

let structureId = "5ecf937004cc1b001752148d";

let componentStructure = [];

let frontview;

let setview = [];

let detailview;

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
        let structureResponse = await getStructure(structureId);
        //todo exception
        let structure: IStructure = structureResponse.result;
        let test = this.loadComponentStructure(structure);
        console.log("test", test)
        console.log("structure", structure);
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

    @autobind
    loadComponentStructure(structure: IStructure) {
        let setObject = {
            componentType : "set",
            content : []
        };
        let setTouchedBy = 1;
        for(let i = 0; i < structure.content.length; i++){
            let _obj = structure.content[i];
            switch(_obj.componentType) {
                case ("widescreen"): 
                case ("productdetail"): {
                    componentStructure.push(_obj)
                    console.log("_obj", _obj)
                    break;
                }
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
        console.log("loaded componentStructure")
        return(componentStructure);
    }

    @autobind
    renderStructure(){
        console.log("componentStructure", componentStructure)
        if(componentStructure == undefined) return("not defined yet")
        return(componentStructure.map((data, index) => {
            console.log("data", data, "index", index)
            let displayComponent = <></>
            if(data.componentType == "widescreen"){
                displayComponent = <DisplayArticles.DisplayWidePicture component={data.content} />
            }else if(data.componentType == "productdetail") {
                displayComponent = <DisplayArticles.DisplayDetails component={data.content} />
            }else if(data.componentType == "set") {
                displayComponent = <DisplayArticles.DisplaySet component={data.content}/>
            }
            return(
                <div key={"div"+index} className={"test" + (index == 0 ? " xfirst" : "")} style={divstyle} id={"div"+(index+1)}>
                    {displayComponent}
                </div>
            )
        }))
    }

	render() {
        if(this.state.loading) return <Loader active/>
        let structure = this.renderStructure();
        console.log("structure",structure)
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
            {structure}
		</div>
		);
	}

}
export default Main;