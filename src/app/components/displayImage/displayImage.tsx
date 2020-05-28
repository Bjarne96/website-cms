import * as React from 'react';
import './displayImage.css';
import { Loader } from 'semantic-ui-react';
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
        return <Loader active/>
    }
}
export default DisplayImage;