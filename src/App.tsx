import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import './App.css';
import { setNowPage } from './index';
//600
/*function makeArray(start: number, stop: number, stride: number): number[] {
  const ary: number[] = [];
  for (let i = start; i <= stop; i += stride) {
    ary.push(i);
  }
  return ary;
}*/

function randInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}

interface MainButtonProps {
    page: number;
}

class MainButton extends React.Component<MainButtonProps>
{
    public clicked() {
        /// <reference path='index.tsx'>
        setNowPage(this.props.page);
    }

    public render(): React.ReactNode {
        return <div className="button-box">
            <input type="image" className="box" value={'box' + this.props.page}
                src={'sample' + this.props.page + '.png'} alt={'box' + this.props.page}
                onClick={this.clicked.bind(this)} />
        </div>;
    }
}

interface AppProps {
    page: string;
}

class App extends React.Component<AppProps> {

    public render(): React.ReactNode {
        if (this.props.page === '0') {
            const node: React.ReactNode[] = [];
            for (let i: number = 0; i < 6; i++) {
                node.push(<MainButton page={i} />);
            }
            return (
                <div className="all-container-0">{node}</div>
            );
        } else if (this.props.page === '1') {
            const elemNum: number = 1000;
            let sampleElem1: React.ReactNode[] = [];
            for (let i: number = 0; i < elemNum; i++) {
                sampleElem1.push(<li>{'sample channel' + i}</li>);
            }
            let sampleElem2: React.ReactNode[] = [];
            for (let i: number = 0; i < elemNum; i++) {
                sampleElem2.push(
                    <div className="balloon balloon-left">
                        <p>{'sample text.' + (i * 2)}</p>
                    </div>
                );
                sampleElem2.push(
                    <div className="balloon balloon-right">
                        <p>{'sample text.' + (i * 2 + 1)}</p>
                    </div>
                );
            }
            let sampleElem3: React.ReactNode[] = [];
            for (let i: number = 0; i < elemNum; i++) {
                sampleElem3.push(<li>{'MemoMemoMemoMemoMemoMemoMemoMemoMemoMemo' + i}</li>);
            }

            return (
                <div className="all-container-1">
                    <div className="left-container">
                        <div className="info-container">
                            <div className="face-image">
                                <a>image</a>
                            </div>
                        </div>
                        <div className="channel-container">
                            {sampleElem1}
                        </div>
                    </div>
                    <div className="center-container">
                        {sampleElem2}
                    </div>
                    <div className="right-container">
                        {sampleElem3}
                    </div>

                </div>
            );
        } else if (this.props.page === '2') {
            const elemNum: number = 1000;

            let sampleElem: React.ReactNode[] = [];
            for (let i: number = 0; i < elemNum; i++) {
                sampleElem.push(
                    <div className="image-container">
                        <img src="sample.jpg" />
                    </div>
                );
            }

            return (
                <div className="all-container-2">
                    <div className="top-container">

                        <input type="button" value="open" />
                        <input type="button" value="rotate" />
                        <input type="button" value="flip" />
                        <input type="button" value="scale" />
                        <input type="button" value="exit" />
                    </div>
                    <div className="main-container">
                        {sampleElem}
                    </div>

                </div>
            );
        } else if (this.props.page === '3') {
            const floorNum: number = 20;
            const roomNum: number = 20;
            let uid: number = 0;
            let roomAnchor: React.ReactNode[] = [];
            let floorElem: React.ReactNode[] = [];
            for (let i: number = 1; i <= floorNum; i++) {
                let roomElem: React.ReactNode[] = [];
                for (let j: number = 0; j < roomNum; j++) {

                    let addtionalColumn: React.ReactNode[] = [];
                    if (window.innerWidth >= 600) {
                        addtionalColumn.push(
                            <td className="switch">
                                <input id={"switch" + uid} defaultChecked={randInt(0, 1) == 0} type="checkbox" />
                                <label htmlFor={"switch" + (uid++)}></label>

                            </td>);
                        addtionalColumn.push(
                            <td className="switch">

                                <input id={"switch" + uid} defaultChecked={randInt(0, 1) == 0} type="checkbox" />
                                <label htmlFor={"switch" + (uid++)}></label>

                            </td>);
                        addtionalColumn.push(
                            <td className="switch">
                                <input id={"switch" + uid} defaultChecked={randInt(0, 1) == 0} type="checkbox" />
                                <label htmlFor={"switch" + (uid++)}></label>

                            </td>);
                    }

                    roomElem.push(
                        <tr>
                            <th>{"部屋" + j}</th>
                            <td className="switch">
                                <input id={"switch" + uid} defaultChecked={randInt(0, 1) == 0} type="checkbox" />
                                <label htmlFor={"switch" + (uid++)}></label>

                            </td>
                            <td className="nar">{randInt(18, 40)}℃</td>
                            <td>{randInt(20, 30)}℃<input type="button" value="▲" /><input type="button" value="▼" /></td>
                            <td className="nar">{randInt(20, 80)}%</td>
                            <td>{randInt(40, 60)}%<input type="button" value="▲" /><input type="button" value="▼" /></td>
                            {addtionalColumn}
                        </tr>);
                }

                let addtionalColumn: React.ReactNode[] = [];
                if (window.innerWidth >= 600) {
                    addtionalColumn.push(<th>換気</th>);
                    addtionalColumn.push(<th>施錠</th>);
                    addtionalColumn.push(<th>警報装置</th>);
                }
                roomAnchor.push(<li className="item"><a href={"#floor" + i}>{i + "階"}</a></li>);
                floorElem.push(
                    <fieldset>
                        <legend id={"floor" + i}>{i + "階"}</legend>
                        <table>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <th>照明</th>
                                    <th className="nar">気温</th>
                                    <th>気温設定</th>
                                    <th className="nar">湿度</th>
                                    <th>湿度設定</th>
                                    {addtionalColumn}
                                </tr>
                                {roomElem}
                            </tbody>
                        </table>
                    </fieldset>
                );
            }
            return (
                <div className="all-container-3">
                    <div className="top-container">
                        <div className="scroll-container">
                            {roomAnchor}
                        </div>
                    </div>
                    <div className="main-container">
                        {floorElem}
                    </div>
                </div>
            );
        } else if (this.props.page === '4') {
            return <h1>demo page 4</h1>;
        } else if (this.props.page === '5') {
            return <h1>demo page 5</h1>;
        } else {
            return <div className="none" />;
        }
    }
}

export default App;
