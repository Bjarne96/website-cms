import * as React from 'react';
import './displayWidePicture.css';
import { IArticle } from '../../../../schemas';
import { Image } from 'react-bootstrap';

interface IProps {
    component: IArticle;
}

export class DisplayWidePicture extends React.Component<IProps, any> {

    render() {
        return <div>
            <div className="titleBox" dangerouslySetInnerHTML={{ __html: this.props.component.content }} />
            {/* <img width="100%"src={this.props.component.pictures[0].path} /> */}
            <Image className="img-fluid" src={this.props.component.pictures[0].path} />
        </div>;
    }
}