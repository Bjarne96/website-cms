import * as React from 'react';
import './fullscreenScroller.css';
import * as styles from './fullscreenScrollerStyles';
import * as DisplayArticles from '../displayArticle';
import { INavArray } from '../../interfaces/componentInterfaces';
import { handleScrollEvent, handleSetListeners, handleInitalScroll } from '../../handler/scrollHandler';
import autobind from 'autobind-decorator';
import { Link, animateScroll } from "react-scroll";
interface IFullcreenScrollerProps {
    componentStructure: any;
    navs: INavArray;
}

interface IFullcreenScrollerState {
    activeView: number;
    loading: boolean;
}

var handler = document.body;
var delay = false;

export class FullscreenScroller extends React.Component<IFullcreenScrollerProps, IFullcreenScrollerState> {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            activeView: 1
        }
    }

    async componentDidMount() {
        //mounting control
        this._isMounted = true;
        //sets listeners for scrolling
        handleSetListeners(handler, this.handleScroll);
        //gets active view from router
        let newActiveView = handleInitalScroll();
        console.log("execute scroll");
        //sets state
        await this.setState({ activeView: newActiveView, loading: false })
    }

    componentWillUnmount() {
        handleSetListeners(handler, this.handleScroll, false);
        this._isMounted = false;
    }

    @autobind
    async handleScroll(event, touch: boolean) {
        //debounce with 1 sec
        if (delay) return;
        delay = true;
        setTimeout(() => { delay = false; }, 500)
        //scrolling by wheel event
        if (!this._isMounted) return;
        let newView = await handleScrollEvent(this.state.activeView, this.props.navs, event, touch);
        this.scrollComponent(newView);
    }

    @autobind
    scrollComponent(activeView) {
        this.setState({ activeView: activeView })
        //let route: string = "/1"+activeView
        //pushHistory(route)
    }


    render() {
        //checks for undefined componentstructure  - todo exception
        //if(this.state.loading) return<Spinner animation="grow" />
        if (this.props.componentStructure != undefined) {
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
                    duration={1000}>
                </Link>
            })}</div>
            //maps componentstrcuture into components
            return (
                <div className="containerx">
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
                                className={"test" + (index == 0 ? " xfirst" : "")}
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