import * as React from 'react';
import './shoppingcart.css';

interface IProps {
    componentStructure: any;
    navs: any;
}

interface IState {
}

export class Shoppingcart extends React.Component<IProps, IState>{

    render() {
        return <div className="shoppingcart">
            test
        </div>
    }
}