import * as React from 'react';
import './produkte.css';
import { IProduct } from '../../../schemas';

interface IProps {
    products: Array<IProduct>;
}

interface IState {
}

export class Produkte extends React.Component<IProps, IState>{
    constructor(props) {
        super(props);
        this.renderProducts = this.renderProducts.bind(this);
        this.state = {
            loading: true
        }
    }

    render() {
        return <div className="prodcuts-container">
            <div
                key={this.props.products[0]._id}
                className="product"
            >
                <img className="product-bild" src={this.props.products[0].variants[0].pictures[0]} alt={this.props.products[0].variants[0].pictures[0]} />
                <h1>{this.props.products[0].name}</h1><p>{this.props.products[0].variants[0].price}</p>
            </div>
            <div
                key={this.props.products[1]._id}
                className="product"
            >
                <img className="product-bild" src={this.props.products[1].variants[0].pictures[0]} alt={this.props.products[0].variants[0].pictures[0]} />
                <h1>{this.props.products[1].name}</h1><p>{this.props.products[1].variants[0].price}</p>
            </div>
        </div>
    }

    renderProducts() {
        return this.props.products.map((Product: IProduct, index) => {
            console.log('Product', Product);
            return (<>
                <div
                    key={Product._id}
                    className="product"
                    id={"test" + { index }}
                >
                    <img className="product-bild" src={Product.variants[0].pictures[0]} alt={Product.variants[0].pictures[0]} />
                    <h1>{Product.name}</h1><p>{Product.variants[0].price}</p>
                </div>
            </>
            )

        });
    }
}