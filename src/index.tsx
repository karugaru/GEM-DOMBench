import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

export const pageElementMax: number = 100; //1セクションに同時に表示する項目数の最大値
export const page1ChannelNum: number = 100;
export const page1MessageNum: number = 1200;
export const page1UserNum: number = 100;
export const page2ImageNum: number = 11;
export const page2ImageViewNum: number = 1500;
export const page3FloorNum: number = 120;
export const page3RoomNum: number = 40;
export const page4DataNum: number = 350;

export const demoDesc: string[][] = [
    ['error', 'error', 'error'],
    ['テキストチャットアプリを模したデモです。', '大量の要素を配置したときに問題がないかをチェックする意味も兼ねています。',
        '形式として、Slackのようなメッセンジャーアプリを想定しています。チャンネルが' + page1ChannelNum + 'つ、ユーザーが' +
        page1UserNum + '人、メッセージが' + page1MessageNum + '件表示されます。これらはli、div、p要素などで構成されています。'],
    ['写真管理アプリを模したデモです。', '大量の画像要素を配置、表示したときに問題がないかをチェックする意味も兼ねています。',
        page2ImageNum + '種類のサンプル画像が' + page2ImageViewNum +
        '件配置されます。これらはdiv、img要素などで構成されています。操作ボタンはダミーです。'],
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
        demo();
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
                naviBar.setTime(sum, avg);
            }, 0);
            timeStamp = performance.now();
        }
    }
}

function setPage0(callback: () => void) {
    ReactDOM.render(<App page={"" + 0} />,
        document.getElementById('root'));
}

function setPage1(callback: () => void) {
    var rendered = ReactDOM.render(<App page={"" + 1} />,
        document.getElementById('root'));

    if (rendered instanceof App) {
        var app: App = rendered;
        var channelNum = 0;
        var userNum = 0;
        var messageNum = 0;
        interrupted = false;
        var recursiveFunc = () => {
            timeMark(1);
            setTimeout(() => {
                var notEnd: boolean = false;
                if (channelNum < page1ChannelNum) {
                    channelNum++;
                    notEnd = true;
                }

                if (userNum < page1UserNum) {
                    userNum++;
                    notEnd = true;
                }

                if (messageNum < page1MessageNum) {
                    messageNum++;
                    notEnd = true;
                }
                if (notEnd && !interrupted) {
                    app.setState(
                        () => {
                            return {
                                page1ChannelNum: channelNum,
                                page1UserNum: userNum,
                                page1MessageNum: messageNum,
                            };
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

function setPage2(callback: () => void) {
    var rendered = ReactDOM.render(<App page={"" + 2} />,
        document.getElementById('root'));
    if (rendered instanceof App) {
        var app: App = rendered;

        var imageNum = 0;
        interrupted = false;
        var recursiveFunc = () => {
            timeMark(2);
            setTimeout(() => {
                var notEnd: boolean = false;
                if (imageNum < page2ImageViewNum) {
                    imageNum++;
                    notEnd = true;
                }
                if (notEnd && !interrupted) {
                    app.setState(
                        () => {
                            return {
                                page2ImageNum: page2ImageNum,
                                page2ImageViewNum: imageNum,
                            };
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

function setPage3(callback: () => void) {
    var rendered = ReactDOM.render(<App page={"" + 3} />,
        document.getElementById('root'));
    if (rendered instanceof App) {
        var app: App = rendered;

        var floorNum = 0;
        var roomNum = 0;

        interrupted = false;
        var recursiveFunc = () => {
            timeMark(3);
            setTimeout(() => {
                var notEnd: boolean = false;
                if (floorNum < page3FloorNum) {
                    floorNum++;
                    notEnd = true;
                }
                if (roomNum < page3RoomNum) {
                    roomNum++;
                    notEnd = true;
                }
                if (notEnd && !interrupted) {
                    app.setState(
                        () => {
                            return {
                                page3FloorNum: floorNum,
                                page3RoomNum: roomNum,
                            };
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

function setPage4(callback: () => void) {
    var rendered = ReactDOM.render(<App page={"" + 4} />,
        document.getElementById('root'));
    if (rendered instanceof App) {
        var app: App = rendered;

        var dataNum = 0;

        interrupted = false;
        var recursiveFunc = () => {
            timeMark(4);
            setTimeout(() => {
                var notEnd: boolean = false;
                if (dataNum < page4DataNum) {
                    dataNum++;
                    notEnd = true;
                }
                if (notEnd && !interrupted) {
                    app.setState(
                        () => {
                            return {
                                page4DataNum: dataNum,
                            };
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

export function setNowPage(pageNo: number, callback: () => void) {
    stopDemo();
    timeStamp = undefined;
    if (pageNo > 0) {
        processTimes[pageNo] = [];
    }
    ([setPage0, setPage1, setPage2, setPage3, setPage4][pageNo])(callback);
}

function demo() {
    interrupted = false;
    setNowPage(1, () => { setNowPage(2, () => { setNowPage(3, () => { setNowPage(4, () => { setNowPage(0, () => { }) }) }) }) });
}

interface NaviProps {
}

interface NaviState {
    visible: boolean;
    timeSum: number;
    timeAvg: number;
}

class Navi extends React.Component<NaviProps, NaviState> {

    constructor(props: NaviProps) {
        super(props);
        this.state = { timeSum: -1, timeAvg: -1, visible: true };
    }

    public clicked() {
        setNowPage(0, () => { });
    }

    public render(): React.ReactNode {
        if (this.state.visible) {
            var timeSumExpression: string = '-';
            var timeAvgExpression: string = '-';

            if (this.state.timeSum >= 0) {
                timeSumExpression = this.state.timeSum.toFixed(2) + 'sec';
            }
            if (this.state.timeAvg >= 0) {
                timeAvgExpression = this.state.timeAvg.toFixed(2) + 'sec';
            }
            return (
                <div className="navigate-overlay">
                    <input type="button" className="menu" value="Back" onClick={this.clicked.bind(this)} />
                    <div>Avg Time: {timeAvgExpression}  Total Time: {timeSumExpression}</div>
                </div>
            );
        } else {
            return null;
        }
    }

    public setVisible(visible: boolean) {
        this.setState({ visible: visible });
    }

    public setTime(timeSum: number, timeAvg: number) {
        this.setState({ timeSum: timeSum, timeAvg: timeAvg, visible: this.state.visible });
    }
}

document.addEventListener('DOMContentLoaded', function (e) {
    var navi = ReactDOM.render(<Navi />, document.getElementById('navi') as HTMLElement);
    if (navi instanceof Navi) {
        naviBar = navi;
    }
    setNowPage(0, () => { });
});
