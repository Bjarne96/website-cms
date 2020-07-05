import * as React from 'react';
import './fullscreenScroller.css';
import * as DisplayArticles from '../displayArticle';
import { INavArray } from '../../interfaces/componentInterfaces';

interface IFullcreenScrollerProps {
    componentStructure: any;
    navs:INavArray;
    activeView: number;
    setActiveView(route: string | number);
}

interface IFullcreenScrollerState {
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
    }

	async componentDidMount() {
        //clicks and updates actual view
        if(this.props.activeView != 1) {
            await document.getElementById(this.props.navs[this.props.activeView-1].nav).click();
        }
    }


	render() {
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