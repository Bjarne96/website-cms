import * as React from 'react';
import './displaySet.css';

interface IProps {
    component: Array<any>;
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
                <div className="card-image-wrapper">
                    {/* <img className="card-image" src={set.content.pictures[0].path} /> */}
                    <img
                        className="card-image"
                        src={"https://s3.eu-central-1.amazonaws.com/files.tiefschlafen.de/public/widescreendummy.jpg"}
                    />
                </div>
                <div className="card-titleframe">
                    <p className="card-title">{set.content.title}</p>
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