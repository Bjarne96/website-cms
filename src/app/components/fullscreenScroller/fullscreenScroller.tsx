import * as React from 'react';
import './fullscreenScroller.css';
import * as styles from './fullscreenScrollerStyles';
import * as DisplayArticles from '../displayArticle';
import { INavArray } from '../../interfaces/componentInterfaces';
import { handleScrollEvent, handleInitalScroll, scrollToElem } from '../../handler/scrollHandler';
import autobind from 'autobind-decorator';
import { Link } from "react-scroll";
import { Spinner } from 'react-bootstrap';

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
        let newActiveView = handleInitalScroll();
        scrollToElem(this.props.navs[(newActiveView - 1)].id)
        //sets state
        await this.setState({ activeView: newActiveView })
    }

    componentWillUnmount() {
        //remove listeners
        this.handleSetListeners(true);
    }

    @autobind
    touchstartHandler(event) {
        console.log("touchstartHandler")
        touchY = event.touches[0].clientY;
        touchX = event.touches[0].clientX;
    }

    @autobind
    touchmoveHandler(event) {
        console.log("touchmoveHandler")
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


    render() {
        //checks for undefined componentstructure  - todo exception
        // if (this.state.loading) return <Spinner animation="grow" />
        //builds navs
        if (this.props.navs != undefined) {
            let scrollNav;
            scrollNav = <></>
            scrollNav = <div className="scrollNav" style={styles.sidebarNavStyle}>{this.props.navs.map((obj, key) => {
                let className = "scrollNavItem"
                // handles active class
                if (this.state.activeView == key + 1) className = className + " scrollNavItemActive"
                //link for clicking the scrolling / indexing
                return <Link
                    key={obj.nav}
                    className={className}
                    style={styles.sidebarNavItemStyle}
                    onClick={() => { this.scrollComponent(key + 1) }}
                    to={obj.id}
                    id={obj.nav}
                    spy={true}
                    smooth={true}
                    offset={-56}
                    duration={500}>
                </Link>
            })}</div>
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
                                style={styles.divstyle}
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