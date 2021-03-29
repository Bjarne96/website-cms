import * as React from 'react';
import './paypal.css';
import { getApprovalUrl } from '../../handler/localstorageHandler';

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
        console.log('approvalURL', approvalURL);
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
        }, 100);
    }

    render() {
        return <>
            <div className="paypalplus-container" id="ppplus"></div>
        </>
    }
}
export default Kasse;