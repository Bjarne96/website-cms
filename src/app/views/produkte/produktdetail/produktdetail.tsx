import * as React from 'react';
import './produktdetail.css';
import { IProduct } from '../../../../schemas';

interface IProps {
    produkt: IProduct;
}
interface IState {
    activeProduct: IProduct;
}

export class Produktdetail extends React.Component<IProps, {}>{

    constructor(props) {
        super(props);
    }

    render() {
        const produkt = this.props.produkt.variants[0];
        return <div>
            <div>{this.props.produkt.name}</div>
            <div>{produkt.price}</div>
            <img src={produkt.pictures[0]} />
            <div className="product-description" dangerouslySetInnerHTML={{ __html: produkt.description }} />
        </div>
    }
}
export default Produktdetail;