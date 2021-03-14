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

    render() {
        return <div className="tableCellDynamic" dangerouslySetInnerHTML={{ __html: "" }} />
    }
}
export default Footer;