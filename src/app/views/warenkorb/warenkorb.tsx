import * as React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { IProductSelected } from '../../../schemas';
import { addApprovalUrl, getWarenkorb, updateWarenkorb } from '../../handler/localstorageHandler';
import { createPayment } from '../../handler/paymentRequests';
import './warenkorb.css';

interface IProps {
    warenkorbChange();
}

interface IState {
    items: Array<IProductSelected>;
}

export class Warenkorb extends React.Component<IProps, IState>{

    constructor(props) {
        super(props);
        this.changeCount = this.changeCount.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.numberToString = this.numberToString.bind(this);
        this.updateItems = this.updateItems.bind(this);
        this.totalCalc = this.totalCalc.bind(this);
        let initalwarenkorb = getWarenkorb();
        for (let i = 0; i < initalwarenkorb.length; i++) {
            let total = initalwarenkorb[i].count * initalwarenkorb[i].variant.price;
            initalwarenkorb[i].total = total;
        }
        this.state = {
            items: initalwarenkorb
        }
    }

    changeCount(index: number, change: number) {
        let newItems = this.state.items;
        let newCount = newItems[index].count + change;
        if (newCount <= 0) return;
        var newTotal = Math.round((newCount * newItems[index].variant.price) * 100) / 100;
        if (String(newTotal).length > 8) alert('ERROR' + String(newTotal));
        newItems[index].total = newTotal;
        newItems[index].count = newCount;
        this.updateItems(newItems);
    }

    async updateItems(newItems: Array<IProductSelected>) {
        await updateWarenkorb(newItems);
        await this.setState({ items: newItems });
        await this.props.warenkorbChange();
    }

    numberToString(number: number) {
        let newString = number.toFixed(2);
        var newstr = newString.replace(".", ",");
        return newstr;
    }

    removeItem(index: number) {
        let newItems = this.state.items;
        newItems.splice(index, 1)
        this.updateItems(newItems);
    }

    async checkout() {
        console.log('checkout');
        //create payment request
        let response = await createPayment(this.state.items);
        let approvalUrl = response.result;
        //update localstorage
        addApprovalUrl(approvalUrl);
        //redirect to paymentwall view
        document.getElementById("/kasse").click();
    }

    totalCalc() {
        let totalAmount: number = 0;
        let totalCount: number = 0;
        for (let i = 0; i < this.state.items.length; i++) {
            let itemAmount = this.state.items[i].total;
            let itemCount = this.state.items[i].count;
            totalCount = totalCount + itemCount;
            totalAmount = Math.round((totalAmount + itemAmount) * 100) / 100;
        }
        return {
            amount: totalAmount,
            count: totalCount
        };
    }

    render() {
        let items = this.state.items.map((item, index) => {
            return <div
                className="warenkorb-parent"
                key={index + "warenkorb-parent"}
            >
                <img
                    className="warenkorb-image"
                    src={item.variant.pictures[0]}
                />
                <div className="warenkorb-textframe">
                    <h3 className="product-name">
                        {item.name}
                    </h3>
                    <p className="warenkorb-specification">
                        {item.properties.map((propArray, index) => {
                            let selector = item.variant["selector_" + (index + 1)];
                            return propArray.map((prop, i) => {
                                if (prop.id == 0) {
                                    return <span key={prop.name + selector}>{prop.name}:&nbsp;</span>
                                }
                                if (prop.id == selector) {
                                    return <span key={prop.name + selector} className="">{prop.name}<br key={"br" + prop.name + selector} /></span>
                                }
                            })
                        })}
                    </p>
                    <p className="warenkorb-price-text">
                        <span className="warenkorb-price">{this.numberToString(item.variant.price)}</span> €
                        <Icon className="btn cart-btn" name='plus' size="big" onClick={() => this.changeCount(index, 1)} />
                        {item.count}
                        <Icon className="btn cart-btn" name='minus' size="big" onClick={() => this.changeCount(index, -1)} />
                    </p>
                    <Button className="warekorb-btn" primary onClick={() => this.removeItem(index)}>Entfernen</Button>
                </div>
                <div className="warenkorb-total">
                    <p>{this.numberToString(item.total)}€</p>
                </div>
            </div>;
        });
        let total = this.totalCalc();
        if (!this.state.items.length) {
            return <div className="warenkorb-container">
                <div className="warenkorb-placeholder"><p>Dein Warenkorb ist noch leer :)</p></div>
            </div>
        }
        return <div className="warenkorb-container">
            <div className="warenkorb-list">
                {/* <div className="warenkorb-parent"> */}
                <div className="warenkorb-title">
                    <h1>Warenkorb</h1>
                    <p className="marginLeft">Gesamt</p>
                </div>
                {/* </div> */}
                <div className="warenkorb-items">
                    {items}
                    <div className="warenkorb-sum">
                        <p><strong>Summe ({total.count} Artikel): {this.numberToString(total.amount)}€</strong></p>
                        <Button className="warekorb-btn" primary onClick={() => this.checkout()}>Zur Kasse</Button>
                    </div>
                </div>
            </div>
        </div>
    }
}
export default Warenkorb;