import * as React from 'react';
import './displaySet.css';
//import { IContentArray } from '../../../../schemas';
import { IContent } from '../../../../schemas';
import { Button, Card, CardGroup, CardDeck, CardColumns, Col, Container, Row } from 'react-bootstrap';
import autobind from 'autobind-decorator';

interface IProps {
    component: Array<IContent>;
}
let widthDivider = 3.3;
let heightDivider = 3.3;

let cardstyle = {
    width: (window.innerWidth / widthDivider)
    //height: (window.innerHeight/heightDivider)
}
let imagestyle = {
    width: window.innerWidth / widthDivider - 2,
    height: window.innerHeight / heightDivider
}

export class DisplaySet extends React.Component<IProps, any> {

    clickme = (url: string) => {
        console.log("url", url)
    }

    renderMobileLines = (startColumnRange, endColumnRange, line) => {
        return <Col key={"col" + line}>
            {this.props.component.map((set, index) => {
                if (index == 0 || set.content.pictures.length == 0) return;
                if (index >= startColumnRange && index <= endColumnRange) {
                    return <Row key={"row" + index}>
                        <Card
                            style={cardstyle}
                            key={index + "card"}
                            onClick={() => this.clickme(set.content.url)}
                        >
                            <Card.Img style={imagestyle} src={set.content.pictures[0].path} />
                            <Card.Body><Card.Title>{set.content.title}</Card.Title></Card.Body>
                        </Card>
                    </Row>
                }
                return
            })}
        </Col>
    }

    renderDesktopLines = (startColumnRange, endColumnRange, line) => {
        return <Row key={"row" + line}>
            {this.props.component.map((set, index) => {
                if (index == 0 || set.content.pictures.length == 0) return;
                if (index >= startColumnRange && index <= endColumnRange) {
                    return <Col key={"col" + index}>
                        <Card
                            style={cardstyle}
                            key={index + "card"}
                            onClick={() => this.clickme(set.content.url)}
                        >
                            <Card.Img style={imagestyle} src={set.content.pictures[0].path} />
                            <Card.Body><Card.Title>{set.content.title}</Card.Title></Card.Body>
                        </Card>
                    </Col>
                }
                return
            })}
        </Row>
    }

    render() {
        if (this.props.component == undefined) return <p>error</p>;
        //sets real set count
        let setCount = this.props.component.length - 1;
        //dummy mobile
        let mobile = false;
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
        //
        let rowsAndCols = [];
        for (let line = 1; line <= lineRange; line++) {
            let startColumnRange = (columnRange * (line - 1)) + 1;
            let endColumnRange = columnRange * line;
            if (mobile) {
                rowsAndCols.push(this.renderMobileLines(startColumnRange, endColumnRange, line))
            } else {
                rowsAndCols.push(this.renderDesktopLines(startColumnRange, endColumnRange, line))
            }
        }
        return <Container>
            {mobile ?
                (<Row>
                    {rowsAndCols}
                </Row>)
                :
                (<>{rowsAndCols}</>)
            }

        </Container>;
    }
}