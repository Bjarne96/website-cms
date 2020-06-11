import * as React from 'react';
import './displayImage.css';
import { Spinner } from 'react-bootstrap';
interface IProps {
    data: Array<Array<String>>;
}

interface IState {
    loading: boolean;
}

export class DisplayImage extends React.Component <{}, IState>{
    
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
        return <Spinner animation="grow" />
    }
}
export default DisplayImage;