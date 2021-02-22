import * as React from 'react';
import './displayWidePicture.css';
import { IArticle } from '../../../../schemas';

interface IProps {
    component: IArticle;
}

export class DisplayWidePicture extends React.Component<IProps, any> {

    render() {
        return <div className="wideContainer">
            <div className="textBox">
                <div className="headline" dangerouslySetInnerHTML={{ __html: this.props.component.content }} />
                <div className="more-btn">Entdecken</div>
            </div>
            <div className="wideImageWrapper">
                <img className="wideImage" src={"https://s3.eu-central-1.amazonaws.com/files.tiefschlafen.de/public/widescreendummy.jpg"} />
            </div>
        </div>;
    }
}