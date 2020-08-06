import * as React from 'react';
import './default.css';

interface IProps {
    content: string;
}

export class Default extends React.Component<IProps, {}>{

    constructor(props) {
        super(props);
    }

    render() {
        return <div className="marginTopHeader outerContainer">
            <div className="centeredContainer">
                <div className="tableCellDynamic" dangerouslySetInnerHTML={{ __html: this.props.content }} />
            </div>
        </div>
    }
}
export default Default;