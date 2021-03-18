import * as React from 'react';
import './paypal.css';

interface IProps {
}

interface IState {
    loading: boolean;
}

export class Paypal extends React.Component<IProps, IState>{

    constructor(props) {
        super(props);
        this.renderPaymentWall = this.renderPaymentWall.bind(this);
        this.state = {
            loading: true
        }
    }

    renderPaymentWall() {
        //@ts-ignore
        var ppp: any = PAYPAL.apps.PPP({
            "approvalUrl": "https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-3BA43676YS411092J",
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
export default Paypal;