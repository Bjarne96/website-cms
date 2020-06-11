import * as React from 'react';
import './displayProperties.css';
import { Spinner } from 'react-bootstrap';
interface IProps {
    data: Array<Array<String>>;
}

interface IState {
    loading: boolean;
}

export class DisplayProperties extends React.Component <IProps, IState>{
    
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }
    componentDidMount() {
        this.setState({loading: false})
    }

    render() {
        if(this.state.loading) return <Spinner animation="grow" />
        if(!this.props.data.length) return "";
        return <div key="properties" >{this.props.data.map((category, index) => {
            return <ul key={category+index.toString()} className="noMargin">
                <li>{category[0]}</li>
                <ul className="noMargin">
                    {category.length > 1 ? <li>
                    {category.map((prop, key) => {
                        if(key === 0) return;
                        if(key < category.length-1) prop = prop+"/ "
                        return <span key={prop+key.toString()} >{prop}</span>
                    })}</li>: ""}
                </ul>
            </ul>
        })} </div>
    }
}

export default DisplayProperties;

