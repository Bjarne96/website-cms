import * as request from "./requestHandler"

//Gets one specific backbone
export const getBackbone = async (id: any) => {
    let backbone = await request.getRow("loadedbackbone", id);
    return backbone;
}