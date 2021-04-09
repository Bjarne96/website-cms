import { IProductSelected } from "../../schemas";

//updates Warenkorb in local Storage
export const updateWarenkorb = (warenkorb: Array<IProductSelected>) => {
    localStorage.setItem("warenkorb", JSON.stringify(warenkorb));
};

//adds Warenkorbitem to Warenkorb in local Storage
export const updateWarenkorbItem = (warenkorbitem: IProductSelected) => {
    let warenkorb = getWarenkorb();
    let changeCount = false;
    if (warenkorb.length) {
        for (let i = 0; i < warenkorb.length; i++) {
            const item = warenkorb[i];
            if (
                item.variant.selector_1 == warenkorbitem.variant.selector_1
                && item.variant.selector_2 == warenkorbitem.variant.selector_2
            ) {
                let newCount = item.count + 1;
                var newTotal = Math.round((newCount * warenkorb[i].variant.price) * 100) / 100;
                warenkorb[i].total = newTotal;
                warenkorb[i].count = warenkorb[i].count + 1;
                changeCount = true;
            }
        }

    }
    if (!changeCount) {
        warenkorb.push(warenkorbitem)
    }
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
export const removeApprovalUrl = () => {
    localStorage.removeItem("approvalUrl");
    return;
};