import * as React from 'react';
import './produktdetail.css';
import { IProduct } from '../../../../schemas';
import { Container } from 'semantic-ui-react';

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

        return <div className ="OuterFrame">
            <div className = "Container" >
                <div className ="PictureContainer">
                    <img src={produkt.pictures[0]} /* onClick={() => this.test(produkt.pictures[0])} */ />
                </div> 
                <div className = "Description"> <div className = "ProductName">
                    <p>{this.props.produkt.name}</p>
                    {/* <p>{this.props.produkt.properties[1][1].id}</p> */}
                    <p>{produkt.price}€</p>
                </div>
                <div className ="select-area">
                    <p>{this.props.produkt.properties[0][0].name}:</p>
                        <select name="{this.props.produkt.properties[0][0].name}" id={this.props.produkt.properties[0][0].name}>
                            <option value={this.props.produkt.properties[0][1].id}>{this.props.produkt.properties[0][1].name}</option>
                            <option value={this.props.produkt.properties[0][2].id}>{this.props.produkt.properties[0][2].name}</option>
                            <option value={this.props.produkt.properties[0][3].id}>{this.props.produkt.properties[0][3].name}</option>
                        </select>
                    <br></br>
                    <p>{this.props.produkt.properties[1][0].name}:</p>
                    <select name="{this.props.produkt.properties[1][0].name}" id={this.props.produkt.properties[1][0].name}>
                            <option value={this.props.produkt.properties[1][1].id}>{this.props.produkt.properties[1][1].name}</option>
                            <option value={this.props.produkt.properties[1][2].id}>{this.props.produkt.properties[1][2].name}</option>
                            <option value={this.props.produkt.properties[1][3].id}>{this.props.produkt.properties[1][3].name}</option>
                            </select>
                            <br></br>
                    <input type="submit" value="In den Warenkorb legen"/>
                    </div>
            </div>
            </div>
            {/* <div>{this.props.produkt.properties[1]}</div> */}
        </div>
    }
}
export default Produktdetail;