import React, { Component } from 'react';
import Row from './Row'

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

export default Sequencer