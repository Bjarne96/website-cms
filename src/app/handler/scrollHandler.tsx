import { INavArray } from "../interfaces/componentInterfaces";
import * as $ from "jquery";

export const scrollToElem = (id: string) => {
    $("html, body").animate({
        scrollTop: $("#" + id).offset().top - 56
    }, 500);
}
let body = document.body;

export const addStopScrolling = () => {
    body.classList.add("stop-scrolling");
}

export const removeStopScrolling = () => {
    body.classList.remove("stop-scrolling");
}

//window offset / window height = how many components are scrolled down
export const analyseWindowPosition = () => {
    let activeView = (window.scrollY / (window.innerHeight - 56)) + 1;
    return activeView;
}

export const handleScrollEvent = (activeView: number, navs: INavArray, event, touch: boolean) => {
    let down = true;
    //scrolling by wheel event
    if (touch) {
        if (event == "up") down = false;
    } else if (event != undefined && event.deltaY != undefined) {
        if (event.deltaY < 0) down = false;
    }
    let newView = activeView;
    if (down) {
        //down
        if (activeView === navs.length) {
            //from bottom to top by scrolling down
            newView = 0;
        }
        newView++;
    } else {
        //up
        if (activeView === 1) {
            //case for scrolling with the top component even higher is not allowed
            return (newView);
        }
        newView--;
    }
    let arrayNumber = newView - 1
    this.scrollToElem(navs[arrayNumber].id)
    return newView;
}