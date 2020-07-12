import * as React from 'react';
import './main.css';
import Header from './components/header/header';
import autobind from 'autobind-decorator';
import { getStructure } from './handler/structureRequests';
import { IStructure, IContent, IArticle } from '../schemas';
import { Loader } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
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

let isMobile = false;


var delay = false;

export class Main extends React.Component<any, IMainState> {

    constructor(props) {
        super(props);
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
        this.setState({ loading: false })
    }

    @autobind
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

    @autobind
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

    @autobind
    toggleSidebar() {
        //debounce
        if (delay) return
        delay = true;
        setTimeout(() => { delay = false; }, 500)
        //sets sidebar state
        this.setState({ showSidebar: !this.state.showSidebar })
    }

    @autobind
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
                        strict
                        component={() => <Default content={article.content} />}
                    />
                }
                return
            })
        }
        return (
            <Router>
                <Header
                    routes={routes}
                    isMobile={isMobile}
                    toggleSidebar={this.toggleSidebar}
                    showSidebar={this.state.showSidebar}
                />
                {routeComps}
                <Route path="/home" exact component={() => <Home navs={navs} componentStructure={componentStructure} />} />
                <Route path="" component={() => <Redirect to="/home" />} />
            </Router>
        );
    }
}
export default Main;