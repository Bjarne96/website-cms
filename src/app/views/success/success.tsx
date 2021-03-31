import * as React from 'react';
import { Icon } from 'semantic-ui-react';
import './success.css';
import { executePayment } from "../../handler/paymentRequests"

interface IProps {
}

interface IState {
}

export default class Success extends React.Component<IProps, IState>{

    async componentDidMount() {
        //paypal execute request
        let paramters = JSON.parse(
            '{"' + decodeURI(window.location.search)
                .replace('?', '')
                .replace(/"/g, '\\"')
                .replace(/&/g, '","')
                .replace(/=/g, '":"')
            + '"}');
        let response = await executePayment(paramters);
        console.log('response', response);
    }

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