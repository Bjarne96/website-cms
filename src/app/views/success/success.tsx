import * as React from 'react';
import './success.css';

interface IProps {
}

interface IState {
}

export default class Success extends React.Component<IProps, IState>{

    render() {
        return <div className="success">
            <h1>Thanks fpr buying</h1>
        </div>
    }
}