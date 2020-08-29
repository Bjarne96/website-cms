import * as React from 'react';
import './fullscreenScroller.css';
import * as DisplayArticles from '../displayArticle';
import { INavArray } from '../../interfaces/componentInterfaces';
import { handleScrollEvent, removeStopScrolling, addStopScrolling, analyseWindowPosition, scrollToElem } from '../../handler/scrollHandler';
import autobind from 'autobind-decorator';
import { Link } from "react-scroll";
import { Loader } from 'semantic-ui-react';

interface IFullcreenScrollerProps {
    componentStructure: any;
    navs: INavArray;
}

interface IFullcreenScrollerState {
    activeView: number;
}
//globalset

//delay for debounce
var delay = false;
//Handler declaration
var scrollHandler;
var touchmoveHandler;
var touchstartHandler;
//Coordinat for touch reference
var touchX = 999;
var touchY = 999;
let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;


export class FullscreenScroller extends React.Component<IFullcreenScrollerProps, IFullcreenScrollerState> {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            activeView: 1
        }
    }

    // this.useEffect(() => console.log(weather), [weather]);

    async componentDidMount() {
        //sets function referneces for listeners
        scrollHandler = this.handleScroll.bind(this);
        touchmoveHandler = this.touchmoveHandler.bind(this);
        touchstartHandler = this.touchstartHandler.bind(this);
        //sets listeners
        this.handleSetListeners();
        //gets active view from router
        addStopScrolling();
        let newActiveView = analyseWindowPosition();
        console.log("newActiveView", newActiveView)
        scrollToElem(this.props.navs[(newActiveView - 1)].id)
        //sets state
        await this.setState({ activeView: newActiveView })
    }

    componentWillUnmount() {
        removeStopScrolling();
        //remove listeners
        this.handleSetListeners(true);
    }

    @autobind
    touchstartHandler(event) {
        touchY = event.touches[0].clientY;
        touchX = event.touches[0].clientX;
    }

    @autobind
    touchmoveHandler(event) {
        let activeY = event.touches[0].clientY;
        // let acitveX = e.touches[0].clientX;
        if (touchX === 999 && touchY === 999) return;
        if (activeY > touchY + 20) {
            this.handleScroll("up", true)
        }
        if (activeY < touchY - 20) {
            this.handleScroll("down", true)
        }
    }

    @autobind
    handleSetListeners(remove?: boolean) {
        if (remove) {
            window.removeEventListener('wheel', scrollHandler, false)
            window.removeEventListener('touchstart', touchstartHandler, false)
            window.removeEventListener('touchmove', touchmoveHandler, false);
        } else {
            window.addEventListener('wheel', scrollHandler, false)
            window.addEventListener('touchstart', touchstartHandler, false)
            window.addEventListener('touchmove', touchmoveHandler, false);
        }
    }

    @autobind
    async handleScroll(event, touch?: boolean) {
        //debounce with 1 sec
        if (delay) return;
        delay = true;
        setTimeout(() => { delay = false; }, 200)
        //scrolling by wheel event
        let newView = await handleScrollEvent(this.state.activeView, this.props.navs, event, touch);
        this.scrollComponent(newView);
    }

    //Todo: Route scrolling
    @autobind
    scrollComponent(activeView) {
        this.setState({ activeView: activeView })
        //pushHistory(newRoute)
    }

    @autobind
    renderScrollNav() {
        let scrollIndicators = this.props.navs.map((obj, key) => {
            let className = "scrollNavItem"
            // handles active class
            if (this.state.activeView == key + 1) className = className + " scrollNavItemActive"
            //link for clicking the scrolling / indexing
            return <Link
                key={obj.nav}
                className={className}
                onClick={() => { this.scrollComponent(key + 1) }}
                to={obj.id}
                id={obj.nav}
                spy={true}
                smooth={true}
                offset={isMobile ? 0 : -56}
                duration={500}>
            </Link>
        })

        let upScrollAngle = <a><i className="angleIcon angleupIcon" /></a>;
        let downScrollAngle = <a><i className="angleIcon angledownIcon" /></a>;
        if (this.state.activeView != 1) {
            upScrollAngle = <Link className={"angleLink"}
                onClick={() => { this.scrollComponent(this.state.activeView - 1) }}
                to={this.props.navs[this.state.activeView - 2].id}
                id={this.props.navs[this.state.activeView - 2].nav}
                spy={true}
                smooth={true}
                offset={isMobile ? 0 : -56}
                duration={500}
            >
                <i className="angleIcon angleupIcon angleHover" />
            </Link>
        }
        if (this.state.activeView != this.props.navs.length) {
            downScrollAngle = <Link className={"angleLink"}
                onClick={() => { this.scrollComponent(this.state.activeView + 1) }}
                to={this.props.navs[this.state.activeView].id}
                id={this.props.navs[this.state.activeView].nav}
                spy={true}
                smooth={true}
                offset={isMobile ? 0 : -56}
                duration={500}
            >
                <i className="angleIcon angledownIcon angleHover" />
            </Link>
        }
        let scrollNavComp = <div className="scrollNav">
            {upScrollAngle}
            {scrollIndicators}
            {downScrollAngle}
        </div>;
        return scrollNavComp;
    }


    render() {
        //checks for undefined componentstructure  - todo exception
        // if (this.state.loading) return <Loader active />
        //builds navs
        if (this.props.navs != undefined) {
            let scrollNav = <></>;
            if (!isMobile) scrollNav = this.renderScrollNav();
            //maps componentstructure
            return (
                <div id="scrollComponent">
                    {scrollNav}
                    {this.props.componentStructure.map((data, index) => {
                        let displayComponent = <></>
                        let compType = data.componentType;
                        if (compType == "widescreen") {
                            displayComponent = <DisplayArticles.DisplayWidePicture key={index} component={data.content} />
                        } else if (compType == "productdetail") {
                            displayComponent = <DisplayArticles.DisplayDetails key={index} component={data.content} />
                        } else if (compType == "set") {
                            displayComponent = <DisplayArticles.DisplaySet key={index} component={data.content} />
                        }
                        //basic frame for each scrollable component
                        return (
                            <div
                                key={this.props.navs[index].id}
                                className={"allScrollingContainer" + (index == 0 ? " firstScrollingContainer" : "")}
                                id={this.props.navs[index].id}

                            >
                                {displayComponent}
                            </div>
                        )
                    })}
                </div>
            );
        }
    }
}
export default FullscreenScroller;