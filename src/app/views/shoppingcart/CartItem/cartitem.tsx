import * as React from 'react';
import { ICartProduct } from '../../../../schemas';
import './cartitem.css';

interface IProps {
    item: ICartProduct;
    addToCart: (clickedItem: ICartProduct) => void;
    removeFromCart: (id: number) => void;
}

interface IState {
}

export class CartItem extends React.Component<IProps, IState>{
    constructor(props) {
        super(props);
        // this.loadNav = this.loadNav.bind(this);

        this.state = {
            loading: true
        }
    }

    componentDidMount() {

    }

    render() {
        return <div>
            <div>
                <h3>{this.props.item.name}</h3>
                <div className='information'>
                    <p>Price: {this.props.item.price}</p>
                    <p>Total: {(this.props.item.amount * this.props.item.price).toFixed(2)}</p>
                </div>
                <div className='buttons'>
                    <div
                        //   size='small'
                        //   disableElevation
                        //   variant='contained'
                        onClick={() => this.props.removeFromCart(this.props.item._id)}
                    >
                        -
            </div>
                    <p>{this.props.item.amount}</p>
                    <div
                        //   size='small'
                        //   disableElevation
                        //   variant='contained'
                        onClick={() => this.props.addToCart(this.props.item)}
                    >
                        +
            </div>
                </div>
            </div>
            {this.props.item.pictures.map((item, key) => {
                return <img src={item.path} key={key + "-productimg"} alt={item.name} />
            })}

        </div>
    }
}
