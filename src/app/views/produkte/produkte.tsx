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
        this.displayPictures = this.displayPictures.bind(this);     
        this.state = {
            loading: true
        }
    }

    render() {
        return <div className="ProdukteContainer"><div className="Produkte">
            {this.renderProducts(this.props.products)}
            {this.displayPictures(this.props.products)}
        </div></div>
    }

    renderProducts(products: Array<IProduct>) {
        return products.map((Produkts: IProduct) => {
            return <div 
                key={Produkts._id}
            >
                {Produkts.name}
                    </div>
        });
    }  
    displayPictures(products: Array<IProduct>) {
       return   <html><div className= "header"><p>Our wonderful <strong>products</strong></p></div>   
                        <div className = "Textzug1"><p>1. Variante unseres Produkts</p></div>
                        <div className = "Textzug2"><p>2. Variante unseres Produkts</p></div>    
                        <div className="actualPicture1"><img src = {this.props.loadedBackbone.products[0].Variants[0].pictures[0]}  alt = "Error 404, Connection lost"></img> </div>
                        <div className="actualPicture2"><img src = {process.env.PUBLIC_URL + "/logo.png"}  alt = "Error 404, ConnectionDDDD lost"></img> </div>
                    // Ending of description
                    <div className="description">
                        <p>lalal</p>
                    </div>
                <div className="submit area"></div>
                <input type="submit" value="In den Warenkorb legen"/>
                </html>
    } 
}