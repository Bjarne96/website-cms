import * as React from 'react';
import './productdetail.css';
import { IProduct, IProductProps, IProductSelected } from '../../../../schemas';
import { Button, Select } from 'semantic-ui-react';
import { updateWarenkorbItem } from '../../../handler/localstorageHandler';
import { withRouter } from 'react-router-dom';

interface IProps {
    product: IProduct;
    history;
    warenkorbChange();
}
interface IState {
    selectedImage: string;
    selectedProduct: IProductSelected
}

export class Productdetail extends React.Component<IProps, IState>{

    constructor(props) {
        super(props);
        this.formatSelect = this.formatSelect.bind(this);
        this.onChangeByImage = this.onChangeByImage.bind(this);
        this.onChangeBySelect = this.onChangeBySelect.bind(this);
        this.addToWarenkorb = this.addToWarenkorb.bind(this);
        //Set default selected Product to fill with data
        let selectedProduct: IProductSelected = {
            _id: this.props.product._id,
            name: this.props.product.name,
            sku: this.props.product.sku,
            variant: this.props.product.variants[0],
            properties: this.props.product.properties,
            count: 1,
            total: this.props.product.variants[0].price
        }
        //loads more data from url
        let defaultObject: any = this.pullUrl(selectedProduct);
        //Set state
        this.state = {
            selectedImage: defaultObject.selectedImage,
            selectedProduct: defaultObject.selectedProduct
        }


    }

    //Adds actual item to warenkorb
    async addToWarenkorb() {
        //adds item to localstorage
        await updateWarenkorbItem(this.state.selectedProduct);
        //notifys parent about changes
        await this.props.warenkorbChange();
    }

    //pushes the Url with new params
    async pushUrl() {
        //Sets default param object
        let jsonParams = {
            selector_1: this.state.selectedProduct.variant.selector_1,
            selector_2: this.state.selectedProduct.variant.selector_2,
            image: this.state.selectedImage
        }
        //formats to string
        let jsonString = JSON.stringify(jsonParams);
        //formats for url
        jsonString = jsonString.substring(1).replace(/\,/g, "&").replace(/\:/g, "=").replace(/\}/g, "")
        let stringParams = "?" + jsonString;
        //pushes into the url search params
        this.props.history.push({
            pathname: '/produkt-' + this.props.product.name.toLocaleLowerCase(),
            search: stringParams
        })
    }

    //gets Url params and formats them into an object
    pullUrl(selectedProduct: IProductSelected) {
        var params = decodeURI(location.search.substring(1));
        params = params.replace(/\&/g, ",").replace(/\=/g, ":")
        params = "{" + params + "}";
        let tempObj = {};
        try {
            tempObj = JSON.parse(params);
        } catch (err) {
            console.log('err');
        }
        let returnObj = {};
        for (let i = 0; i < this.props.product.variants.length; i++) {
            const element = this.props.product.variants[i];

            if (tempObj["selector_1"] == element.selector_1 && tempObj["selector_2"] == element.selector_2) {
                console.log('element.selector_1', element.selector_1, element.selector_2);
                selectedProduct.variant = element;
            }
        }
        returnObj["selectedImage"] = this.props.product.variants[0].pictures[0];
        if (tempObj["image"]) {
            returnObj["selectedImage"] = tempObj["image"];
        }
        returnObj["selectedProduct"] = selectedProduct;
        return returnObj;
    }

    async onChangeByImage(image: string) {
        await this.setState({
            selectedImage: image
        })
        await this.pushUrl();
    }

    async onChangeBySelect(e, data) {
        let rawvalue = data.value.toString();
        let selector = "selector_" + rawvalue.charAt(0);
        let otherSelector = "selector_1";
        if (rawvalue.charAt(0) == 1) {
            otherSelector = "selector_2"
        }
        let value = rawvalue.charAt(1);
        let variants = this.props.product.variants;
        let activeVar = this.state.selectedProduct.variant;
        let newSelectedProduct = this.state.selectedProduct;
        for (let i = 0; i < variants.length; i++) {
            const element = variants[i];
            if (element[selector] == value && activeVar[otherSelector] == element[otherSelector]) {
                newSelectedProduct.variant = element;
                await this.setState({ selectedProduct: newSelectedProduct })
                await this.onChangeByImage(newSelectedProduct.variant.pictures[0]);
            }
        }
        await this.pushUrl();
    }

    formatSelect(Props: Array<IProductProps>, count) {
        let selectProps = [];
        for (let i = 0; i < Props.length; i++) {
            const element = Props[i];
            if (i == 0) continue;
            let value = Number(((count).toString()) + (element.id.toString()));
            selectProps.push(
                {
                    key: element.id,
                    value: value,
                    text: element.name
                }
            )
        }
        return selectProps;
    }

    render() {
        console.log('renderProductdetail');
        return <div className="productdetail-outerframe">
            <div className="productdetail-container">
                <div className="productdetail-imagewrapper">
                    <div className="productdetail-single-imagewrapper">
                        <img className="productdetail-image" src={this.state.selectedImage} />
                    </div>
                    <div className="productdetail-thumbnailcontainer">
                        {this.state.selectedProduct.variant.pictures.map((image, i) => {
                            return <img key={"image" + i} className="productdetail-thumbnail" src={image} onClick={() => this.onChangeByImage(image)} />
                        })}
                    </div>
                </div>
                <div className="productdetail-info">
                    <div className="productdetail-text">
                        <h1>{this.state.selectedProduct.name}</h1><br />
                        <p>{this.state.selectedProduct.variant.price}€</p>
                    </div>
                    <div className="productdetail-selects">
                        {this.props.product.properties.map((props, i) => {
                            let selector = (i + 1);
                            let value = Number((selector.toString()) + (this.state.selectedProduct.variant["selector_" + selector].toString()));
                            return <div key={"select" + i} className="productdetail-select">
                                <p>{props[0].name}:</p>
                                <Select
                                    onChange={this.onChangeBySelect}
                                    value={value}
                                    options={this.formatSelect(props, selector)}
                                />
                            </div>
                        })}
                    </div>
                    <div className="productdetail-other">
                        <div className="productdetail-description">
                            <div className="tableCellDynamic" dangerouslySetInnerHTML={{ __html: this.state.selectedProduct.variant.description }} />
                            <p>This is bacially the same, but diffrent for every Product.</p><br />
                            <p>I think its weirds but its also more information so we take it.</p><br />
                            <p>This is the end.</p>
                        </div>
                    </div>
                    <div className="productdetail-warenkorb">
                        <Button primary onClick={() => this.addToWarenkorb()}>In den Warenkorb</Button>
                    </div>
                </div>
            </div>
        </div>
    }
}
// @ts-ignore
export default withRouter(Productdetail);