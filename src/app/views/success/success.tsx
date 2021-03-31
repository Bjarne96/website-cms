import * as React from 'react';
import { Icon } from 'semantic-ui-react';
import './success.css';

interface IProps {
}

interface IState {
}

export default class Success extends React.Component<IProps, IState>{

    render() {
        return <div className="success-outerframe">
            <div className="success-container">
                <div className="success-headframe">
                    <h1 className="success-title">Danke für deine Bestellung!</h1>
                    <Icon className="success-btn btn check-btn" name='check' size="big" />
                </div>
                <p className="success-text">
                    Wir werden sie so schnell, wie möglich bearbeiten.<br />
                    Vielleicht Interessierst du dich auch für ...
                </p>
            </div>
        </div>
    }
}