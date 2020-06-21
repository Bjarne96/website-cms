import * as React from 'react';
import './main.css';
import Header from './components/header/header';
import autobind from 'autobind-decorator';
import MobileSidebar from './components/mobileSidebar/mobileSidebar';
import { pushHistory } from "./handler/historyHandler"
import { handleSetListeners, handleScrollEvent, handleInitalScroll } from "./handler/scrollHandler"
import { getStructure } from './handler/structureRequests';
import { IStructure, IContent, IArticle } from '../schemas';
import * as DisplayArticles from './components/displayArticle';
import { Spinner } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, withRouter  } from 'react-router-dom';
import { IViewArray, IRouteArray } from './interfaces/componentInterfaces';

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

let componentStructure: Array<any> = [];
let routerStructure = [];

let views: IViewArray = [];
let routes: IRouteArray = [];

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
        this.loadComponentAndRouterStructure(structure);
        this.loadViews();
        this.loadRoutes();
        //sets listeners for scrolling
        handleSetListeners(handler, this.handleScroll);
        //gets active view from router
        let newActiveView = handleInitalScroll(this.state.activeView)
        //sets state
        await this.setState({activeView: newActiveView, loading: false})
        //scrolls intially
        document.getElementById(views[newActiveView].nav).click();
    }

    componentWillUpdate() {
        console.log("test")
    }

    @autobind 
    loadViews () {
        componentStructure.forEach( (data) => {
            let compType = data.componentType;
            if(compType == "widescreen" || compType == "productdetail") {
                console.log("widescreen", "productdetail")
                views.push({
                    id : "div"+data.content._id,
                    nav : data.content._id + "click",
                    name : data.content.title
                })
            }
            if(compType == "set") {
                views.push ({
                    id : "div"+data.content[0].content._id,
                    nav :data.content[0].content._id + "click",
                    name : data.content[0].content.title
                })
            }
        })
        
    }

    @autobind 
    loadRoutes () {
        routerStructure.forEach( (data: IContent) => {
            routes.push({
                url : data.content.url,
                title : data.content.title
            })
        })
        
    }

    @autobind
    setView(view: any) {
        //updates state
        console.log("view", view)
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
        let newView = await handleScrollEvent(this.state.activeView ,views , event );
        this.setState({activeView: newView})
    }

    @autobind
    loadComponentAndRouterStructure(structure: IStructure) {
        //sets object dummy for filling in set data
        let setObject = {
            componentType : "set",
            contentType: "article",
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
                }case ("route"): {
                    routerStructure.push(_obj)
                }
            }
        }
        return(componentStructure);
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
                let compType = data.componentType;           
                if(compType == "widescreen"){
                    displayComponent = <DisplayArticles.DisplayWidePicture key={index} component={data.content} />
                }else if(compType == "productdetail") {
                    displayComponent = <DisplayArticles.DisplayDetails key={index} component={data.content} />
                }else if(compType == "set") {
                    displayComponent = <DisplayArticles.DisplaySet key={index} component={data.content}/>
                }
                //basic frame for each scrollable component
                return(
                    <div key={views[index].id} className={"test" + (index == 0 ? " xfirst" : "")} style={divstyle} id={views[index].id}>
                        {displayComponent}
                    </div>
                )
            })
        }
        console.log("views", views)
        let main = (<div className="App" id="App">
            {mobile ? 
                <MobileSidebar 
                    toggleSidebar={this.toggleSidebar} 
                    showSidebar={this.state.showSidebar} 
                    setView={this.setView} 
                    views={views}
                    routes={routes}
                />
            : 
                <Header setView={this.setView} views={views} routes={routes}/>
            } 
            {structureComps}
        </div>);
        let routeComps;
        routeComps = <></>
        if(routerStructure != undefined) {
            //maps componentstrcuture into routes
            routeComps = routerStructure.map((data, index) => {
                let article: IArticle = data.content;
                if(data.componentType == "route"){
                    return <Route key={article._id} path={article.url} explicit component={() => <div>{article.title}</div> }/>
                }
                return
            })
        }
		return (
            <Router>
                <Switch>
                    {routeComps}
                    <Route path="" explicit component={() => main}/>
                </Switch>
            </Router>
		);
	}
}
export default Main;