import * as React from 'react';
import './displaySet.css';
import { IContent } from '../../../../schemas';

interface IProps {
    component: Array<IContent>;
}

let containerStyle = {
    width: window.innerWidth,
    height: window.innerHeight - 56
}

//dummy mobile
let mobile = false;

let mobileString = "";

export class DisplaySet extends React.Component<IProps, any> {

    clickme = (url: string) => {
        console.log("url", url)
    }

    render() {
        if (this.props.component == undefined) return <p>error</p>;
        //sets real set count
        let setCount = this.props.component.length - 1;
        //default
        let lineRange = 0;
        let columnRange = setCount / 2;
        for (let i = 0; i < setCount; i++) {
            //specifies for less than 3
            if (setCount <= 3) {
                lineRange = 1;
                columnRange = 3;
                //specifices 2 lines for 4,6,8...
            } else if (setCount >= 3 && setCount % 2 == 0) {
                lineRange = 2;
            } else {
                //Todo: proper error handling
                lineRange = 2;
            }
        };
        let rowsAndCols = [];
        for (let line = 1; line <= lineRange; line++) {
            let startColumnRange = (columnRange * (line - 1)) + 1;
            let endColumnRange = columnRange * line;
            let content = this.props.component.map((set, index) => {
                if (index == 0 || set.content.pictures.length == 0) return;
                if (index >= startColumnRange && index <= endColumnRange) {
                    return <div className="card-container" key={index + "cardcontainer"}><div
                        className="cardStyle"
                        key={index + "card"}
                        onClick={() => this.clickme(set.content.url)}
                    >
                        <img className="imageSize" src={set.content.pictures[0].path} />
                        <div className="titleSize">{set.content.title}</div>
                    </div></div>
                }
            })
            rowsAndCols.push(<div className={"card-row halfHeight " + mobileString} key={"row" + line}>{content}</div>);
        }
        return <div className="borderScaler">
            <div className="card-parent fullScale">
                {rowsAndCols}
            </div>
        </div>
    }
}