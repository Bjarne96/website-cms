import { ReactElement } from "react";

export interface IViewArray extends Array<IViewComponent>{}

export interface IViewComponent {
    id: string,
    nav: string,
    name: string
}

export interface IRouteArray extends Array<IRouteComponent>{}

export interface IRouteComponent {
    url: string;
    title: string;
}