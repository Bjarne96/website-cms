import * as React from 'react';
import './fullscreenScroller.css';
import autobind from 'autobind-decorator';
import { pushHistory } from "../../handler/historyHandler"
import { handleSetListeners, handleScrollEvent, handleInitalScroll } from "../../handler/scrollHandler"
import * as DisplayArticles from '../displayArticle';
import { Spinner } from 'react-bootstrap';
import { INavArray } from '../../interfaces/componentInterfaces';

interface IFullcreenScrollerProps {
    componentStructure: any;
    navs:INavArray;
    activeView: number;
    setActiveView(route: string | number);
}

interface IFullcreenScrollerState {
    loading: boolean;
}

let divstyle = {
    width: window.innerWidth,
    height: window.innerHeight
}

var handler = document.body;
var delay = false;

export class FullscreenScroller extends React.Component<IFullcreenScrollerProps, IFullcreenScrollerState> {

	constructor(props) {
		super(props);
		this.state = {
            loading: true
		}
    }

	async componentDidMount() {
        //sets listeners for scrolling
        handleSetListeners(handler, this.handleScroll);
        //sets state
        await this.setState({loading: false})
    }

    @autobind
    async handleScroll(event?) {
        console.log("handlescroll")
        console.log('this.props.activeView', this.props.activeView);
        //debounce with 1 sec
        if(delay) return;
        delay = true;
        setTimeout(()=> {delay = false;}, 1000)
        //scrolling by wheel event
        let newView = await handleScrollEvent(this.props.activeView ,this.props.navs , event);
        //console.log("newactivevierw", newView)
        this.props.setActiveView(newView)
    }

	render() {
        if(this.state.loading) return <Spinner animation="grow" />
        //checks for undefined componentstructure  - todo exception
        if(this.props.componentStructure != undefined) {
            //maps componentstrcuture into components
            return (this.props.componentStructure.map((data, index) => {
                let displayComponent = <></>
                let compType = data.componentType;           
                if(compType == "widescreen"){
                    displayComponent = <DisplayArticles.DisplayWidePicture key={index} component={data.content} />
                }else if(compType == "productdetail") {
                    displayComponent = <DisplayArticles.DisplayDetails key={index} component={data.content} />
                }else if(compType == "set") {
                    displayComponent = <DisplayArticles.DisplaySet key={index} component={data.content}/>
                }
                //basic frame for each scrollable component
                return(
                    <div key={this.props.navs[index].id} className={"test" + (index == 0 ? " xfirst" : "")} style={divstyle} id={this.props.navs[index].id}>
                        {displayComponent}
                    </div>
                )
            }));
        }
    }
}
export default FullscreenScroller;