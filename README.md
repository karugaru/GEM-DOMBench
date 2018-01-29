View on this link.
https://webdino.github.io/GEM-DOMBench/

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).  


## アイコン素材サイト:  
[FLAT ICON DESIGN](http://flat-icon-design.com/)  
[ICONSDB](https://www.iconsdb.com/)  
[フリー素材ぱくたそ](http://www.pakutaso.com)  

## 説明：  
このアプリはDOM操作がG1M(など)の上できちんと高速に動作することを  
検証し、デモとして閲覧することを目的に作られたアプリです。 

最初のページ(メインページ)に大きなボタンが4つ表示され、それらのボタンから  
各フォームに遷移できます。  
ページは遷移しておらず、DOM要素の追加、削除のみでフォームが変わります。  
Runボタンを押下すると、待機時間がなく、高速で遷移するデモが流れます。
各アプリ画面からはBackボタンを押下すると、メインページに戻ります。
CSSアニメーションはメインページにしか使用していません。  

1つ目のフォームはテキストチャットアプリを模したデモです。
Slackのようなメッセンジャーアプリを想定しています。
大量の要素を配置、表示したときに問題がないかをチェックする意味も兼ねています。
これらはli、div、p要素などで構成されています。

2つ目のフォームは写真管理アプリを模したデモです。
大量の画像要素を配置、表示したときに問題がないかをチェックする意味も兼ねています。
これらはdiv、img要素などで構成されています。画像を選択して効果をかけることができます。

3つ目のフォームはビル管理システムを模したデモです。
各階の各部屋の電気や施錠などをリモートコントロールするシステムを想定しています。
また、画面幅に応じていくつかの項目が省略されます。
これらはテーブル要素、input、label要素などで構成されています。

4つ目のフォームはお天気アプリを模したデモです。
気温、湿度、風速などを表にし、グラフを表示します。
グラフ描画にはChart.jsを使用しています。グラフの各点をクリックすると表の対応した部分に移動します。
これらはテーブル要素、canvas要素などで構成されています。

## 負荷
各フォームに表示される要素数はsrc/App.tsxの最初に書いてあるpageX～変数を書き換えることで変更できます。  
変更したら、ビルドして下さい。

## ベンチマーク結果
#### 環境  
* OS: Windows10  
* PC: LZ650/S  
* 負荷設定: ソースコード引用  
```Typescript
export const pageElementMax: number = 100; //1セクションに同時に表示する項目数の最大値
export const page1ChannelNum: number = 100;
export const page1MessageNum: number = 1200;
export const page1UserNum: number = 100;
export const page2ImageNum: number = 11;
export const page2ImageViewNum: number = 1500;
export const page3FloorNum: number = 120;
export const page3RoomNum: number = 40;
export const page4DataNum: number = 350;
```
#### 結果  
* ページ1: 10.65sec  
* ページ2: 12.72sec  
* ページ3: 16.38sec  
* ページ4: 15.79sec  
* 合計: 55.54sec  

## コーディング・ビルド手順  
### 必要条件：  
Node >= 6   
### 手順：  
・このプロジェクトをクローンする  
・npm install create-react-app か npm install -g create-react-app を実行する  
・npm install を実行する  
・npm start を実行してコーディングする  
  この状態ではソースコードを更新すると即座に画面に反映されるので作業中は便利  
・npm run build でビルドする  
  これでビルドできる。  
・npm run deploy でGitHub Pagesにデプロイする。
