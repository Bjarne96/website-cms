import * as React from 'react';
import './displaySet.css';
//import { IContentArray } from '../../../../schemas';
import { IContent } from '../../../../schemas';
import { Card, Col, Container, Row } from 'react-bootstrap';

interface IProps {
    component: Array<IContent>;
}
let widthDivider = 3.3;
let heightDivider = 3.3;

let cardstyle = {
    //width: (window.innerWidth / widthDivider)
    //height: (window.innerHeight/heightDivider)
}
let imagestyle = {
    //width: window.innerWidth / widthDivider - 2,
    //height: window.innerHeight / heightDivider
}

let containerStyle = {
    width: window.innerWidth,
    height: window.innerHeight - 56
}

//dummy mobile
let mobile = false;

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
                    let card = <Card
                        style={cardstyle}
                        key={index + "card"}
                        onClick={() => this.clickme(set.content.url)}
                    >
                        <Card.Img style={imagestyle} src={set.content.pictures[0].path} />
                        <Card.Body><Card.Title>{set.content.title}</Card.Title></Card.Body>
                    </Card>
                    if (mobile) return <Row key={"row" + index}>{card}</Row>
                    return <Col key={"col" + index}>{card}</Col>
                }
                return
            })
            if (mobile) rowsAndCols.push(<Col key={"col" + line}>{content}</Col>);
            else rowsAndCols.push(<Row key={"row" + line}>{content}</Row>);
        }
        return <div className="center-container" style={containerStyle}>
            <Container className="set-container">
                <Row>
                    {mobile ?
                        (<Row>
                            {rowsAndCols}
                        </Row>)
                        :
                        (<>{rowsAndCols}</>)
                    }
                </Row>
            </Container>
        </div>;
    }
}