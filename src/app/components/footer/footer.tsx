import * as React from 'react';
import { ILoadedFooter } from '../../../schemas';
import './footer.css';

interface IProps {
    content: Array<ILoadedFooter>;
}
// ToDo rendering
export class Footer extends React.Component<IProps, {}>{

    constructor(props) {
        super(props);
    }

    redirect(url: string) {
        document.getElementById(url).click();
    }

    render() {
        return <div className="footer-outerframe">
            <div className="footer-container">
                <div className="footer-row">
                    {this.props.content.map((category, c) => {
                        return <div key={category.category + c} className="footer-column">
                            <div className="footer-headline" >{category.category}</div>
                            <div className="footer-column">
                                {category.articles.map((item) => {
                                    return <div className="footer-text" key={item._id} onClick={() => this.redirect(item.url)}>{item.name}</div>
                                })}
                            </div>
                        </div>
                    })}
                </div>
                <div className="payments-background" ><img src="./../../../public/payments.png" className="payments-image" alt="payments" /></div>
                <h1 className="footer-headline footer-copyright">© 2021 Awakenbirds UG </h1>
            </div>
        </div>
    }
}
export default Footer;