import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import './App.css';
import * as Index from './index';
import * as Chart from 'react-chartjs-2';
import * as $ from 'jquery';
import { sampleTexts } from './SampleTexts';

var seed: number = 6;
function randInt(min: number, max: number): number {
    max = max || 1;
    min = min || 0;

    seed = (seed * 9301 + 49297) % 233280;
    var rnd = seed / 233280;

    return Math.floor(rnd * (max + 1 - min)) + min;
}

interface MainButtonProps {
    page: number;
    times: number[];
    timeSum: number;
    timeAvg: number;
}

interface MainButtonState {
    windowWidth: number,
    windowHeight: number,
}

class MainButton extends React.Component<MainButtonProps, MainButtonState> {

    constructor(props: MainButtonProps) {
        super(props);
        this.state = {
            windowWidth: window.innerWidth,
            windowHeight: window.innerWidth,
        };
    }

    private handleResize() {
        this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerWidth });
    }

    public componentDidMount() {
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    public componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize.bind(this));
    }

    public clicked() {
        Index.setNowPage(this.props.page, false, () => { });
    }

    public thinOutData<T>(array: T[], targetNum: number): T[] {
        var interval = Math.floor(array.length / targetNum);
        var retArray: T[] = [];
        for (var i = 0; i < array.length; i += interval) {
            retArray.push(array[i]);
        }
        return retArray;
    }


    public render(): React.ReactNode {
        var timeSumExpression: string;
        var timeAvgExpression: string;

        if (this.props.timeSum <= 0) {
            timeSumExpression = '-';
        } else {
            timeSumExpression = this.props.timeSum.toFixed(2) + 'sec';
        }

        if (this.props.timeAvg <= 0) {
            timeAvgExpression = '-';
        } else {
            timeAvgExpression = this.props.timeAvg.toFixed(2) + 'sec';
        }

        var charts: React.ReactNode = null;
        if (this.state.windowWidth >= 1650 && this.state.windowHeight >= 950) {
            var thinData = this.props.times;// this.thinOutData(this.props.times, 100);
            var data = {
                labels: new Array(thinData.length),
                datasets: [{
                    fill: false,
                    pointRadius: 0,
                    lineTension: 0.1,
                    data: thinData,
                    backgroundColor: ['', '#5b9ad5', '#ec7b30', '#a3a3a4', '#ffbf01'][this.props.page],
                    borderColor: ['', '#5b9ad5', '#ec7b30', '#a3a3a4', '#ffbf01'][this.props.page],
                }]
            };
            var option = {
                animation: undefined,
                maintainAspectRatio: true,
                responsive: true,
                legend: { display: false }
            };
            charts = <div className='box-chart'><Chart.Line data={data} options={option} width={480} height={220} /></div>;
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
                        <p>{Index.demoDesc[this.props.page][0] +
                            (this.state.windowWidth >= 600 ? Index.demoDesc[this.props.page][1] +
                                (this.state.windowWidth >= 1000 ? Index.demoDesc[this.props.page][2] : '') : '')}</p>
                    </div>

                    <div className="box-score">
                        {charts}
                        <p>Avg: {timeAvgExpression}<br />Total: {timeSumExpression}</p>
                    </div>
                </div>
            </div>
        );
    }
}

interface AppProps {
    page: string;
}

interface AppState {
    page1ChannelNum: number;
    page1MessageNum: number;
    page1UserNum: number;
    page2ImageNum: number;
    page2ImageViewNum: number;
    page3FloorNum: number;
    page3RoomNum: number;
    page4DataNum: number;
    windowWidth: number;
    windowHeight: number;
}

class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            page1ChannelNum: 0,
            page1MessageNum: 0,
            page1UserNum: 0,
            page2ImageNum: 0,
            page2ImageViewNum: 0,
            page3FloorNum: 0,
            page3RoomNum: 0,
            page4DataNum: 0,
            windowWidth: window.innerWidth,
            windowHeight: window.innerWidth,
        };
    }

    private handleResize() {
        this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerWidth });
    }

    public componentDidUpdate() {
        if (this.props.page === '0') {
            Index.naviBar.setVisible(false);
        } else {
            Index.naviBar.setVisible(true);
        }
    }

    public componentDidMount() {
        window.addEventListener('resize', this.handleResize.bind(this));
        if (this.props.page === '0') {
            Index.naviBar.setVisible(false);
        } else {
            Index.naviBar.setVisible(true);
        }
    }

    public componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize.bind(this));
    }


    public render(): React.ReactNode {
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
        var sum: number = 0;
        const node: React.ReactNode[] = [];
        for (let i: number = 1; i <= 4; i++) {

            var cur: number = 0;
            var avg: number = 0;
            if (Index.processTimes[i].length > 0) {
                cur = Index.processTimes[i].reduce((acc, cur) => { return acc + cur; });
                avg = cur / Index.processTimes[i].length;
            }
            sum += cur;
            node.push(<MainButton page={i} times={Index.processTimes[i].concat()} timeSum={cur} timeAvg={avg} key={i} />);
        }
        var timeExpression: string;
        if (sum == 0) {
            timeExpression = '-';
        } else {
            timeExpression = sum.toFixed(2) + 'sec';
        }


        return (
            <div className="all-container-0">
                <div className="top-container">
                    <input type="button" className="run-button" value="Run" onClick={Index.runDemo} />
                    <input type="button" className="fastrun-button" value="Fast Run" onClick={Index.fastrunDemo} />
                    <span>Total Time: {timeExpression}</span>
                </div>
                <div className="bottom-container">
                    {node}
                </div>
            </div>

        );
    }

    private render1(): React.ReactNode {
        const channelSample: string[] = [
            '会議用', 'ゲーム部屋', '情報共有', 'クラス会', '同窓会幹事',
            'ボットチャンネル', '文芸部屋', 'サークル', '友達', '家族'];
        let channelElements: React.ReactNode[] = [];
        for (let i: number = 0; i < this.state.page1ChannelNum; i++) {
            channelElements.push(<li key={i} >{channelSample[i % channelSample.length]}</li>);
        }
        channelElements = this.arrayCutFromLast(channelElements, Index.pageElementMax);

        let messageElements: React.ReactNode[] = [];
        for (let i: number = 0; i < this.state.page1MessageNum / 2; i++) {
            messageElements.push(
                <div className="balloon balloon-left" key={i * 2}>
                    <p>{sampleTexts[(i * 2) % sampleTexts.length]}</p>
                </div>
            );
            messageElements.push(
                <div className="balloon balloon-right" key={i * 2 + 1}>
                    <p>{sampleTexts[(i * 2 + 1) % sampleTexts.length]}</p>
                </div>
            );
        }
        messageElements = this.arrayCutFromLast(messageElements, Index.pageElementMax);

        const userSamples: string[] = [
            'Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot', 'Golf', 'Hotel', 'India', 'Juliett',
            'Kilo', 'Lima', 'Mike', 'November', 'Oscar', 'Papa', 'Quebec', 'Romeo', 'Sierra', 'Tango',
            'Uniform', 'Victor', 'Whiskey', 'X-ray', 'Yankee', 'Zulu'
        ]
        let userElements: React.ReactNode[] = [];
        for (let i: number = 0; i < this.state.page1UserNum; i++) {
            userElements.push(<li key={i} >{userSamples[i % userSamples.length]}</li>);
        }
        userElements = this.arrayCutFromLast(userElements, Index.pageElementMax);

        return (
            <div className="all-container-1">
                <div className="left-container">
                    <div className="info-container">
                        <img className="face-image" src={'account.jpg'} />
                    </div>
                    <div className="channel-container">
                        {channelElements}
                    </div>
                </div>
                <div className="center-container">
                    {messageElements}
                </div>
                <div className="right-container">
                    {userElements}
                </div>

            </div>
        );

    }

    private render2(): React.ReactNode {
        seed = 2;

        var imageIDArray: number[] = [];

        let imageElements: React.ReactNode[] = [];
        for (let i: number = 0; i < this.state.page2ImageViewNum; i++) {
            if (imageIDArray.length === 0) {
                imageIDArray = new Array(this.state.page2ImageNum).fill(0).map((value, index, ary) => { return index; });
                for (var j = imageIDArray.length - 1; j > 0; j--) {
                    var r = randInt(0, j);
                    var tmp = imageIDArray[j];
                    imageIDArray[j] = imageIDArray[r];
                    imageIDArray[r] = tmp;
                }
            }

            imageElements.push(
                <div className="image-container" key={i}>
                    <img src={'images/image' + imageIDArray[imageIDArray.length - 1] + '.jpg'} />
                </div>
            );
            imageIDArray.pop();
        }
        imageElements = this.arrayCutFromLast(imageElements, Index.pageElementMax);

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
                    {imageElements}
                </div>

            </div>
        );

    }

    private render3(): React.ReactNode {
        seed = 3;

        let uid: number = 0;
        let roomAnchor: React.ReactNode[] = [];
        let floorElem: React.ReactNode[] = [];
        for (let i: number = 1; i <= this.state.page3FloorNum; i++) {
            let roomElem: React.ReactNode[] = [];
            for (let j: number = 0; j < this.state.page3RoomNum; j++) {

                let addtionalColumn: React.ReactNode[] = [];
                if (this.state.windowWidth >= 600) {
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
                        <th className="row-header">{'部屋' + j}</th>
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
            if (this.state.windowWidth >= 600) {
                addtionalColumn.push(<th>換気</th>);
                addtionalColumn.push(<th>施錠</th>);
                addtionalColumn.push(<th>警報装置</th>);
            }
            roomAnchor.push(<li className="item"><a href={'#floor' + i}>{i + '階'}</a></li>);
            floorElem.push(
                <fieldset key={i}>
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
        if (Index.pageElementMax <= floorElem.length * this.state.page3RoomNum) {
            floorElem = this.arrayCutFromLast(floorElem,
                Math.ceil(Index.pageElementMax / this.state.page3RoomNum));
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
        seed = 4;
        var date: Date = new Date(2017, 1, 24, 12, 30, 1, 1);
        var headers: string[] = ['場所', '測定日時', '気温', '湿度', '風速'];
        var datas: { location: string, date: Date, data0: number, data1: number, data2: number }[] = [];


        for (var i: number = 0; i < this.state.page4DataNum; i++) {
            datas.push({
                location: '地点1',
                date: new Date(date),
                data0: randInt(25, 35),
                data1: randInt(40, 80),
                data2: randInt(0, 70) / 10.0,
            });

            date.setHours(date.getHours() + 1);
        }

        datas = this.arrayCutFromLast(datas, Index.pageElementMax);

        var dateStrings: string[] = [];
        for (var i = 0; i < datas.length; i++) {
            if (i === 0 || datas[i - 1].date.getDate() !== datas[i].date.getDate()) {
                dateStrings.push(
                    ('0' + (datas[i].date.getMonth() + 1)).slice(-2) + '/' +
                    ('0' + datas[i].date.getDate()).slice(-2) + ' ' +
                    ('0' + datas[i].date.getHours()).slice(-2) + ':' +
                    ('0' + datas[i].date.getMinutes()).slice(-2)
                );
            } else {
                dateStrings.push(
                    ('0' + (datas[i].date.getHours() + 1)).slice(-2) + ':' +
                    ('0' + datas[i].date.getMinutes()).slice(-2)
                );
            }
        }

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
                animation: undefined,
                maintainAspectRatio: true,
                responsive: true,
                scales: { yAxes: [{ ticks: { beginAtZero: false, min: minValue, max: maxValue } }] },
                onClick: (e: MouseEvent, item: { _index: number }[]) => {
                    if (item.length > 0) {

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
            charts.push(<Chart.Line data={chartData} options={options} width={288} height={240} key={i} />);
        }

        var rows: React.ReactNode[] = [];
        rows.push(
            <tr key={-1} id={"-1"}>
                <th>{headers[0]}</th>
                <th>{headers[1]}</th>
                <th style={{ backgroundColor: 'rgb(255, 23, 73)' }}>{headers[2]}</th>
                <th style={{ backgroundColor: 'rgb(0, 110, 184)' }}>{headers[3]}</th>
                <th style={{ backgroundColor: 'rgb(0, 134, 134)' }}>{headers[4]}</th>
            </tr>
        );
        for (var i: number = 0; i < datas.length; i++) {
            date = datas[i].date;
            rows.push(
                <tr key={date.getTime()} id={"" + date.getTime()}>
                    <td>{datas[i].location}</td>
                    <td>{
                        ('000' + date.getFullYear()).slice(-4) + '/' +
                        ('0' + (date.getMonth() + 1)).slice(-2) + '/' +
                        ('0' + date.getDate()).slice(-2) + ' ' +
                        ('0' + date.getHours()).slice(-2) + ':' +
                        ('0' + date.getMinutes()).slice(-2)
                    }</td>
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

    private arrayCutFromLast<T>(array: Array<T>, size: number): Array<T> {
        if (array.length > size) {
            return array.slice(array.length - size, array.length);
        } else {
            return array.concat();
        }
    }
}

export default App;

