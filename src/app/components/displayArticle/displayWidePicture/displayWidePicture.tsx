import * as React from 'react';
import './displayWidePicture.css';
import { IArticle } from '../../../../schemas';

interface IProbs {
    component: IArticle;
}

export class DisplayWidePicture extends React.Component<IProbs, any> {

    render() {
        console.log("pictures", this.props.component);
        return<div>
            <div className="titleBox" dangerouslySetInnerHTML={{ __html:  this.props.component.content}} />
            <img width="100%"src={this.props.component.pictures[0].path} />
        </div>;
    }
}