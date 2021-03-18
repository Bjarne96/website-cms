import * as React from 'react';
import './main.css';
import Navigation from './components/body/navigation/navigation';
import { getBackbone } from "./handler/backboneRequests";
import { IArticle, ILoadedBackbone, ILoadedFooter, INavItem } from '../schemas';
import { Loader } from 'semantic-ui-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Home } from './views/home/home';
import { Default } from './views/default/default';
import { Shoppingcart } from './views/shoppingcart/shoppingcart';
import { backboneId } from "./../../config";
import { Footer } from './components/footer/footer';
import Paypal from './views/paypal/paypal';
import Success from './views/success/success';
import { Produkte } from './views/produkte/produkte';

interface IMainState {
    loading: boolean;
}

let routes: Array<INavItem> = [];

let loadedBackbone: ILoadedBackbone;

export class Main extends React.Component<any, IMainState> {

    constructor(props) {
        super(props);
        this.formatNavBB = this.formatNavBB.bind(this);
        this.renderArticles = this.renderArticles.bind(this);
        this.state = {
            loading: true
        }
    }

    async componentDidMount() {
        //load structure
        let loadedBackboneRequest = await getBackbone(backboneId);
        //todo exception
        //build componentstructure for components
        loadedBackbone = loadedBackboneRequest.result;
        this.formatNavBB(loadedBackbone);
        this.setState({ loading: false })
    }

    formatNavBB(backbone: ILoadedBackbone) {
        for (let i = 0; i < backbone.navigation.length; i++) {
            const element = backbone.navigation[i];
            routes.push(element);
        }
        for (let i = 0; i < backbone.articles.length; i++) {
            let article = backbone.articles[i];
            let newNavItem: INavItem = {
                name: article.name,
                title: article.title,
                url: article.url
            }
            routes.push(newNavItem)
        }
    }

    renderArticles(articles: Array<IArticle>) {
        return articles.map((article: IArticle) => {
            return <Route
                key={article._id}
                path={article.url}
                exact
                component={() => <Default content={article.content} />}
            />
        });
    
    }

    render() {
        if (loadedBackbone == undefined) return <></>
        return (
            <div>
                <Router>
                    <div>
                        <Navigation
                            //@ts-ignore
                            routes={routes}
                            history={this.props.history}
                        />
                        <div className="mainContainer">
                            <Route path="/home" exact component={() => <Home />} />
                            <Route path="/paypal" exact component={() => <Paypal />} />
<<<<<<< HEAD
                            <Route path="/produkte" exact component={() => <Produkte products={loadedBackbone.products} />} />
=======
                            <Route path="/success" exact component={() => <Success />} />
                            <Route path="/produkte" exact component={() => <Produkte />} />
>>>>>>> 62019a1867cfc8056445ad2dd25149b14ccf6410
                            {this.renderArticles(loadedBackbone.articles)}
                            {/* <Route path="/shoppingcart" exact component={() => <Shoppingcart navs={navs} componentStructure={componentStructure} />} /> */}
                            {/* ToDo Error */}
                            {/* ToDo 404 */}
                        </div>
                    </div>
                </Router>
                <Footer content={loadedBackbone.footer} />
            </div>
        )
    }
}
export default Main;