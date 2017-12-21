import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

var interrupted: boolean = false;
var nowPage: number = -1;

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

function pushingButtonScene(promise: Promise<any>, buttonNo: number): Promise<any> {
    let selecterStr: string = '.all-container-0 .box[value="box' + buttonNo + '"]';
    return promise.then(() => {
        return makePromise(() => {
            let elem: Element | null = document.querySelector(selecterStr);
            if (elem !== null) {
                elem.className += ' boxhover';
            }
        }, 2000);
    }).then(() => {
        return makePromise(() => {
            let elem: Element | null = document.querySelector(selecterStr);
            if (elem !== null) {
                elem.className += ' boxactive';
            }
        }, 500);
    }).then(() => {
        return makePromise(() => {
            let elem: Element | null = document.querySelector(selecterStr);
            if (elem !== null) {
                elem.className = elem.className.split(' ')[0];
            }

        }, 500);
    });
}

export function setNowPage(pageNo: number) {
    interrupted = true;

    nowPage = pageNo;
    if (nowPage !== 5) {
        ReactDOM.render(<App page={(nowPage + 1).toString()} />, document.getElementById('root') as HTMLElement);
    } else {
        setTimeout(() => {
            demo();
        }, 0);

    }
}

function demo() {
    interrupted = false;

    let promise: Promise<any> = Promise.resolve();
    promise = promise.then(() => {
        return makeRenderPromise(<App page="0" />, 0);
    });

    promise = pushingButtonScene(promise, 0);
    promise = promise.then(() => {
        return makeRenderPromise(<App page="1" />, 500);
    }).then(() => {
        return makePromise(() => { }, 0);
    }).then(() => {
        return makeRenderPromise(<App page="0" />, 3000);
    });

    promise = pushingButtonScene(promise, 1);
    promise = promise.then(() => {
        return makeRenderPromise(<App page="2" />, 500);
    }).then(() => {
        return makePromise(() => { }, 0);
    }).then(() => {
        return makeRenderPromise(<App page="0" />, 3000);
    });

    promise = pushingButtonScene(promise, 2);
    promise = promise.then(() => {
        return makeRenderPromise(<App page="3" />, 500);
    }).then(() => {
        return makePromise(() => { }, 0);
    }).then(() => {
        return makeRenderPromise(<App page="0" />, 2000);
    });

    promise = pushingButtonScene(promise, 3);
    promise = promise.then(() => {
        return makeRenderPromise(<App page="4" />, 500);
    }).then(() => {
        return makePromise(() => { }, 0);
    }).then(() => {
        return makeRenderPromise(<App page="0" />, 2000);
    });

    promise = pushingButtonScene(promise, 4);
    promise = promise.then(() => {
        return makeRenderPromise(<App page="5" />, 500);
    }).then(() => {
        return makePromise(() => { }, 0);
    }).then(() => {
        return makeRenderPromise(<App page="0" />, 2000);
    });

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
            return makeRenderPromise(<App page="5" />, 0);
        }).then(() => {
            return makeRenderPromise(<App page="0" />, 0);
        })

        /*.then(() => {
          return makeRenderPromise(<App page="B" />, 1000);
        })
        .then(() => {
          return makeRenderPromise(<App page='C' />, 1000);
        })*/
        .catch(() => { });

}

document.addEventListener('DOMContentLoaded', function (e) {
    demo();
});
