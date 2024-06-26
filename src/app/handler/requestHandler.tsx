import { getJWT, saveJWT, removeJWT } from './JWTHandler';
import * as config from "./../../../config";

//request
let Request = async (path: string, fetchType: "GET" | "POST" | "PUT" | "DELETE", data) => {
    let header = { "Content-Type": "application/json" }
    //Sets url
    let url = config.api + path;

    //let requestOptions
    let requestOptions = {
        headers: header,
        method: fetchType
    }
    if (fetchType == "POST" || fetchType == "PUT") {
        requestOptions["body"] = JSON.stringify(data);
    }

    //Sends Request
    let response = await fetch(url, requestOptions);

    const json: any = await response.json();
    return json;

}

//Posts data to API
export const postData = async (path: string, data) => {
    let json = await Request(path, "POST", data);
    return json;
};

//Gets all data from a table
export const getData = async (path: string) => {
    let json = await Request(path, "GET", {});
    return json;
};

//Gets a specific dataset
export const getRow = async (path: string, id: string) => {
    let full_path = path + "/" + id;
    let json = await Request(full_path, "GET", {});
    return json;
};

//Inserts a specific dataset
export const insertRow = async (path: string, data: any) => {
    let json = await Request(path, "PUT", data);
    return json;
};

//Updates a specific dataset
export const updateRow = async (path: string, id: string, data: any) => {
    let full_path = path + "/" + id;
    let json = await Request(full_path, "POST", data);
    return json;
};

//Deletes a specific dataset
export const deleteRow = async (path: string, id: string) => {
    let full_path = path + "/" + id;
    let json = await Request(full_path, "DELETE", {});
    return json;
};


//Loggs in user and returns the user or error
export const loginUser = async (email: string, password) => {

    //Sets values into body
    let body: any = { email: email, password: password };

    //Posts body
    let json = await Request("login", "POST", body);

    return json;
};

export default getRow;