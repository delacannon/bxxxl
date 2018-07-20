import React, { Component } from 'react';
import Row from './Row'

import { connect } from "react-redux"

class Tiles extends Component {

  render() {

     var rows = this.props.grid.map(row => {
        return (
          <Row key={Math.random()*9999} 
               row={row} 
               onMouseDown={this.props.onMouseDown} 
               onMouseUp={this.props.onMouseUp} 
               onMouseMove={this.props.onMouseMove} />
        );
      })

      return (
          <div className="TilesCanvas">
              {rows}
          </div>
      );
      
    }
}

const mapStateToProps = ({ grid }) => ({ 
      grid: grid.grid
    });

export default connect(mapStateToProps, null)(Tiles);