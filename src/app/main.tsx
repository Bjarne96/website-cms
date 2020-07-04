import * as React from 'react';
import './main.css';
import Header from './components/header/header';
import autobind from 'autobind-decorator';
import { pushHistory } from "./handler/historyHandler";
import { handleSetListeners, handleScrollEvent, handleInitalScroll } from "./handler/scrollHandler"
import { getStructure } from './handler/structureRequests';
import { IStructure, IContent, IArticle } from '../schemas';
import * as DisplayArticles from './components/displayArticle';
import { Spinner } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, withRouter  } from 'react-router-dom';
import { INavArray, IRouteArray } from './interfaces/componentInterfaces';
import { FullscreenScroller } from './components/fullscreenScroller/fullscreenScroller';

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

let navs: INavArray = [];
let routes: IRouteArray = [];

var handler = document.body;
var delay = false;

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
        //load structure
        let structureResponse = await getStructure(structureId);
        //todo exception
        //build componentstructure for components
        let structure: IStructure = structureResponse.result;
        this.loadComponentAndRouterStructure(structure);
        this.loadNav();
        this.loadRoutes();
        //sets listeners for scrolling
        //handleSetListeners(handler, this.handleScroll);
        //gets active view from router
        let newActiveView = handleInitalScroll();
        console.log('newActiveView', newActiveView);
        //sets state
        await this.setState({activeView: newActiveView, loading: false})
    }

    @autobind 
    loadNav () {
        componentStructure.forEach( (data) => {
            let compType = data.componentType;
            if(compType == "widescreen" || compType == "productdetail") {
                navs.push({
                    id : "div"+data.content._id,
                    nav : data.content._id + "click",
                    name : data.content.title
                })
            }
            if(compType == "set") {
                navs.push ({
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
    setRoute(route) {
        this.setState({activeView: route})
        pushHistory(route)
    }

    @autobind
    setActiveView(value) {
        console.log("***********************setActiveView", value)
        this.setState({activeView: value})
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
        if(this.state.loading) return <Spinner animation="grow" />
        let routeComps;
        routeComps = <></>
        if(routerStructure != undefined) {
            //maps componentstrcuture into routes
            routeComps = routerStructure.map((data) => {
                let article: IArticle = data.content;
                if(data.componentType == "route"){
                    return <Route 
                        key={article._id} 
                        path={article.url} 
                        explicit  
                        component={() => 
                            <div>
                                <Header 
                                    setView={this.setRoute} 
                                    navs={navs} 
                                    routes={routes}
                                    activeView={this.state.activeView} 
                                    toggleSidebar={this.toggleSidebar} 
                                    showSidebar={this.state.showSidebar} 
                                /><h1>{article.title}</h1>
                            </div> 
                        }
                    />
                }
                return
            })
        }
		return (
            <Router>
                <Switch>
                    <Route path="/1" explicit component={() => 
                        <div className="App" id="App">
                            <Header 
                                setView={this.setRoute} 
                                navs={navs} 
                                routes={routes}
                                activeView={this.state.activeView} 
                                toggleSidebar={this.toggleSidebar} 
                                showSidebar={this.state.showSidebar} 
                            />
                            <FullscreenScroller 
                                setActiveView={this.setRoute} 
                                activeView={this.state.activeView} 
                                navs={navs} 
                                componentStructure={componentStructure}
                            />
                        </div>
                    }/>
                    {routeComps}
                </Switch>
            </Router>
		);
	}
}
export default Main;