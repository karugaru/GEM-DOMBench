import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import './App.css';

/*
<a href="https://google.com">Link</>
table
canvas
<label><input type="checkbox" name="hobby" value="sports">スポーツ</label>
<LABEL>進捗状況（ 30 ％）： <PROGRESS VALUE="30" MAX="100"></PROGRESS></LABEL>　
<fieldset></fieldset>
*/

function makeArray(start: number, stop: number, stride: number): number[] {
  const ary: number[] = [];
  for (let i = start; i <= stop; i += stride) {
    ary.push(i);
  }
  return ary;
}

interface ButtonProps {
  children: number[];
}
class Button extends React.Component<ButtonProps> {
  public render(): React.ReactNode {
    const children: React.ReactNode[] = [];
    for (let i = 0; i < this.props.children.length; i++) {
      const n = this.props.children[i];
      var color = (Math.random() * 0xFFFFFF | 0).toString(16);
      var randomColor = "#" + ("000000" + color).slice(-6);
      children.push(<li><input type="button" value={"button" + n} style={{backgroundColor: randomColor}}/></li>);
    }
    return <ul>{children}</ul>;
  }
}

interface TableCellProps {
  children: number[];
}
class TableCell extends React.Component<TableCellProps> {
  public render(): React.ReactNode {
    const children: React.ReactNode[] = [];
    for (let i = 0; i < this.props.children.length; i++) {
      const n = this.props.children[i];
      children.push(<Button children={[n]}/>);
    }
    return <td>{children}</td>;
  }
}

interface TableRowProps {
  children: number[];
}
class TableRow extends React.Component<TableRowProps> {
  public render(): React.ReactNode {
    const children: React.ReactNode[] = [];
    for (let i = 0; i < this.props.children.length; i++) {
      children.push(<TableCell children={makeArray(this.props.children[0], this.props.children[0] + 9, 1)} />);
    }
    return <tr>{children}</tr>;
  }
}

interface TableProps {
  children: number[];
}
class Table extends React.Component<TableProps> {
  public render(): React.ReactNode {
    const children: React.ReactNode[] = [];
    for (let i = 0; i < this.props.children.length; i++) {
      const n = this.props.children[i];
      children.push(<TableRow children={makeArray(0, n, 1)} />);
    }
    return <table>{children}</table>;
  }
}


interface AppProps {
  name: string;
}
class App extends React.Component<AppProps> {
  public render(): React.ReactNode {
    return (
      <div className="test">
        <h1>{this.props.name}</h1>
        <Table children={[7,6,5]} />
      </div>
    );
  }
}

export default App;
