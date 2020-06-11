import { pushHistory, getHistory } from "./historyHandler"

export const handleInitalScroll = (activeView: number, event?) => {
    let body = document.querySelector('body');
    body.classList.add("stop-scrolling");
    if(getHistory() !== "/") {
        let string = getHistory();
        activeView = Number(string.slice(1,2));
    }
    return activeView;
}

export const handleScrollEvent = (activeView: number, event?) => {
    console.log("hahandleSetListenersd")
    //scrolling by wheel event
    let newView: number;
    if(event != undefined && event.deltaY != undefined) {
        if(event.deltaY > 0) {
            //down
            if(activeView === 5) return(newView = 1);
            newView = activeView+1;
        } else {
            //up
            if(activeView === 1) return(newView = 5);
            newView = activeView-1;
        }
    }
    //clicks and updates actual view
    let actualElem = document.getElementById('div'+newView+'click')
    console.log("tell me")
    actualElem.click();
    console.log("tell me")
    pushHistory(newView)
    console.log("tell me")
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