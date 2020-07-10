import { INavArray } from "../interfaces/componentInterfaces";
var $ = require("jquery");

export const handleInitalScroll = () => {
    let body = document.querySelector('body');
    body.classList.add("stop-scrolling");
    //future todo
    /*if(getHistory() !== "/") {
        let string = getHistory();
        return(Number(string.slice(1,2)));
    }*/
    return 1;
}

export const handleScrollEvent = (activeView: number, navs: INavArray, event, touch: boolean) => {
    console.log("test")
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
    $("html, body").animate({
        scrollTop: $("#" + navs[arrayNumber].id).offset().top - 56
    }, 1000);
    return newView;
}

export const handleSetListeners = (handler: any, handleScroll: any, remove?: boolean) => {
    if (remove) {
        handler.removeEventListener('scroll', (e: any) => { handleScroll(e, false) });
        handler.removeEventListener('wheel', (e: any) => { handleScroll(e, false) }, false);
        handler.removeEventListener("", (e: any) => { handleScroll(e, false) }); // modern desktop
        handler.removeEventListener('touchmove', (e: any) => { console.log("aha"); handleScroll(e, false) }); // mobile
        handler.removeEventListener('keydown', (e: any) => { handleScroll(e, false) }, false);
        handler.removeEventListener('touchstart', (e: any) => { }, false);
    } else {
        let x = 999;
        let y = 999;
        handler.addEventListener('wheel', (e: any) => { handleScroll(e, false) }, false);
        handler.addEventListener("", (e: any) => { handleScroll(e, false) }); // modern desktop
        handler.addEventListener('keydown', (e: any) => { handleScroll(e, false) }, false);
        handler.addEventListener('touchstart', (e: any) => {
            y = e.touches[0].clientY;
            x = e.touches[0].clientX;
        }, false);
        handler.addEventListener('touchmove', (e: any) => {
            let activeY = e.touches[0].clientY;
            // let acitveX = e.touches[0].clientX;
            if (x === 999 && y === 999) return;
            if (activeY > y + 50) {
                handleScroll("up", true)
            }
            if (activeY < y - 50) {
                handleScroll("down", true)
            }
        });
    }
}