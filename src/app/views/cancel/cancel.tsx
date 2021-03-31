import * as React from 'react';
import { Icon } from 'semantic-ui-react';
import './cancel.css';

interface IProps {
}

interface IState {
}

export default class Cancel extends React.Component<IProps, IState>{

    render() {
        return <div className="cancel-outerframe">
            <div className="cancel-container">
                <div className="cancel-headframe">
                    <h1 className="cancel-title">Schade, dass es nicht geklappt hat.</h1>
                    <Icon className="cancel-btn btn cancel-btn" name='cancel' size="big" />
                </div>
                <p className="cancel-text">
                    Aber bestimmt möchtest du trotzdem mehr über Nachhaltigkeit<br />
                    unserer Decken Erfahren "Click"
                </p>
            </div>
        </div>
    }
}