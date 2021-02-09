import * as React from 'react';
import './displaySet.css';
import { IContent } from '../../../../schemas';

interface IProps {
    component: Array<IContent>;
    isMobile: boolean;
}

export class DisplaySet extends React.Component<IProps, any> {

    clickme = (url: string) => {
        console.log("url", url)
    }

    render() {
        if (this.props.component == undefined) return <p>error</p>;
        let cards = this.props.component.map((set, index) => {
            if (index == 0 || set.content.pictures.length == 0) return;
            return <div
                className="card-container"
                key={index + "cardcontainer"}
                onClick={() => this.clickme(set.content.url)}
            >
                {/* <img className="card-image" src={set.content.pictures[0].path} /> */}
                {this.props.isMobile ?
                    <img className="card-image" src={"https://s3.eu-central-1.amazonaws.com/files.tiefschlafen.de/public/cardportrait.jpg"} />
                    :
                    <img className="card-image" src={"https://s3.eu-central-1.amazonaws.com/files.tiefschlafen.de/public/cardwidescreen.jpg"} />
                }
                <div className="card-titleframe">
                    <div className="card-title">{set.content.title}</div>
                </div>
            </div>;
        });
        return <div className="card-outerframe">
            <div className="card-parent">
                {cards}
            </div>
        </div>
    }
}