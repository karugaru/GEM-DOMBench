import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import './App.css';
import { runDemo, setNowPage, setNaviVisible, getTimes, setTime, setNaviTime } from './index';
import * as Chart from 'react-chartjs-2';
import * as $ from 'jquery';

const page1ElementNum: number = 2000;
const page2ImageNum: number = 11;
const page2ElementNum: number = 2000;
const page3FloorNum: number = 60;
const page3RoomNum: number = 20;
const page4DataNum: number = 1000;

const demoDesc: string[][] = [
    ['テキストチャットアプリを模したデモです。', 'Slackのようなメッセンジャーアプリを想定しています。' +
        '大量の要素を配置、表示したときに問題がないかをチェックする意味も兼ねています。チャンネル、メモが各' +
        page1ElementNum + '件表示され、' + (page1ElementNum * 2) +
        '件のメッセージが表示されます。これらはli、div、p要素などで構成されています。'],
    ['写真管理アプリを模したデモです。', '大量の画像要素を配置、表示したときに問題がないかをチェックする意味も兼ねています。' +
        page2ImageNum + '種類のサンプル画像が' + page2ElementNum +
        '件配置されます。これらはdiv、img要素などで構成されています。操作ボタンはダミーです。'],
    ['ビル管理システムを模したデモです。', '各階の各部屋の電気や施錠などをリモートコントロールするシステムを想定しています。' +
        'また、画面幅に応じていくつかの項目が省略されます。' + page3FloorNum + '階建てで、各階に部屋が' +
        page3RoomNum + '室あります。これらはテーブル要素、input、label要素などで構成されています。'],
    ['お天気アプリを模したデモです。', '気温、湿度、風速などを表にし、グラフを表示します。グラフ描画にはChart.jsを使用しています。' +
        'グラフの各点をクリックすると表の対応した部分に移動します。データは' + page4DataNum +
        '件あります。これらはテーブル要素、canvas要素などで構成されています。'],
];

function randInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}

interface MainButtonProps {
    page: number;
    time: number;
}


class MainButton extends React.Component<MainButtonProps> {

    constructor(props: MainButtonProps) {
        super(props);
    }

    public clicked() {
        /// <reference path='index.tsx'>
        setNowPage(this.props.page);
    }

    public render(): React.ReactNode {
        var timeExpression: string;
        if (this.props.time < 0) {
            timeExpression = '-';
        } else {
            timeExpression = this.props.time.toFixed(2) + 'sec';
        }
        return (
            <div className="button-box" id={'box' + this.props.page}>
                <div className="box-left">
                    <input type="image" className="box" value={'box' + this.props.page}
                        src={'sample' + this.props.page + '.png'} alt={'box' + this.props.page}
                        onClick={this.clicked.bind(this)} />
                </div>
                <div className="box-right">
                    <div className="box-text">
                        <p>{demoDesc[this.props.page][0] +
                            (window.innerWidth >= 600 ? demoDesc[this.props.page][1] : '')}</p>
                    </div>
                    <div className="box-score">
                        <p>Time: {timeExpression}</p>
                    </div>
                </div>

            </div>
        );
    }
}

interface AppProps {
    page: string;
}

var timeStart: number;

class App extends React.Component<AppProps> {
    constructor(props: AppProps) {
        super(props);
    }

    public componentWillUpdate() {
        timeStart = performance.now();
    }

    public componentDidUpdate() {
        var timeEnd: number = (performance.now() - timeStart) / 1000;
        var page: number = parseInt(this.props.page);
        if (page > 0) {
            setTimeout(() => {
                setTime(page - 1, timeEnd);
                setNaviTime(timeEnd);
            }, 0);
        }
    }

    public render(): React.ReactNode {
        if (this.props.page === '0') {
            setNaviVisible(false);
        } else {
            setNaviVisible(true);
        }
        if (this.props.page === '0') {
            return this.render0();
        } else if (this.props.page === '1') {
            return this.render1();
        } else if (this.props.page === '2') {
            return this.render2();
        } else if (this.props.page === '3') {
            return this.render3();
        } else if (this.props.page === '4') {
            return this.render4();
        } else {
            return <div className="none" />;
        }
    }

    private render0(): React.ReactNode {
        var times: number[] = getTimes();

        const node: React.ReactNode[] = [];
        for (let i: number = 0; i < 4; i++) {
            node.push(<MainButton page={i} time={times[i]} />);
        }
        var timeExpression: string;
        if (times.indexOf(-1) >= 0) {
            timeExpression = '-';
        } else {
            timeExpression = times.reduce((acc, cur) => acc + cur).toFixed(2) + 'sec';
        }


        return (
            <div className="all-container-0">
                <div className="top-container">
                    <input type="button" className="menu" value="Run" onClick={runDemo} />
                    <li>Total Time: {timeExpression}</li>
                </div>
                <div className="bottom-container">
                    {node}
                </div>
            </div>

        );
    }

    private render1(): React.ReactNode {
        let sampleElem1: React.ReactNode[] = [];
        for (let i: number = 0; i < page1ElementNum; i++) {
            sampleElem1.push(<li>{'sample channel' + i}</li>);
        }
        let sampleElem2: React.ReactNode[] = [];
        for (let i: number = 0; i < page1ElementNum; i++) {
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
        for (let i: number = 0; i < page1ElementNum; i++) {
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
    }

    private render2(): React.ReactNode {
        var imageID: number = 0;
        let sampleElem: React.ReactNode[] = [];
        for (let i: number = 0; i < page2ElementNum; i++) {
            sampleElem.push(
                <div className="image-container">
                    <img src={'images/image' + imageID + '.jpg'} />
                </div>
            );
            imageID++;
            if (imageID == page2ImageNum) {
                imageID = 0;
            }
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
    }

    private render3(): React.ReactNode {
        let uid: number = 0;
        let roomAnchor: React.ReactNode[] = [];
        let floorElem: React.ReactNode[] = [];
        for (let i: number = 1; i <= page3FloorNum; i++) {
            let roomElem: React.ReactNode[] = [];
            for (let j: number = 0; j < page3RoomNum; j++) {

                let addtionalColumn: React.ReactNode[] = [];
                if (window.innerWidth >= 600) {
                    addtionalColumn.push(
                        <td className="switch">
                            <input id={'switch' + uid} defaultChecked={randInt(0, 1) === 0} type="checkbox" />
                            <label htmlFor={'switch' + (uid++)} />

                        </td>);
                    addtionalColumn.push(
                        <td className="switch">

                            <input id={'switch' + uid} defaultChecked={randInt(0, 1) === 0} type="checkbox" />
                            <label htmlFor={'switch' + (uid++)} />

                        </td>);
                    addtionalColumn.push(
                        <td className="switch">
                            <input id={'switch' + uid} defaultChecked={randInt(0, 1) === 0} type="checkbox" />
                            <label htmlFor={'switch' + (uid++)} />

                        </td>);
                }

                roomElem.push(
                    <tr>
                        <th>{'部屋' + j}</th>
                        <td className="switch">
                            <input id={'switch' + uid} defaultChecked={randInt(0, 1) === 0} type="checkbox" />
                            <label htmlFor={'switch' + (uid++)} />

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
            roomAnchor.push(<li className="item"><a href={'#floor' + i}>{i + '階'}</a></li>);
            floorElem.push(
                <fieldset>
                    <legend id={'floor' + i}>{i + '階'}</legend>
                    <table>
                        <tbody>
                            <tr>
                                <td />
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
    }

    private render4(): React.ReactNode {
        var date: Date = new Date();
        var headers: string[] = ['場所', '測定日時', '気温', '湿度', '風速'];
        var datas: { location: string, date: Date, data0: number, data1: number, data2: number }[] = [];


        for (var i: number = 0; i < page4DataNum; i++) {
            datas.push({
                location: '地点1',
                date: new Date(date),
                data0: randInt(25, 35),
                data1: randInt(40, 80),
                data2: randInt(0, 70) / 10.0,
            });

            date.setHours(date.getHours() + 1);
        }

        var dateStrings: string[] = [];
        for (var i = 0; i < page4DataNum; i++) {
            if (i === 0 || datas[i - 1].date.getDate() !== datas[i].date.getDate()) {
                dateStrings.push((datas[i].date.getMonth() + 1) + '/' + datas[i].date.getDate() + ' ' +
                    datas[i].date.getHours() + ':' + datas[i].date.getMinutes());
            } else {
                dateStrings.push((datas[i].date.getHours() + 1) + ':' + datas[i].date.getMinutes());
            }
        }
        // console.log(dateStrings);

        var charts: React.ReactNode[] = [];
        for (var i: number = 0; i < 3; i++) {
            var colorString: string;
            var dataArray: number[];
            var maxValue: number = 0;
            var minValue: number = 0;

            if (i === 0) {
                colorString = 'rgba(255,99,132,1)';
                dataArray = datas.map(x => x.data0);
                maxValue = 40;
                minValue = 20;
            } else if (i === 1) {
                colorString = 'rgba(54,162,235,1)';
                dataArray = datas.map(x => x.data1);
                maxValue = 90;
                minValue = 30;
            } else if (i === 2) {
                colorString = 'rgba(75,192,192,1)';
                dataArray = datas.map(x => x.data2);
                maxValue = 10;
                minValue = -1;
            } else {
                colorString = '';
                dataArray = [];
            }

            const chartData = {
                labels: dateStrings,
                datasets: [
                    {
                        label: headers[2 + i],
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: colorString,
                        borderColor: colorString,
                        data: dataArray,
                    }
                ]
            };

            const options = {
                maintainAspectRatio: true,
                responsive: true,
                scales: { yAxes: [{ ticks: { beginAtZero: false, min: minValue, max: maxValue } }] },
                onClick: (e: MouseEvent, item: { _index: number }[]) => {
                    // console.log(chartData.datasets[0].label);
                    // console.log(e);
                    // console.log(item);
                    if (item.length > 0) {
                        // console.log(item[0]._index);

                        var tableRow = $('table tr:eq(' + (item[0]._index + 1) + ')');
                        var offset = tableRow.offset();
                        if (offset !== undefined) {
                            $('html,body').animate({ scrollTop: offset.top });
                            tableRow.find('td:eq(0)').css('background-color', 'red');
                            setTimeout(() => { tableRow.find('td:eq(0)').css('background-color', ''); }, 1500);
                        }
                    }
                }
            };
            charts.push(<Chart.Line data={chartData} options={options} width={288} height={240} />);
        }

        var rows: React.ReactNode[] = [];
        rows.push(
            <tr>
                <th>{headers[0]}</th>
                <th>{headers[1]}</th>
                <th style={{ backgroundColor: 'rgb(255, 23, 73)' }}>{headers[2]}</th>
                <th style={{ backgroundColor: 'rgb(0, 110, 184)' }}>{headers[3]}</th>
                <th style={{ backgroundColor: 'rgb(0, 134, 134)' }}>{headers[4]}</th>
            </tr>
        );
        for (var i: number = 0; i < page4DataNum; i++) {
            date = datas[i].date;
            rows.push(
                <tr>
                    <td>{datas[i].location}</td>
                    <td>{'' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() +
                        ' ' + date.getHours() + ':' + date.getMinutes()}</td>
                    <td style={{ backgroundColor: 'rgba(255,99,132,1)' }}>{datas[i].data0 + '℃'}</td>
                    <td style={{ backgroundColor: 'rgba(54,162,235,1' }}>{datas[i].data1 + '％'}</td>
                    <td style={{ backgroundColor: 'rgba(75,192,192,1)' }}>{datas[i].data2 + 'm/s'}</td>
                </tr>
            );
        }

        return (
            <div className="all-container-4">
                <div className="left-container">
                    <table>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div>
                <div className="right-container">
                    {charts}
                </div>

            </div>
        );
    }

}

export default App;