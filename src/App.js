import React, { Component } from 'react';
import _ from 'lodash'
import Immutable from 'immutable'

import { addGrid, updateGrid, spriteData } from "./actions";
import { connect } from "react-redux"

import Sequencer from './components/Sequencer'

const grid_items= [
  '', '', '', '',
  '', '', '', ''
];

var grid =  _.map(grid_items, (title, index) => {
  return {id: index, title: title, grids: _.map(_.range(8), index => {
    return {id: index, active: false};
  })}
});


class App extends Component {

  constructor(props){
    super(props)

  }

  onClick(rowId, colId) {

    let isActive = !this.props.grid[rowId].grids[colId].active ? true : false
    this.props.updateGrid(rowId, colId, isActive )

  }

  componentDidMount(){

   this.props.addGrid(grid)

  }

  componentDidUpdate(){
    
    var m = this.props.grid
    var result = ''

    m.map( ( data, i) => {
      _.map(_.range(8), i => {
            let a = _.pick(data.grids[i],['active']);
              (a['active']) ? result+=1 : result+=0;
         })
    })

    this.props.spriteData(result)

  }
  
  render() {
    return (
      <div>
        {this.props.grid!=null && <Sequencer onClick={this.onClick.bind(this)} />}
        {this.props.sprite_data}
     </div>
    );
  }

}


const mapStateToProps = ({ grid, sprite_data }) => ({ 
      grid: grid.grid,
      sprite_data: sprite_data.sprite_data
    });

export default connect(mapStateToProps, {addGrid, updateGrid, spriteData })(App);
