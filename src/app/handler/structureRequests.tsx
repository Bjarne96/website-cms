import * as request from "./requestHandler"
//import { Types } from "mongoose";
import { IStructure } from "./../../schemas";

//article specific requests

//Gets all articles
export const getStructures = async () => {
    let structures: Array<IStructure> = await request.getData("structures");;
    return structures;
}

//Gets one specific article
export const getStructure = async (id: any) => {
    let structure = await request.getRow("structure", id);
    return structure;
}