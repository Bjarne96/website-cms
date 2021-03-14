export interface INavArray extends Array<INavComponent> { }

export interface INavComponent {
    id: string,
    nav: string,
    name: string,
    url: string
}

export interface IRouteArray extends Array<IRouteComponent> { }

export interface IRouteComponent {
    url: string;
    title: string;
    path?: string;
    showInSidebar?: boolean;
}