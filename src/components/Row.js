import React, { Component } from 'react';
import Cell from './Cell'
import _ from 'lodash'

class Row extends Component {
  constructor(props){
    super(props)

    console.log('row', this.props.row['grids'])


  }
  
  render(){
      
      var columns = this.props.row['grids'].map(column => {

      return (
            <Cell key={column['id']} 
                  active={column['active']} 
                  onClick={this.props.onClick}
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