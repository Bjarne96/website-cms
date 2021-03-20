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
        this.state = {
            items: warenkorbdaten
        }
    }

    changeCount(index: number, change: number) {
        let newItems = this.state.items;
        newItems[index].count = newItems[index].count + change;
        this.setState({ items: newItems })
    }

    addItem(itemNumber: number) {
        let newItem = warenkorbdaten[itemNumber]
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
        console.log('render');
        console.log('this.state.items', this.state.items);
        let items = this.state.items.map((item, index) => {
            return <div
                className="product-container"
                key={index + "productcontainer"}
            >
                <div className="product-image-wrapper">
                    {/* <img className="product-image" src={product.pictures[0].path} /> */}
                    <img
                        className="product-image"
                        src={item.variant.pictures[0]}
                    />
                </div>
                <div className="product-textframe">
                    <p className="product-name">
                        {item.name}
                    </p>
                    <p className="product-price-text">
                        <span className="product-price">{item.variant.price}</span> €
                    </p>
                    <p className="product-price-text">
                        <Icon className="btn cart-btn" name='plus' size="big" onClick={() => this.changeCount(index, 1)} />
                        {item.count}
                        <Icon className="btn cart-btn" name='minus' size="big" onClick={() => this.changeCount(index, -1)} />
                    </p>
                </div>
            </div>;
        });
        return <div className="warenkorb-containerx">
            {items}
            <div>
                <div className="btn" onClick={() => this.addItem(0)}>Add Item Nr.1</div>
                <div className="btn" onClick={() => this.addItem(1)}>Add Item Nr.2</div>
            </div>
        </div>
    }
}
export default Warenkorb;