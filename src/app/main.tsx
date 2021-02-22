import * as React from 'react';
import './main.css';
import Header from './components/header/header';
import { getStructure } from './handler/structureRequests';
import { IStructure, IContent, IArticle } from '../schemas';
import { Loader } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import { INavArray, IRouteArray } from './interfaces/componentInterfaces';
import { Home } from './views/home/home';
import Default from './views/default/default';

interface IMainState {
    loading: boolean;
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

var delay = false;
var touchstartHandler;
var touchX;

export class Main extends React.Component<any, IMainState> {

    constructor(props) {
        super(props);
        this.touchstartHandler = this.touchstartHandler.bind(this);
        this.loadNav = this.loadNav.bind(this);
        this.toggleSidebar = this.toggleSidebar.bind(this);

        this.state = {
            loading: true,
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
        touchstartHandler = this.touchstartHandler.bind(this);
        this.setState({ loading: false })
    }

    loadNav() {
        componentStructure.forEach((data) => {
            let compType = data.componentType;
            if (compType == "widescreen" || compType == "productdetail") {
                navs.push({
                    id: "div" + data.content._id,
                    nav: data.content._id + "click",
                    name: data.content.title,
                    url: data.content.url,

                })
            }
            if (compType == "set") {
                navs.push({
                    id: "div" + data.content[0].content._id,
                    nav: data.content[0].content._id + "click",
                    name: data.content[0].content.title,
                    url: data.content[0].content.url
                })
            }
        })

    }

    loadRoutes() {
        //home element
        routes.push({
            url: "/home",
            title: "Home"
        })
        routerStructure.forEach((data: IContent) => {
            routes.push({
                url: data.content.url,
                title: data.content.title
            })
        })

    }

    toggleSidebar() {
        console.log("toggle")

        //debounce
        if (delay) return
        delay = true;
        setTimeout(() => { delay = false; }, 500)
        //sets sidebar state
        this.setState({ showSidebar: !this.state.showSidebar })
        if (!this.state.showSidebar) document.getElementById("sidebar").classList.add("sidebar-active");
        if (this.state.showSidebar) document.getElementById("sidebar").classList.remove("sidebar-active");

        //Sets Listener
        if (!this.state.showSidebar) window.addEventListener('touchstart', touchstartHandler, false)
        if (this.state.showSidebar) window.removeEventListener('touchstart', touchstartHandler, false)
    }


    touchstartHandler(event) {
        touchX = event.touches[0].clientX;
        if (touchX > (window.innerWidth * 0.7)) this.toggleSidebar();
    }


    loadComponentAndRouterStructure(structure: IStructure) {
        //sets object dummy for filling in set data
        let setObject = {
            componentType: "set",
            contentType: "article",
            content: []
        };
        //temp variable for last active set
        let setTouchedBy = 1;
        for (let i = 0; i < structure.content.length; i++) {
            let _obj = structure.content[i];
            switch (_obj.componentType) {
                //widescreen and product detail just need to be pushed
                case ("widescreen"):
                case ("productdetail"): {
                    componentStructure.push(_obj)
                    break;
                }
                //sets need to be filled into one object
                case ("set"): {
                    let setNumber = parseInt(_obj.properties);
                    if (setNumber == 1) {
                        setTouchedBy = setNumber;
                        setObject.content = [];
                        setObject.content.push(_obj)
                    } else if (setNumber == setTouchedBy + 1) {
                        setTouchedBy++;
                        setObject.content.push(_obj)
                    }
                    if (setNumber == 6) {
                        componentStructure.push(setObject)
                    }
                    break;
                } case ("route"): {
                    routerStructure.push(_obj)
                }
            }
        }
        return (componentStructure);
    }

    render() {
        if (this.state.loading) return <Loader active />
        let isMobile = false;
        if (window.innerWidth / window.innerHeight <= 1) isMobile = true;
        let routeComps;
        routeComps = <></>
        if (routerStructure != undefined) {
            //maps componentstrcuture into routes
            routeComps = routerStructure.map((data) => {
                let article: IArticle = data.content;
                if (data.componentType == "route") {
                    return <Route
                        key={article._id}
                        path={article.url}
                        exact
                        component={() => <Default content={article.content} />}
                    />
                }
                return
            })
        }
        return (
            <Router>
                <div>
                    <Header
                        //@ts-ignore
                        routes={routes}
                        isMobile={isMobile}
                        toggleSidebar={this.toggleSidebar}
                        showSidebar={this.state.showSidebar}
                        history={this.props.history}
                    />
                    <div className="mainContainer">
                        {routeComps}
                        <Route path="/home" exact component={() => <Home navs={navs} componentStructure={componentStructure} isMobile={isMobile} />} />
                        <Route path="/" exact component={() => <Home navs={navs} componentStructure={componentStructure} isMobile={isMobile} />} />
                    </div>
                </div>
            </Router>
        );
    }
}
export default Main;