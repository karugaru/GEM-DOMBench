This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

アイコン素材サイト:
    http://flat-icon-design.com/
    https://www.iconsdb.com/

説明：
このアプリはDOM操作がG1M(など)の上できちんと高速に動作することを
検証し、デモとして閲覧することを目的に作られたアプリです。
最初のページにボタンが6つ表示され、それらのボタンのうち5つから
各フォームに遷移するデモが流れます。ページは遷移しておらず、
DOM要素の追加、削除のみでフォームが変わります。
すべてのページに遷移し終わったのちに、待機時間がなく、高速で
遷移するデモを流して、デモは終了します。
現在はリロードボタンを押してもデモが再生されないのでご注意ください。
CSSアニメーションは最初の6つもボタンのページにしか使用していません。

コーディング・ビルド手順
必要条件：
Node >= 6 
手順：
・このプロジェクトをクローンする
・npm install create-react-app か npm install -g create-react-app を実行する
・npm install を実行する
・npm start を実行してコーディングする
  この状態ではソースコードを更新すると即座に画面に反映されるので作業中は便利
・npm run build でビルドする
  これでビルドできる。
  buildディレクトリ以下のファイルをそのままコピーするとindex.htmlのファイル参照が
  絶対パスになっていてローカルで閲覧できないので、index.html内の各参照パスの
  先頭の「/」を取り除くこと。

