import { pushHistory, getHistory } from "./historyHandler"
import { INavArray } from "../interfaces/componentInterfaces";

export const handleInitalScroll = () => {
    let body = document.querySelector('body');
    body.classList.add("stop-scrolling");
    if(getHistory() !== "/") {
        let string = getHistory();
        return(Number(string.slice(1,2)));
    }
    return 1;
}

export const handleScrollEvent = (activeView: number, navs: INavArray, event?) => {
    //scrolling by wheel event
    let newView = activeView;
    console.log("scrollhandler", newView)
    if(event != undefined && event.deltaY != undefined) {
        if(event.deltaY > 0) {
            //down
            if(activeView === navs.length) {
                //from bottom to top by scrolling down
                console.log("case1")
                return(newView = 1);
            }
            console.log("case2")
            newView++;
        } else {
            //up
           
            if(activeView === 1) {
                console.log("case3")
                 //case for scrolling with the top component even higher is not allowed
                return(newView);
            }
            console.log("case4")
            newView--;
        }
    }
    //sets nav elements id^
    console.log('newView', newView);
    //console.log("newView-1",newView-1)
    let nav = navs[newView-1].nav;
    //clicks and updates actual view
    let actualElem = document.getElementById(nav);
    actualElem.click();
    pushHistory(newView);
    //returns actual new view
    return newView;
}

export const handleSetListeners = (handler: any, handleScroll:any, remove?: boolean) => {
    if(remove) {
        handler.removeEventListener('scroll', (e:any) => {handleScroll(e)});
        handler.removeEventListener('wheel', (e:any) => {handleScroll(e)}, false); 
        handler.removeEventListener("", (e:any) => {handleScroll(e)}); // modern desktop
        handler.removeEventListener('touchmove', (e:any) => {handleScroll(e)}); // mobile
        handler.removeEventListener('keydown', (e:any) => {handleScroll(e)}, false);
    } else {
        handler.addEventListener('wheel', (e:any) => {handleScroll(e)}, false); 
        handler.addEventListener("", (e:any) => {handleScroll(e)}); // modern desktop
        handler.addEventListener('touchmove', (e:any) => {handleScroll(e)}); // mobile
        handler.addEventListener('keydown', (e:any) => {handleScroll(e)}, false);
    }
}