import * as React from 'react';
import { DisplayWidePicture } from '../../components/body/displayArticle/displayWidePicture/displayWidePicture';
import './home.css';

interface IProps {
}

interface IState {
}

export class Home extends React.Component<IProps, IState>{

    render() {
        return <div className="home">
            <DisplayWidePicture />
        </div>
    }
}