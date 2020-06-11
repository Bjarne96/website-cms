import * as React from 'react';
import './displaySet.css';
//import { IContentArray } from '../../../../schemas';
import { IContent } from '../../../../schemas';
import { Button } from 'react-bootstrap';

interface IProps {
    component: Array<IContent>;
}
let widthDivider = 3.3;
let heightDivider = 2.7;

let cardstyle = {
    width: (window.innerWidth/widthDivider),
    height: (window.innerHeight/heightDivider)+50
}
let imagestyle = {
    width: window.innerWidth/widthDivider,
    height: window.innerHeight/heightDivider
}

export class DisplaySet extends React.Component<IProps, any> {

    clickme = (url: string) => {
        console.log("url", url)
    }
    render() {
        if(this.props.component == undefined) return <p>error</p>
        console.log('this.props.component', this.props.component);
        let sets = this.props.component.map((set, index)=> {
            if(index == 0 || set.content.pictures.length == 0) return <></>
            return<></>/*<Card
                style={cardstyle}
                raised
                key={set.content._id}
                onClick={() => this.clickme(set.content.url)}
            >
                <Image style={imagestyle} src={set.content.pictures[0].path} />
                <Card.Content><Card.Header>{set.content.title}</Card.Header></Card.Content>
            </Card>*/
        })       
        return<div className="setFrame">{/*<Card.Group itemsPerRow={3}>{sets}</Card.Group>*/}</div>;
    }
}