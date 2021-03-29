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

//sets approvalUrl
export const addApprovalUrl = (approvalUrl: string) => {
    if (approvalUrl == undefined && approvalUrl.length) return [];
    localStorage.setItem("approvalUrl", approvalUrl);
    return;
};

//gets approvalUrl
export const getApprovalUrl = () => {
    return localStorage.getItem("approvalUrl");
};

//removes approvalUrl
export const removeApprovalUrl = (paymentId: string) => {
    localStorage.removeItem("approvalUrl");
    return;
};