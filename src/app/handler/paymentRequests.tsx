import * as request from "./requestHandler"
import { IProductSelected } from "../../schemas";

//Post Request Payment and gets Apporval URL back
export const updatePayment = async (data: Array<IProductSelected>) => {
    let product = await request.postData("create_payment", data);
    return product;
}

//Inserts one specific product
export const checkOrderPayment = async (orderId) => {
    let product = await request.insertRow("check_order", orderId);
    return product;
}