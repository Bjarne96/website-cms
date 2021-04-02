import * as React from 'react';
import './main.css';
import Navigation from './components/body/navigation/navigation';
import { getBackbone } from "./handler/backboneRequests";
import { IArticle, ILoadedBackbone, INavItem, IProduct, IProductSelected } from '../schemas';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Home } from './views/home/home';
import { Default } from './views/default/default';
import { backboneId } from "./../../config";
import { Footer } from './components/footer/footer';
import Kasse from './views/kasse/kasse';
import Success from './views/success/success';
import Cancel from './views/cancel/cancel';
import { Product } from './views/product/product';
import Productdetail from './views/product/productdetail/productdetail';
import Warenkorb from './views/warenkorb/warenkorb';
import { getWarenkorb } from './handler/localstorageHandler';

interface IMainState {
    loading: boolean;
    warenkorbCount: Number;
}

let routes: Array<INavItem> = [];

let loadedBackbone: ILoadedBackbone;

export class Main extends React.Component<any, IMainState> {

    constructor(props) {
        super(props);
        this.formatNavBB = this.formatNavBB.bind(this);
        this.renderArticles = this.renderArticles.bind(this);
        this.renderProducts = this.renderProducts.bind(this);
        this.warenkorbChange = this.warenkorbChange.bind(this);
        this.state = {
            loading: true,
            warenkorbCount: null
        }
        this.warenkorbChange()
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

    async warenkorbChange() {
        let warenkorb = await getWarenkorb();
        let totalCount = 0;
        for (let i = 0; i < warenkorb.length; i++) {
            totalCount = totalCount + warenkorb[i].count;
        }
        await this.setState({
            warenkorbCount: totalCount
        })
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
                url: "/product-" + product.name,
                hide: true
            }
            routes.push(newNavItem)
        }
        let footerArticles = backbone.footer[0].articles
        for (let i = 0; i < footerArticles.length; i++) {
            let article = footerArticles[i];
            let newNavItem: INavItem = {
                name: article.name,
                title: article.title,
                url: article.url,
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
                component={() =>
                    <Productdetail
                        //@ts-ignore
                        history={this.props.history}
                        warenkorbChange={this.warenkorbChange}
                        product={product}
                    />}
            />
        });

    }

    render() {
        if (loadedBackbone == undefined) return <></>
        return (
            <div>
                <div>
                    <Navigation
                        //@ts-ignore
                        routes={routes}
                        warenkorbCount={this.state.warenkorbCount}
                        history={this.props.history}
                    />
                    <div className="main-container">
                        <Route path="/" exact component={() => <Home />} />
                        <Route path="/home" exact component={() => <Home />} />
                        <Route path="/kasse" exact component={() =>
                            <Kasse />
                        } />
                        <Route path="/produkte" exact component={() =>
                            <Product products={loadedBackbone.products} />
                        } />
                        <Route path="/success" exact component={() =>
                            <Success />
                        } />
                        <Route path="/cancel" exact component={() =>
                            <Cancel />
                        } />
                        <Route path="/warenkorb" exact component={() =>
                            <Warenkorb warenkorbChange={this.warenkorbChange} />
                        } />
                        {this.renderArticles(loadedBackbone.articles)}
                        {this.renderArticles(loadedBackbone.footer[0].articles)}
                        {this.renderProducts(loadedBackbone.products)}
                        {/* <Route path="/shoppingcart" exact component={() => <Shoppingcart navs={navs} componentStructure={componentStructure} />} /> */}
                        {/* ToDo Error */}
                        {/* ToDo 404 */}
                    </div>
                </div>
                <Footer content={loadedBackbone.footer} />
            </div>
        )
    }
}
export default Main;