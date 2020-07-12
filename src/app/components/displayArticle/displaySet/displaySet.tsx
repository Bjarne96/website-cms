import * as React from 'react';
import './displaySet.css';
//import { IContentArray } from '../../../../schemas';
import { IContent } from '../../../../schemas';
import { Button, Card, CardGroup, CardDeck, CardColumns, Col, Container, Row } from 'react-bootstrap';

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
    render() {
        if (this.props.component == undefined) return <p>error</p>
        let sets = this.props.component.map((set, index) => {
            if (index == 0 || set.content.pictures.length == 0) return <div key={index + "nocard"}></div>;
            return <Col key={index}>
                <Card
                    style={cardstyle}
                    key={index + "card"}
                    onClick={() => this.clickme(set.content.url)}
                >
                    <Card.Img style={imagestyle} src={set.content.pictures[0].path} />
                    <Card.Body><Card.Title>{set.content.title}</Card.Title></Card.Body>
                </Card>
            </Col>
        })
        this.props.component.map
        //let sets = <Card></Card>;      
        return <Container>
            <Row>
                {sets}
            </Row>
        </Container>;
    }
}