export interface INavArray extends Array<INavComponent>{}

export interface INavComponent {
    id: string,
    nav: string,
    name: string
}

export interface IRouteArray extends Array<IRouteComponent>{}

export interface IRouteComponent {
    url: string;
    title: string;
}