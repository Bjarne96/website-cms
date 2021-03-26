import { IProductSelected } from "../../schemas";

//removes Warenkorb from local Storage
export const updateWarenkorb = (warenkorb: Array<IProductSelected>) => {
    localStorage.setItem("warenkorb", JSON.stringify(warenkorb));
};

//removes Warenkorb from local Storage
export const deleteWarenkorb = () => {
    localStorage.removeItem("warenkorb");
};

//removes Warenkorb from local Storage
export const getWarenkorb = () => {
    let warenkorb = localStorage.getItem("warenkorb");
    if (warenkorb == undefined) return [];
    return JSON.parse(warenkorb);
};

//later
export const addApprovalUrl = (payment: any) => {

};

//later
export const addOrderId = (payment: any) => {

};

//later
export const removeApprovalUrl = (paymentId: string) => {

};