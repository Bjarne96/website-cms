import * as React from 'react';
import './displayWidePicture.css';
import { IArticle } from '../../../../schemas';

interface IProps {
    component: IArticle;
}

export class DisplayWidePicture extends React.Component<IProps, any> {

    render() {
        return <div className="wideContainer">
            <div className="flexitem">
                <div className="titleBox" dangerouslySetInnerHTML={{ __html: this.props.component.content }} />
                <img className="wideImage" src={this.props.component.pictures[0].path} />
            </div>
        </div>;
    }
}