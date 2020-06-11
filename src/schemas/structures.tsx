import { IDefaultSchema } from "../app/interfaces/viewInterfaces"
import { IArticle } from "."

export interface IStructure {
    _id: string;
    name: string;
    description: string;
    domain: string;
    content: Array<IContent>,
}

export interface dependendContent {
    _id: string,
    componentType: componentType,
    contentType: contentType,
    properties? : string //optional for styling or sets
}

export interface IDependendStructure {
    _id: string;
    name: string;
    description: string;
    domain: string;
    content: Array<dependendContent>,
}

export type componentType = "set" |  "widescreen"| "productdetail";

export enum componentTypex {
    set, widescreen, productdetail
}

export type contentType =  "article" | "product";

export enum contentTypex {
    article, product, productdetail
}

export interface IContent {
    content: IArticle,
    componentType : componentType,
    contentType : contentType,
    properties? : string //optional for styling or sets
}

export interface IContentArray {
    content: Array<IArticle>,
    componentType : componentType,
    contentType : contentType,
    properties? : string //optional for styling or sets
}

export const structureComponentSchema = {

}

export const structureWebSchema: IDefaultSchema = {
    formTitle: "Edit Article",
    tableTitle: "Articles",
    fields: [
        {
            id: "_id",
            name: "",
            type: "text",
            required: false,
            error : "Missing ID.",
            hideInForm: true,
            hideInTable: true,
            checkErr : (field: string) => {if(field.length) return false; else{return true}}
        },
        {
            id: "name",
            name: "Name",
            type: "text",
            required: true,
            error : "Missing ID.",
            checkErr : (field: string) => {if(field.length) return false; else{return true}}
        },
        {
            id: "title",
            name: "Title",
            type: "text",
            required: true,
            error : "Missing ID.",
            checkErr : (field: string) => {if(field.length) return false; else{return true}}
        },
        {
            id: "url",
            name: "URL",
            type: "text",
            required: true,
            error : "Missing ID.",
            checkErr : (field: string) => {if(field.length) return false; else{return true}}
        },
        {
            id: "pictures",
            name: "Pictures",
            type: "pictures",
            required: false,
            error : "Missing ID.",
            checkErr : (field: string) => {if(field.length) return false; else{return true}}
        },
        {
            id: "content",
            name: "Content",
            type: "tinymce",
            required: true,
            error : "Missing ID.",
            checkErr : (field: string) => {if(field.length) return false; else{return true}}
        }
        
    ]
}

export default IStructure;