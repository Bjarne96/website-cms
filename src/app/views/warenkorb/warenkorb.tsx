import * as React from 'react';
import { Icon } from 'semantic-ui-react';
import { IProductSelected } from '../../../schemas';
import './warenkorb.css';

interface IProps {
    //item: IProductSelected;
}

interface IState {
    items: Array<IProductSelected>;
}

const warenkorbdaten: Array<any> = [{
    properties: [
        [
            {
                "name": "Größe",
                "id": 0
            },
            {
                "name": "XXL - 200 x 180",
                "id": 1
            },
            {
                "name": "XL - 180 x 180",
                "id": 2
            },
            {
                "name": "L - 140 x 180",
                "id": 3
            }
        ],
        [
            {
                "name": "Stoff",
                "id": 0
            },
            {
                "name": "Seide",
                "id": 1
            },
            {
                "name": "Hanf",
                "id": 2
            },
            {
                "name": "Satin",
                "id": 3
            }
        ]
    ],
    _id: "604bae657b0a29333cf72001",
    name: "Schurwolldecke",
    variant: {
        "pictures": [
            "https://s3.eu-central-1.amazonaws.com/files.tiefschlafen.de/public/products/product+pictures/pic2.jpg",
            "https://s3.eu-central-1.amazonaws.com/files.tiefschlafen.de/public/products/product+pictures/pic1.jpg",
            "https://s3.eu-central-1.amazonaws.com/files.tiefschlafen.de/public/products/product+pictures/pic3.jpg"
        ],
        "selector_1": 1,
        "selector_2": 2,
        "description": "<p>Das ist eine Decke.12</p>",
        "price": 280.99
    },
    count: 1
},
{
    properties: [
        [
            {
                "name": "Größe",
                "id": 0
            },
            {
                "name": "XXL - 200 x 180",
                "id": 1
            },
            {
                "name": "XL - 180 x 180",
                "id": 2
            },
            {
                "name": "L - 140 x 180",
                "id": 3
            }
        ],
        [
            {
                "name": "Stoff",
                "id": 0
            },
            {
                "name": "Seide",
                "id": 1
            },
            {
                "name": "Hanf",
                "id": 2
            },
            {
                "name": "Satin",
                "id": 3
            }
        ]
    ],
    _id: "604bae6b7b0a29333cf72002",
    name: "Schurwollkissen",
    variant: {
        "pictures": [
            "https://s3.eu-central-1.amazonaws.com/files.tiefschlafen.de/public/products/product+pictures/pic1.jpg",
            "https://s3.eu-central-1.amazonaws.com/files.tiefschlafen.de/public/products/product+pictures/pic2.jpg",
            "https://s3.eu-central-1.amazonaws.com/files.tiefschlafen.de/public/products/product+pictures/pic3.jpg"
        ],
        "selector_1": 2,
        "selector_2": 3,
        "description": "<p>Das ist eine Decke.23</p>",
        "price": 289.99
    },
    count: 1
}]

export class Warenkorb extends React.Component<IProps, IState>{
    constructor(props) {
        super(props);
        this.changeCount = this.changeCount.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.numberToString = this.numberToString.bind(this);
        this.totalCalc = this.totalCalc.bind(this);
        let initalwarenkorb = [...warenkorbdaten];
        for (let i = 0; i < initalwarenkorb.length; i++) {
            let total = initalwarenkorb[i].count * initalwarenkorb[i].variant.price;
            initalwarenkorb[i].total = total;

        }
        this.state = {
            items: initalwarenkorb
        }
        console.log('this.state', this.state);
    }

    changeCount(index: number, change: number) {
        let newItems = this.state.items;
        let newCount = newItems[index].count + change;
        if (newCount <= 0) return this.removeItem(index);
        var newTotal = Math.round((newCount * newItems[index].variant.price) * 100) / 100
        newItems[index].total = newTotal;
        newItems[index].count = newCount;
        this.setState({ items: newItems });
    }
    numberToString(number: number) {
        let newString = String(number);
        var newstr = newString.replace(".", ",");
        return newstr;
    }

    totalCalc() {
        let totalAmount: number = 0;
        let totalCount: number = 0;
        for (let i = 0; i < this.state.items.length; i++) {
            let itemAmount = this.state.items[i].total;
            let itemCount = this.state.items[i].count;
            totalCount = totalCount + itemCount;
            totalAmount = totalAmount + itemAmount
        }
        return {
            amount: totalAmount,
            count: totalCount
        };
    }

    removeItem(index: number) {
        let newItems = this.state.items;
        newItems.splice(index, 1)
        this.setState({ items: newItems });
    }

    addItem(itemNumber: number) {
        let newItem = warenkorbdaten[itemNumber];
        for (let i = 0; i < this.state.items.length; i++) {
            const item = this.state.items[i];
            if (
                item.variant.selector_1 == newItem.variant.selector_1
                && item.variant.selector_2 == newItem.variant.selector_2
            ) {
                this.changeCount(i, 1);
                return
            }
        }
        let newItems = this.state.items;
        newItems.push(newItem);
        this.setState({ items: newItems })
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
                    <h3 className="h3roduct-name">
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
                                    return <><span key={prop.name + selector} className="">{prop.name}</span><br key={"br" + prop.name + selector} /></>
                                }
                            })
                        })}
                    </p>
                    <p className="warenkorb-price-text">
                        <span className="warenkorb-price">Stückpreis: {this.numberToString(item.variant.price)}</span> €
                    </p>
                    <p className="warenkorb-price-text">
                        <Icon className="btn cart-btn" name='plus' size="big" onClick={() => this.changeCount(index, 1)} />
                        {item.count}
                        <Icon className="btn cart-btn" name='minus' size="big" onClick={() => this.changeCount(index, -1)} />
                    </p>
                </div>
                <div className="warenkorb-total">
                    <p>{this.numberToString(item.total)}€</p>
                </div>
            </div>;
        });
        let total = this.totalCalc();
        return <div className="warenkorb-container">
            <div className="warenkorb-list">
                {/* <div className="warenkorb-parent"> */}
                <div className="warenkorb-title">
                    <h1>Warenkorb</h1>
                </div>
                {/* </div> */}
                <div className="warenkorb-items">
                    {this.state.items.length ?
                        items
                        :
                        <p>kauf ma was</p>
                    }
                    <div className="warenkorb-parent">
                        <div className="warenkorb-total">
                            <p>Summe ({total.count} Artikel): {this.numberToString(total.amount)}€</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}
{/* <div>
                <div className="fixedtopleft" onClick={() => this.addItem(0)}>Add Item Nr.1</div>
                <div className="fixedtopleft2" onClick={() => this.addItem(1)}>Add Item Nr.2</div>
            </div> */}
export default Warenkorb;