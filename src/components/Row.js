import React, { Component } from 'react';
import Cell from './Cell'


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

export default Row;