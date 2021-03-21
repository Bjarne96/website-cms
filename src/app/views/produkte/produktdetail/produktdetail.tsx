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

    test(src: string) {
        console.log('test', src);
        //@ts-ignore
        //document.getElementById("test").src=src;
    }

    render() {
        const produkt = this.props.produkt.variants[0];
        console.log('this.props.produkt.properties', this.props.produkt.properties);
        console.log('this.props.produkt.properties[0][1].name', this.props.produkt.properties[0][1].name);

        return <div>
            <div>{this.props.produkt.name}</div>
            <div>{this.props.produkt.properties[0][0].name}</div>
            <div>{this.props.produkt.properties[0][1].name}</div>
            <div>{this.props.produkt.properties[0][2].name}</div>
            <div>{this.props.produkt.properties[0][3].name}</div>
            <div id="test" >{produkt.pictures[0]}</div>
            <div>{produkt.pictures[1]}</div>
            <div>{produkt.pictures[2]}</div>
            {/* <div>{this.props.produkt.properties[1]}</div> */}
            <div>{produkt.price}</div>
            <img src={produkt.pictures[0]} onClick={() => this.test(produkt.pictures[0])} />
            <div className="product-description" dangerouslySetInnerHTML={{ __html: produkt.description }} />
        </div>
    }
}
export default Produktdetail;