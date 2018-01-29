import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

export const pageElementMax: number = 100; //1セクションに同時に表示する項目数の最大値
export const page1ChannelNum: number = 100;
export const page1MessageNum: number = 1200;
export const page1UserNum: number = 100;
export const page2ImageNum: number = 30;
export const page2ImageViewNum: number = 15;
export const page3FloorNum: number = 120;
export const page3RoomNum: number = 40;
export const page4DataNum: number = 350;

export const demoDesc: string[][] = [
    ['error', 'error', 'error'],
    ['テキストチャットアプリを模したデモです。', '大量の要素を配置したときに問題がないかをチェックする意味も兼ねています。',
        '形式として、Slackのようなメッセンジャーアプリを想定しています。チャンネルが' + page1ChannelNum + '、ユーザーが' +
        page1UserNum + '人、メッセージが' + page1MessageNum + '件表示されます。これらはli、div、p要素などで構成されています。'],
    ['写真管理アプリを模したデモです。', '大量の画像要素を配置、表示したときに問題がないかをチェックする意味も兼ねています。',
        page2ImageNum + '種類のサンプル画像が' + page2ImageViewNum +
        '件配置されます。これらはdiv、img要素などで構成されています。画像を選択して効果をかけることができます。'],
    ['ビル管理システムを模したデモです。', '各階の各部屋の電気や施錠などをリモートコントロールするシステムを想定しています。',
        'また、画面幅に応じていくつかの項目が省略されます。' + page3FloorNum + '階建てで、各階に部屋が' +
        page3RoomNum + '室あります。これらはテーブル要素、input、label要素などで構成されています。'],
    ['お天気アプリを模したデモです。', '気温、湿度、風速などを表にし、グラフを表示します。' +
        'グラフの各点をクリックすると表の対応した部分に移動します。', 'グラフ描画にはChart.jsを使用しています。データは' +
        page4DataNum + '件あります。これらはテーブル要素、canvas要素などで構成されています。'],
];

var interrupted: boolean = false;
export var naviBar: Navi;
export var processTimes: number[][] = [[], [], [], [], []];
registerServiceWorker();

export function runDemo() {
    setTimeout(() => {
        demo(false);
    }, 0);
    return undefined;
}

export function fastrunDemo() {
    setTimeout(() => {
        demo(true);
    }, 0);
    return undefined;
}

export function stopDemo() {
    interrupted = true;
}

var timeStamp: number | undefined;

function timeMark(page: number) {
    var now = performance.now();
    if (timeStamp === undefined) {
        timeStamp = now;
    } else {
        var time: number = (now - timeStamp) / 1000;
        if (page > 0) {
            processTimes[page].push(time);
            var sum = processTimes[page].reduce((acc, cur) => { return acc + cur; })
            var avg = sum / processTimes[page].length;
            setTimeout(() => {
                naviBar.setTime(time, sum, avg);
            }, 0);
            timeStamp = performance.now();
        }
    }
}

export function setNowPage(pageNo: number, fastrun: boolean, callback: () => void) {
    stopDemo();
    timeStamp = undefined;
    if (pageNo > 0) {
        processTimes[pageNo] = [];
    }
    var settingData = [
        [],
        [
            { name: 'page1ChannelNum', start: 0, end: page1ChannelNum },
            { name: 'page1UserNum', start: 0, end: page1UserNum },
            { name: 'page1MessageNum', start: 0, end: page1MessageNum },
        ],
        [
            { name: 'page2ImageNum', start: page2ImageNum, end: page2ImageNum },
            { name: 'page2ImageViewNum', start: 0, end: page2ImageViewNum },
        ],
        [
            { name: 'page3FloorNum', start: 0, end: page3FloorNum },
            { name: 'page3RoomNum', start: 0, end: page3RoomNum },
        ],
        [
            { name: 'page4DataNum', start: 0, end: page4DataNum },
        ],
    ];


    var rendered = ReactDOM.render(<App page={"" + pageNo} />,
        document.getElementById('root'));

    if (rendered instanceof App) {
        var app: App = rendered;
        if (fastrun) {
            timeMark(pageNo);
            app.setState(
                () => {
                    var state: object = {};
                    settingData[pageNo].forEach(element => {
                        state[element.name] = element.end;
                    });
                    return state;
                }, () => { setTimeout(() => { timeMark(pageNo); callback(); }, 0) }
            );

        } else {
            var state: object = {};
            settingData[pageNo].forEach(element => {
                state[element.name] = element.start;
            });
            interrupted = false;
            var recursiveFunc = () => {
                timeMark(pageNo);
                setTimeout(() => {
                    var notEnd: boolean = false;
                    settingData[pageNo].forEach(element => {
                        if (state[element.name] < element.end) {
                            state[element.name]++;
                            notEnd = true;
                        }
                    });
                    if (notEnd && !interrupted) {
                        app.setState(
                            () => {
                                return Object.assign({}, state);
                            },
                            recursiveFunc
                        );
                    } else {
                        callback();
                    }
                }, 0);
            };
            recursiveFunc();
        }
    }
}

function demo(fastrun: boolean) {
    interrupted = false;
    setNowPage(1, fastrun, () => { setNowPage(2, fastrun, () => { setNowPage(3, fastrun, () => { setNowPage(4, fastrun, () => { setNowPage(0, fastrun, () => { }) }) }) }) });
}

interface NaviProps {
}

interface NaviState {
    visible: boolean;
    timeCur: number;
    timeSum: number;
    timeAvg: number;
}

class Navi extends React.Component<NaviProps, NaviState> {

    constructor(props: NaviProps) {
        super(props);
        this.state = { timeCur: -1, timeSum: -1, timeAvg: -1, visible: true };
    }

    public clicked() {
        setNowPage(0, true, () => { });
    }

    public render(): React.ReactNode {
        if (this.state.visible) {
            var timeCurExpression: string = '-';
            var timeSumExpression: string = '-';
            var timeAvgExpression: string = '-';
            if (this.state.timeCur >= 0) {
                timeCurExpression = this.state.timeCur.toFixed(2) + 'sec';
            }
            if (this.state.timeSum >= 0) {
                timeSumExpression = this.state.timeSum.toFixed(2) + 'sec';
            }
            if (this.state.timeAvg >= 0) {
                timeAvgExpression = this.state.timeAvg.toFixed(2) + 'sec';
            }
            return (
                <div className="navigate-overlay">
                    <input type="button" className="menu" value="Back" onClick={this.clicked.bind(this)} />
                    <span>{"Time: " + timeCurExpression + "\u00A0\u00A0\u00A0Avg: " + timeAvgExpression + "\u00A0\u00A0\u00A0Total: " + timeSumExpression}</span>
                </div>
            );
        } else {
            return null;
        }
    }

    public setVisible(visible: boolean) {
        this.setState({ visible: visible });
    }

    public setTime(timeCur: number, timeSum: number, timeAvg: number) {
        this.setState({ timeCur: timeCur, timeSum: timeSum, timeAvg: timeAvg, visible: this.state.visible });
    }
}

document.addEventListener('DOMContentLoaded', function (e) {
    var navi = ReactDOM.render(<Navi />, document.getElementById('navi') as HTMLElement);
    if (navi instanceof Navi) {
        naviBar = navi;
    }
    setNowPage(0, true, () => { });
});
