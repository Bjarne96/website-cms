import * as React from 'react';
import './displayWidePicture.css';
import { IArticle } from '../../../../schemas';

interface IProps {
    component: IArticle;
}

export class DisplayWidePicture extends React.Component<IProps, any> {

    render() {
        return <div>
            <div className="titleBox" dangerouslySetInnerHTML={{ __html: this.props.component.content }} />
            {/* <img width="100%"src={this.props.component.pictures[0].path} /> */}
            <img className="imageWide" src={this.props.component.pictures[0].path} />
        </div>;
    }
}