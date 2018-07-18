import React, { Component } from 'react';
import './App.css'
import _ from 'lodash'
import Immutable from 'immutable'


const instruments = [
  '', '', '', '',
  '', '', '', ''
];

var grid =  _.map(instruments, (title, index) => {
  return {id: index, title: title, grids: _.map(_.range(8), index => {
    return {name:'alvar',id: index, active: false};
  })}
});


class Cell extends Component {
  constructor(props){
    super(props)
  }
  
  render(){
      var divStyle = null,
          classes = this.props.active? 'checked grid' : 'grid';
      
      if (this.props.columnId == 0) {
          divStyle =  {clear: 'right'};
      }
  
      return (
        <div style={divStyle} 
          onClick={this.props.onClick.bind(null, this.props.rowId, this.props.columnId )} 
          className={classes} 
          id={this.props.columnId}>&nbsp;
        </div>
      );
 
  }

}

class Row extends Component {
  constructor(props){
    super(props)
  }
  
  render(){
      var columns = this.props.row.get('grids').map(column => {
          return (
              <Cell key={column.get('id')} active={column.get('active')} 
                      onClick={this.props.onClick}
                      columnId={column.get('id')} 
                      rowId={this.props.row.get('id')}/>
          );
        }).toArray();
        
        return (
          <div className='gridRow'>
            <div className='title grid' id={this.props.row.get('id')}>{this.props.row.get('title')}</div>
            {columns}
          </div>
        );
 
  }

}

class Sequencer extends Component {

  constructor(props){
    super(props)
  }

  render() {
    
      var rows = this.props.grid.map(row => {
        return (
          <Row key={Math.random()*100} row={row} onClick={this.props.onClick} />
        );
      }).toArray();

      return (
          <div className="sequencer">
              {rows}
          </div>
      );
    }
}

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      history: Immutable.List(),
      future: Immutable.List(),
      items: Immutable.fromJS(grid) 
    }



  }

  onClick(rowId, colId) {

    var newItems = this.state.items.updateIn([rowId, 'grids', colId, 'active'], active => !active);
    
    this.setState({
      history: this.state.history.push(this.state.items),
      items: newItems
    });

    var m = this.state.items.toJS()
    m.map( (data) => {
      console.log(data.grids)
    })

  }
  
  undo() {
    if (this.state.history.size < 1) return;
    this.setState({
      history: this.state.history.pop(),
      future: this.state.future.push(this.state.items),
      items: this.state.history.last()
    });
  }
  
  redo() {
    if (this.state.future.size < 1) return;
    this.setState({
      items: this.state.future.last(),
      history: this.state.history.push(this.state.items),
      future: this.state.future.pop()
    });
  }
  
  render() {
    return (
      <div>
        <Sequencer onClick={this.onClick.bind(this)} grid={this.state.items} />
        <button className="btn btn-default" disabled={this.state.history.size < 1} onClick={this.undo.bind(this)}>Undo</button>
        <button className="btn btn-default" disabled={this.state.future.size < 1} onClick={this.redo.bind(this)}>Redo</button>
      </div>
    );
  }

}

export default App;
