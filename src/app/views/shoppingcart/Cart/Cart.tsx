import * as React from 'react';
import { CartItem } from './../CartItem/CartItem';
import { ICartProduct, IProduct } from '../../../../schemas';
import { getProducts } from "../../../handler/productRequests"
import './cart.css';

interface IProps {
    item: ICartProduct;
    addToCart: (clickedItem: ICartProduct) => void;
    removeFromCart: (id: number) => void;
}

interface IState {
    loading: boolean;
}

var cartProducts: Array<ICartProduct>;

var products: Array<IProduct>;

var total = 0;

export class Cart extends React.Component<IProps, IState>{

    constructor(props) {
        super(props);
        // this.loadNav = this.loadNav.bind(this);

        this.state = {
            loading: true
        }
    }

    //Loads all products and adds them into the state
    async loadProducts() {
        this.setState({ loading: true });
        let response = await getProducts();
        console.log('response', response);
        //Todo exception
        let _temp: any =
            products = response.result;
        this.setState({ loading: false })
    }

    //Render first and loads products afterwards
    componentDidMount() {
        this.loadProducts();
    }

    render() {
        return (
            <div>
                <h2>Your Shopping Cart</h2>

                <CartItem
                    key={item.id}
                    item={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart} />
                <h2>Total: {calculateTotal(cartItems).toFixed(2)}</h2>
            </div>
        );
    };
}


export default Cart;
