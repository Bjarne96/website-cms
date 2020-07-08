import { INavArray } from "../interfaces/componentInterfaces";
import * as Hammer from 'hammerjs';
import { animateScroll } from "react-scroll"

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

export const handleScrollEvent = (activeView: number, navs: INavArray, event, touch:boolean) => {
    //scrolling by wheel event
    let newView = activeView;
    if(touch) {
        if(event.type == "panup") {
            //down
            if(activeView === navs.length) {
                //from bottom to top by scrolling down
                newView = 0;
            }
            newView++;
        }else if(event.type == "pandown") {
            //up
            if(activeView === 1) {
                //case for scrolling with the top component even higher is not allowed
               return(newView);
           }
           newView--;
        }else {
            console.log("over type", event.type)
        }
    }else{
        if(event != undefined && event.deltaY != undefined) {
            if(event.deltaY > 0) {
                //down
                if(activeView === navs.length) {
                    //from bottom to top by scrolling down
                    newView = 0;
                }
                newView++;
            } else {
                //up
                if(activeView === 1) {
                     //case for scrolling with the top component even higher is not allowed
                    return(newView);
                }
                newView--;
            }
        }
    }
    let arrayNumber = newView-1
    if(touch) {
        //todo working
        let mutiplyer = newView-activeView;
        animateScroll.scrollTo((window.innerHeight*mutiplyer)-(56*mutiplyer))
    }else{
        document.getElementById(navs[arrayNumber].nav).click();
    }
    return newView;
}

export const handleSetListeners = (handler: any, handleScroll:any, remove?: boolean) => {
    let hammer = new Hammer(handler);
    if(remove) {
        handler.removeEventListener('scroll', (e:any) => {handleScroll(e, false)});
        handler.removeEventListener('wheel', (e:any) => {handleScroll(e, false)}, false); 
        handler.removeEventListener("", (e:any) => {handleScroll(e, false)}); // modern desktop
        handler.removeEventListener('touchmove', (e:any) => {handleScroll(e, false)}); // mobile
        handler.removeEventListener('keydown', (e:any) => {handleScroll(e, false)}, false);
        hammer.off('pan')
    } else {
        handler.addEventListener('wheel', (e:any) => {handleScroll(e, false)}, false); 
        handler.addEventListener("", (e:any) => {handleScroll(e, false)}); // modern desktop
        handler.addEventListener('touchmove', (e:any) => {handleScroll(e, false)}); // mobile
        handler.addEventListener('keydown', (e:any) => {handleScroll(e, false)}, false);
        hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });
        hammer.on("panleft panright panup pandown tap press", (event: any) => {
            handleScroll(event, true)
        });
    }
}