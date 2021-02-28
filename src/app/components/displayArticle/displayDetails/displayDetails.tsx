import * as React from 'react';
import './displayDetails.css';
import { IProduct } from '../../../../schemas';

interface IProps {
    component: IProduct;
}

export class DisplayDetails extends React.Component<IProps, any> {
    render() {
        return <div className="pd-outerframe">
            <div className="pd-container">
                <div className="pd-bg-layer">
                    <div className="pd-title-frame">
                        <div className="pd-title">Product Name</div>
                    </div>
                </div>
                <div className="pd-front-layer"></div>
                <div className="dummy-blanket"></div>
            </div>
        </div>;
    }
}