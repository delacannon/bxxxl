import React, { Component } from 'react';
import Cell from './Cell'

class Row extends Component {
  
  render(){
      
      var columns = this.props.row['grids'].map(column => {

      return (
            <Cell key={column['id']} 
                  active={column['active']} 
                  onMouseDown={this.props.onMouseDown}
                  onMouseMove={this.props.onMouseMove}
                  onMouseUp={this.props.onMouseUp} 
                  columnId={column['id']} 
                  rowId={this.props.row['id']}
            />
        );
      
      })
        return (
          <div className='gridRow'>
            <div className='title grid' id={this.props.row['id']}>{this.props.row['title']}</div>
            {columns}
          </div>
        );
 
  }

}

export default Row;