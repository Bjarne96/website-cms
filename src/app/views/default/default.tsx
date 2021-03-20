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
        return <div className="outerArticleContainer">
            <div className="centeredArticleContainer">
                <div className="tableCellDynamic" dangerouslySetInnerHTML={{ __html: this.props.content }} />
            </div>
        </div>
    }
}
export default Default;