import { IArticle } from "./index";
import { IProduct } from "./products";

// with loaded articles
export interface ILoadedBackbone {
    _id: string;
    name: string;
    domain: string;
    navigation: Array<INavItem>;
    products: Array<IProduct>;
    articles: Array<IArticle>;
    footer: Array<ILoadedFooter>;
}
export interface ILoadedFooter {
    category: string;
    articles: Array<IArticle>;
}

// without only the article ID
export interface IBackbone {
    _id: string;
    name: string;
    domain: string;
    articles: Array<string>;
    products: Array<string>;
    navigation: Array<INavItem>;
    footer: Array<IFooter>;
}

export interface IFooter {
    category: string;
    articles: Array<string>;
}

export interface INavItem {
    name: string;
    title: string;
    url: string;
    hide?: boolean;
}