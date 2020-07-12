import * as React from 'react';
import autobind from "autobind-decorator";
import './default.css';
import { Container, Row, Col } from 'react-bootstrap';

interface IProps {
    content: string;
}

export class Default extends React.Component<IProps, {}>{

    constructor(props) {
        super(props);
    }

    render() {
        return <Container className="marginTopHeader">
            <Row>
                <Col
                    lg={{ span: 3, offset: 3 }}
                    md={{ span: 3, offset: 3 }}
                    sm={{ span: 3, offset: 3 }}
                >
                    <div className="tableCellDynamic" dangerouslySetInnerHTML={{ __html: this.props.content }} />
                </Col>
            </Row>
        </Container>;
    }

    @autobind
    default() {
        //do something
    }
}
export default Default;