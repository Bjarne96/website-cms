import * as React from 'react';
import { Icon } from 'semantic-ui-react';
import './error.css';

interface IProps {
}

interface IState {
}

export default class Cancel extends React.Component<IProps, IState>{

    render() {
        return <div className="error-outerframe">
            <div className="error-container">
                <div className="error-headframe">
                    <h1 className="error-title">Da scheint wohl ein Fehler aufgetreten zu sein.</h1>
                    <Icon className="error-btn btn error-btn" name='cancel' size="big" />
                </div>
            </div>
        </div>
    }
}