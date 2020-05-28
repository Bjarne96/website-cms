import * as request from "./requestHandler"
//import { Types } from "mongoose";
import { IArticle } from "./../../schemas";

//article specific requests

//Gets all articles
export const getArticles = async () => {
    let articles = await request.getData("articles");;
    return articles;
}

//Gets one specific article
export const getArticle = async (id: any) => {
    let article = await request.getRow("article", id);
    return article;
}