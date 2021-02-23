import * as React from 'react';
import './home.css';
// import FullscreenScroller from '../../components/fullscreenScroller/fullscreenScroller';
import * as DisplayArticles from './../../components/displayArticle';

interface IProps {
    componentStructure: any;
    navs: any;
}

interface IState {
}

export class Home extends React.Component<IProps, IState>{

    render() {
        return <div className="home">
            {this.props.componentStructure.map((data, index) => {
                if (data.componentType == "widescreen") {
                    return <DisplayArticles.DisplayWidePicture key={index} component={data.content} />
                } else if (data.componentType == "set") {
                    return <DisplayArticles.DisplaySet key={index} component={data.content} />
                } else if (data.componentType == "productdetail") {
                    return <DisplayArticles.DisplayDetails key={index} component={data.content} />
                }
            })}
        </div>
    }
}