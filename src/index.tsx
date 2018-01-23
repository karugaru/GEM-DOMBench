import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

var interrupted: boolean = false;
var nowPage: number = -1;
var naviBar: Navi;

registerServiceWorker();

function makePromise(func: Function, ms: number): Promise<any> {
    return new Promise((resolve, reject) => {
        if (interrupted) {
            reject();
        } else {
            setTimeout(() => {
                func();
                resolve();
            }, ms);
        }
    });
}

function makeRenderPromise(reactElement: React.ReactElement<any>, ms: number): Promise<any> {
    return makePromise(() => {
        ReactDOM.render(
            reactElement,
            document.getElementById('root') as HTMLElement
        );
    }, ms);
}

export function runDemo() {
    setTimeout(() => {
        demo();
    }, 0);
    return undefined;
}

export function stopDemo() {
    interrupted = true;
    return undefined;
}

export function setNowPage(pageNo: number) {
    stopDemo();
    nowPage = pageNo;
    ReactDOM.render(<App page={(nowPage + 1).toString()} />, document.getElementById('root') as HTMLElement);
}

function demo() {
    interrupted = false;

    let promise: Promise<any> = Promise.resolve();
    promise
        .then(() => {
            return makeRenderPromise(<App page="1" />, 0);
        })
        .then(() => {
            return makeRenderPromise(<App page="2" />, 0);
        })
        .then(() => {
            return makeRenderPromise(<App page="3" />, 0);
        })
        .then(() => {
            return makeRenderPromise(<App page="4" />, 0);
        })
        .then(() => {
            return makeRenderPromise(<App page="0" />, 0);
        })
        .catch(() => { });

}

export function setNaviVisible(visible: boolean) {
    naviBar.setVisible(visible);
}

interface NaviProps {
}

interface NaviState {
    visible: boolean;
    time: number;
}

class Navi extends React.Component<NaviProps, NaviState> {

    constructor(props: NaviProps) {
        super(props);
        this.state = { time: -1, visible: true };
    }

    public clicked() {
        setNowPage(-1);
    }

    public render(): React.ReactNode {
        if (this.state.visible) {
            var timeExpression: string = "-";
            if (this.state.time >= 0) {
                timeExpression = this.state.time.toFixed(2);
            }
            return (
                <div className="navigate-overlay">
                    <input type="button" className="menu" value="Back" onClick={this.clicked.bind(this)} />
                    <div>Time: {timeExpression}</div>
                </div>
            );
        } else {
            return null;
        }
    }

    public setVisible(visible: boolean) {
        this.setState({ time: this.state.time, visible: visible });
    }
}

document.addEventListener('DOMContentLoaded', function (e) {
    var navi = ReactDOM.render(<Navi/>, document.getElementById('navi') as HTMLElement);
    if(navi instanceof Navi){
        naviBar = navi;
    }
    setNowPage(-1);
});
