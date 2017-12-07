import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import './App.css';


interface ButtonProps {
  children: number[];
}
class Button extends React.Component<ButtonProps> {
  public render(): React.ReactNode {
    const children: React.ReactNode[] = [];
    for (let i = 0; i < this.props.children.length; i++) {
      const n = this.props.children[i];
      children.push(<li><input type="button" value={"button" + n} /></li>);
    }
    return <ul>{children}</ul>;
  }
}


class App extends React.Component {
  public render(): React.ReactNode {
    const ary: number[] = [];
    for (let i = 0; i < 100; i++) {
      ary.push(i);
    }
    return (
      <div className="test">
        <Button children={ary} />
      </div>
    );
  }
}

export default App;
