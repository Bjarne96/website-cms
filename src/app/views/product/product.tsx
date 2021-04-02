import * as React from 'react';
import './product.css';
import { IProduct, IProductVariant } from '../../../schemas';

interface IProps {
    products: Array<IProduct>;
}

interface IState {
}

export class Product extends React.Component<IProps, IState>{
    constructor(props) {
        super(props);
        this.clickProduct = this.clickProduct.bind(this);
        this.state = {
            loading: true
        }
    }

    lowestPrice(variants: Array<IProductVariant>) {
        let price: Number = 10000;
        for (let i = 0; i < variants.length; i++) {
            if (variants[i].price < price) price = variants[i].price;
        }
        return price;
    }

    clickProduct(name: string) {
        document.getElementById("/produkt-" + name).click();
    }

    render() {
        if (this.props.products == undefined) return <p>error</p>;
        let products = this.props.products.map((product, index) => {
            return <div
                className="product-container"
                key={index + "productcontainer"}
                onClick={() => this.clickProduct(product.name)}
            >
                <div className="product-image-wrapper">
                    {/* <img className="product-image" src={product.pictures[0].path} /> */}
                    <img
                        className="product-image"
                        src={product.variants[index].pictures[0]}
                    />
                </div>
                <div className="product-textframe">
                    <p className="product-name">
                        {product.name}
                    </p>
                    <p className="product-price-text">
                        ab <span className="product-price">{this.lowestPrice(product.variants)}</span> €
                    </p>
                </div>
            </div>;
        });
        return <div className="product-outerframe">
            <div className="product-parent">
                {products}
            </div>
        </div>
    }
}
export default Product;