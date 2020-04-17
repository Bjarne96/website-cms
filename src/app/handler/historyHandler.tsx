import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export const pushHistory = (newURL: string | number) => {
    history.push('/'+newURL)
}

export const getHistory = () => {
    return history.location.pathname;
}