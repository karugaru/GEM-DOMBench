import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import './App.css';
import * as Index from './index';
import * as Chart from 'react-chartjs-2';
import * as $ from 'jquery';

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
    timeSum: number;
    timeAvg: number;
}


class MainButton extends React.Component<MainButtonProps> {

    constructor(props: MainButtonProps) {
        super(props);
    }

    public clicked() {
        /// <reference path='index.tsx'>
        Index.setNowPage(this.props.page, () => { });
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
                            (window.innerWidth >= 600 ? Index.demoDesc[this.props.page][1] +
                                (window.innerWidth >= 1000 ? Index.demoDesc[this.props.page][2] : '') : '')}</p>
                    </div>
                    <div className="box-score">
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
            page4DataNum: 0
        };
    }

    public componentDidUpdate() {
        if (this.props.page === '0') {
            Index.naviBar.setVisible(false);
        } else {
            Index.naviBar.setVisible(true);
        }
    }

    public componentDidMount() {
        if (this.props.page === '0') {
            Index.naviBar.setVisible(false);
        } else {
            Index.naviBar.setVisible(true);
        }
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
            node.push(<MainButton page={i} timeSum={cur} timeAvg={avg} key={i} />);
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
                    <input type="button" className="menu" value="Run" onClick={Index.runDemo} />
                    <span>Total Time: {timeExpression}</span>
                </div>
                <div className="bottom-container">
                    {node}
                </div>
            </div>

        );
    }

    private render1(): React.ReactNode {
        const channelSample: string[] = ['会議用', 'ゲーム部屋', '情報共有', 'クラス会', '同窓会幹事', 'ボットチャンネル', '文芸部屋', 'サークル', '友達', '家族'];
        let channelElements: React.ReactNode[] = [];
        for (let i: number = 0; i < this.state.page1ChannelNum; i++) {
            channelElements.push(<li key={i} >{channelSample[i % channelSample.length]}</li>);
        }
        channelElements = this.arrayCutFromLast(channelElements, Index.pageElementMax);

        let messageElements: React.ReactNode[] = [];
        for (let i: number = 0; i < this.state.page1MessageNum / 2; i++) {
            messageElements.push(
                <div className="balloon balloon-left" key={i * 2}>
                    <p>{messageSamples[(i * 2) % messageSamples.length]}</p>
                </div>
            );
            messageElements.push(
                <div className="balloon balloon-right" key={i * 2 + 1}>
                    <p>{messageSamples[(i * 2 + 1) % messageSamples.length]}</p>
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
            if (window.innerWidth >= 600) {
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

const messageSamples: string[] = [
    'えたいの知れない不吉な塊が私の心を始終らずさせるのだ。それで始終私は街から街を浮浪し続けていた。',
    '何故だかその頃私は見すぼらしくて美しいものに強くひきつけられたのを覚えている。風景にしても壊れかかった街だとか、その街にしてもよそよそしい表通りよりもどこか親しみのある、汚い洗濯物が干してあったりがらくたが転がしてあったりむさくるしい部屋が覗いていたりする裏通りが好きであった。雨や風が蝕んでやがて土に帰ってしまう、と言ったような趣きのある街で、土塀が崩れていたり家並が傾きかかっていたり――勢いのいいのは植物だけで、時とするとびっくりさせるような向日葵があったりカンナが咲いていたりする。',
    '時どき私はそんな路を歩きながら、ふと、そこが京都ではなくて京都から何百里も離れた仙台とか長崎とか――そのような市へ今自分が来ているのだ――という錯覚を起こそうと努める。私は、できることなら京都から逃げ出して誰一人知らないような市へ行ってしまいたかった。第一に安静。がらんとした旅館の一室。清浄な蒲団。匂いのいい蚊帳と糊のよくきいた浴衣。そこで一月ほど何も思わず横になりたい。希わくはここがいつの間にかその市になっているのだったら。――錯覚がようやく成功しはじめると私はそれからそれへ想像の絵具を塗りつけてゆく。なんのことはない、私の錯覚と壊れかかった街との二重写しである。そして私はその中に現実の私自身を見失うのを楽しんだ。',
    '私はまたあの花火というやつが好きになった。花火そのものは第二段として、あの安っぽい絵具で赤や紫や黄や青や、さまざまの縞模様を持った花火の束、中山寺の星下り、花合戦、枯れすすき。それから鼠花火というのは一つずつ輪になっていて箱に詰めてある。そんなものが変に私の心を唆った。',
    'それからまた、びいどろという色硝子で鯛や花を打ち出してあるおはじきが好きになったし、南京玉が好きになった。またそれを嘗めてみるのが私にとってなんともいえない享楽だったのだ。あのびいどろの味ほど幽かな涼しい味があるものか。私は幼い時よくそれを口に入れては父母に叱られたものだが、その幼時のあまい記憶が大きくなって落ち魄れた私に蘇えってくる故だろうか、まったくあの味には幽かな爽やかななんとなく詩美と言ったような味覚が漂って来る。',
    '察しはつくだろうが私にはまるで金がなかった。とは言えそんなものを見て少しでも心の動きかけた時の私自身を慰めるためには贅沢ということが必要であった。二銭や三銭のもの――と言って贅沢なもの。美しいもの――と言って無気力な私の触角にむしろ媚びて来るもの。――そう言ったものが自然私を慰めるのだ。',
    '生活がまだ蝕まれていなかった以前私の好きであった所は、たとえば丸善であった。赤や黄のオードコロンやオードキニン。洒落た切子細工や典雅なロココ趣味の浮模様を持った琥珀色や翡翠色の香水壜。煙管、小刀、石鹸、煙草。私はそんなものを見るのに小一時間も費すことがあった。そして結局一等いい鉛筆を一本買うくらいの贅沢をするのだった。しかしここももうその頃の私にとっては重くるしい場所に過ぎなかった。書籍、学生、勘定台、これらはみな借金取りの亡霊のように私には見えるのだった。',
    'ある朝――その頃私は甲の友達から乙の友達へというふうに友達の下宿を転々として暮らしていたのだが――友達が学校へ出てしまったあとの空虚な空気のなかにぽつねんと一人取り残された。私はまたそこから彷徨い出なければならなかった。何かが私を追いたてる。そして街から街へ、先に言ったような裏通りを歩いたり、駄菓子屋の前で立ち留まったり、乾物屋の乾蝦や棒鱈や湯葉を眺めたり、とうとう私は二条の方へ寺町を下り、そこの果物屋で足を留めた。ここでちょっとその果物屋を紹介したいのだが、その果物屋は私の知っていた範囲で最も好きな店であった。そこは決して立派な店ではなかったのだが、果物屋固有の美しさが最も露骨に感ぜられた。果物はかなり勾配の急な台の上に並べてあって、その台というのも古びた黒い漆塗りの板だったように思える。何か華やかな美しい音楽の快速調の流れが、見る人を石に化したというゴルゴンの鬼面――的なものを差しつけられて、あんな色彩やあんなヴォリウムに凝り固まったというふうに果物は並んでいる。青物もやはり奥へゆけばゆくほど堆高く積まれている。――実際あそこの人参葉の美しさなどは素晴しかった。それから水に漬けてある豆だとか慈姑だとか。',
    'またそこの家の美しいのは夜だった。寺町通はいったいに賑かな通りで――と言って感じは東京や大阪よりはずっと澄んでいるが――飾窓の光がおびただしく街路へ流れ出ている。それがどうしたわけかその店頭の周囲だけが妙に暗いのだ。もともと片方は暗い二条通に接している街角になっているので、暗いのは当然であったが、その隣家が寺町通にある家にもかかわらず暗かったのが瞭然しない。しかしその家が暗くなかったら、あんなにも私を誘惑するには至らなかったと思う。もう一つはその家の打ち出した廂なのだが、その廂が眼深に冠った帽子の廂のように――これは形容というよりも、「おや、あそこの店は帽子の廂をやけに下げているぞ」と思わせるほどなので、廂の上はこれも真暗なのだ。そう周囲が真暗なため、店頭に点けられた幾つもの電燈が驟雨のように浴びせかける絢爛は、周囲の何者にも奪われることなく、ほしいままにも美しい眺めが照らし出されているのだ。裸の電燈が細長い螺旋棒をきりきり眼の中へ刺し込んでくる往来に立って、また近所にある鎰屋の二階の硝子窓をすかして眺めたこの果物店の眺めほど、その時どきの私を興がらせたものは寺町の中でも稀だった。',
    'その日私はいつになくその店で買物をした。というのはその店には珍しい檸檬が出ていたのだ。檸檬などごくありふれている。がその店というのも見すぼらしくはないまでもただあたりまえの八百屋に過ぎなかったので、それまであまり見かけたことはなかった。いったい私はあの檸檬が好きだ。レモンエロウの絵具をチューブから搾り出して固めたようなあの単純な色も、それからあの丈の詰まった紡錘形の恰好も。――結局私はそれを一つだけ買うことにした。それからの私はどこへどう歩いたのだろう。私は長い間街を歩いていた。始終私の心を圧えつけていた不吉な塊がそれを握った瞬間からいくらか弛んで来たとみえて、私は街の上で非常に幸福であった。あんなに執拗かった憂鬱が、そんなものの一顆で紛らされる――あるいは不審なことが、逆説的なほんとうであった。それにしても心というやつはなんという不可思議なやつだろう。',
    'その檸檬の冷たさはたとえようもなくよかった。その頃私は肺尖を悪くしていていつも身体に熱が出た。事実友達の誰彼に私の熱を見せびらかすために手の握り合いなどをしてみるのだが、私の掌が誰のよりも熱かった。その熱い故だったのだろう、握っている掌から身内に浸み透ってゆくようなその冷たさは快いものだった。',
    '私は何度も何度もその果実を鼻に持っていっては嗅いでみた。それの産地だというカリフォルニヤが想像に上って来る。漢文で習った「売柑者之言」の中に書いてあった「鼻を撲つ」という言葉が断れぎれに浮かんで来る。そしてふかぶかと胸一杯に匂やかな空気を吸い込めば、ついぞ胸一杯に呼吸したことのなかった私の身体や顔には温い血のほとぼりが昇って来てなんだか身内に元気が目覚めて来たのだった。……',
    '実際あんな単純な冷覚や触覚や嗅覚や視覚が、ずっと昔からこればかり探していたのだと言いたくなったほど私にしっくりしたなんて私は不思議に思える――それがあの頃のことなんだから。',
    '私はもう往来を軽やかな昂奮に弾んで、一種誇りかな気持さえ感じながら、美的装束をして街を闊歩した詩人のことなど思い浮かべては歩いていた。汚れた手拭の上へ載せてみたりマントの上へあてがってみたりして色の反映を量ったり、またこんなことを思ったり、',
    '――つまりはこの重さなんだな。――',
    'その重さこそ常づね尋ねあぐんでいたもので、疑いもなくこの重さはすべての善いものすべての美しいものを重量に換算して来た重さであるとか、思いあがった諧謔心からそんな馬鹿げたことを考えてみたり――なにがさて私は幸福だったのだ。',
    'どこをどう歩いたのだろう、私が最後に立ったのは丸善の前だった。平常あんなに避けていた丸善がその時の私にはやすやすと入れるように思えた。',
    '「今日は一つ入ってみてやろう」そして私はずかずか入って行った。',
    'しかしどうしたことだろう、私の心を充たしていた幸福な感情はだんだん逃げていった。香水の壜にも煙管にも私の心はのしかかってはゆかなかった。憂鬱が立て罩めて来る、私は歩き廻った疲労が出て来たのだと思った。私は画本の棚の前へ行ってみた。画集の重たいのを取り出すのさえ常に増して力が要るな！と思った。しかし私は一冊ずつ抜き出してはみる、そして開けてはみるのだが、克明にはぐってゆく気持はさらに湧いて来ない。しかも呪われたことにはまた次の一冊を引き出して来る。それも同じことだ。それでいて一度バラバラとやってみなくては気が済まないのだ。それ以上は堪らなくなってそこへ置いてしまう。以前の位置へ戻すことさえできない。私は幾度もそれを繰り返した。とうとうおしまいには日頃から大好きだったアングルの橙色の重い本までなおいっそうの堪えがたさのために置いてしまった。――なんという呪われたことだ。手の筋肉に疲労が残っている。私は憂鬱になってしまって、自分が抜いたまま積み重ねた本の群を眺めていた。',
    '以前にはあんなに私をひきつけた画本がどうしたことだろう。一枚一枚に眼を晒し終わって後、さてあまりに尋常な周囲を見廻すときのあの変にそぐわない気持を、私は以前には好んで味わっていたものであった。……',
    '「あ、そうだそうだ」その時私は袂の中の檸檬を憶い出した。本の色彩をゴチャゴチャに積みあげて、一度この檸檬で試してみたら。「そうだ」',
    '私にまた先ほどの軽やかな昂奮が帰って来た。私は手当たり次第に積みあげ、また慌しく潰し、また慌しく築きあげた。新しく引き抜いてつけ加えたり、取り去ったりした。奇怪な幻想的な城が、そのたびに赤くなったり青くなったりした。',
    'やっとそれはでき上がった。そして軽く跳りあがる心を制しながら、その城壁の頂きに恐る恐る檸檬を据えつけた。そしてそれは上出来だった。',
    '見わたすと、その檸檬の色彩はガチャガチャした色の階調をひっそりと紡錘形の身体の中へ吸収してしまって、カーンと冴えかえっていた。私は埃っぽい丸善の中の空気が、その檸檬の周囲だけ変に緊張しているような気がした。私はしばらくそれを眺めていた。',
    '不意に第二のアイディアが起こった。その奇妙なたくらみはむしろ私をぎょっとさせた。',
    '――それをそのままにしておいて私は、なに喰わぬ顔をして外へ出る。――',
    '私は変にくすぐったい気持がした。「出て行こうかなあ。そうだ出て行こう」そして私はすたすた出て行った。',
    '変にくすぐったい気持が街の上の私を微笑ませた。丸善の棚へ黄金色に輝く恐ろしい爆弾を仕掛けて来た奇怪な悪漢が私で、もう十分後にはあの丸善が美術の棚を中心として大爆発をするのだったらどんなにおもしろいだろう。',
    '私はこの想像を熱心に追求した。「そうしたらあの気詰まりな丸善も粉葉みじんだろう」',
    'そして私は活動写真の看板画が奇体な趣きで街を彩っている京極を下って行った。',
];