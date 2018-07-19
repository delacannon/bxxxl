import React, { Component } from 'react';
import Row from './Row'

import { connect } from "react-redux"

class Sequencer extends Component {


  constructor(props){
    super(props)
  }


  render() {

     var rows = this.props.grid.map(row => {
        return (
          <Row key={Math.random()*100} row={row} onClick={this.props.onClick} />
        );
      })

      return (
          <div className="sequencer">
              {rows}
          </div>
      );
      
    }
}

const mapStateToProps = ({ grid }) => ({ 
      grid: grid.grid
    });

export default connect(mapStateToProps, null)(Sequencer);