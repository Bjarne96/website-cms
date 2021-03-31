import * as request from "./requestHandler"
import { IProductSelected } from "../../schemas";

//Post Request Payment and gets Apporval URL back
export const createPayment = async (data: Array<IProductSelected>) => {
    let response = await request.postData("create_payment", data);
    return response;
}

//Finishes up a sale
export const executePayment = async (data) => {
    let response = await request.postData("execute_payment", data);
    return response;
}