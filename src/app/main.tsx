import * as React from 'react';
import './main.css';
import Navigation from './components/body/navigation/navigation';
import { getBackbone } from "./handler/backboneRequests";
import { IArticle, ILoadedBackbone, INavItem, IProduct } from '../schemas';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Home } from './views/home/home';
import { Default } from './views/default/default';
import { backboneId } from "./../../config";
import { Footer } from './components/footer/footer';
import Paypal from './views/paypal/paypal';
import Success from './views/success/success';
import { Produkte } from './views/produkte/produkte';
import Produktdetail from './views/produkte/produktdetail/produktdetail';
import Warenkorb from './views/warenkorb/warenkorb';

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
        this.renderProducts = this.renderProducts.bind(this);
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
        for (let i = 0; i < backbone.products.length; i++) {
            let product = backbone.products[i];
            let newNavItem: INavItem = {
                name: product.name,
                title: product.name,
                url: "/produkt-" + product.name,
                hide: true
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

    renderProducts(products: Array<IProduct>) {
        return products.map((product: IProduct) => {
            return <Route
                key={product._id}
                path={"/produkt-" + product.name}
                exact
                component={() => <Produktdetail produkt={product} />}
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
                        <div className="main-container">
                            <Route path="/paypal" exact component={() =>
                                <Paypal />
                            } />
                            <Route path="/produkte" exact component={() =>
                                <Produkte products={loadedBackbone.products} />
                            } />
                            <Route path="/success" exact component={() =>
                                <Success />
                            } />
                            <Route path="/warenkorb" exact component={() =>
                                <Warenkorb />
                            } />
                            {this.renderArticles(loadedBackbone.articles)}
                            {this.renderProducts(loadedBackbone.products)}
                            {/* <Route path="/shoppingcart" exact component={() => <Shoppingcart navs={navs} componentStructure={componentStructure} />} /> */}
                            {/* ToDo Error */}
                            {/* ToDo 404 */}
                        </div>
                        <Route path="/home" exact component={() => <Home />} />
                    </div>
                </Router>
                <Footer content={loadedBackbone.footer} />
            </div>
        )
    }
}
export default Main;