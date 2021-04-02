import * as React from 'react';
import './kasse.css';
import { getApprovalUrl } from '../../handler/localstorageHandler';
import { Loader } from 'semantic-ui-react';

interface IProps {
}

interface IState {
    loading: boolean;
}

export class Kasse extends React.Component<IProps, IState>{

    constructor(props) {
        super(props);
        this.renderPaymentWall = this.renderPaymentWall.bind(this);
        this.state = {
            loading: true
        }
    }

    async renderPaymentWall() {
        let approvalURL = await getApprovalUrl();
        //@ts-ignore
        var ppp: any = PAYPAL.apps.PPP({
            "approvalUrl": approvalURL,
            "placeholder": "ppplus",
            "mode": "sandbox"
        });
        return ppp;
    }
    async componentDidMount() {
        await setTimeout(() => {
            this.renderPaymentWall()
            this.setState({
                loading: false
            })
        }, 1000);
    }

    render() {
        return <div className="paypalplus-outerframe">
            <div className="paypalplus-container">
                {this.state.loading ? <Loader active />
                    :
                    <h1>Wähle deine Zahlungsmethode:</h1>
                }
                <div className="paypalplus-iframe" id="ppplus"></div>
            </div>
        </div>
    }
}
export default Kasse;