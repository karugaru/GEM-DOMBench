import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

registerServiceWorker();

function makeRenderPromise(reactElement: React.ReactElement<any>, ms: number): Promise<any> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      ReactDOM.render(
        reactElement,
        document.getElementById('root') as HTMLElement
      );
      resolve();
    }, ms);
  });
}

document.addEventListener('DOMContentLoaded', function (e) {
  Promise.resolve()
    .then(() => {
      return makeRenderPromise(<App name="A" />, 1000);
    })
    .then(() => {
      return makeRenderPromise(<App name="B" />, 1000);
    })
    .then(() => {
      return makeRenderPromise(<App name="C" />, 1000);
    })
    .catch(() => { alert("Error!"); });




});
