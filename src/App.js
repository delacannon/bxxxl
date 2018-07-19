import React, { Component } from 'react';
import _ from 'lodash'

import { addGrid, updateGrid, spriteData } from "./actions";
import { connect } from "react-redux"

import Tiles from './components/Tiles'

const grid_items= ['', '', '', '','', '', '', ''];

var grid =  _.map(grid_items, (title, index) => {
  return {id: index, title: title, grids: _.map(_.range(8), index => {
    return {id: index, active: false};
  })}
});


class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      isDown: false
    }
  }

  onMouseDown(rowId, colId) {

    if(!this.state.isDown){
      let isActive = !this.props.grid[rowId].grids[colId].active ? true : false
      this.props.updateGrid(rowId, colId, isActive )
      this.setState({
        isDown:true
      })
    }

  }

  onMouseUp(){

    this.setState({
      isDown:false
    })

  }

  onMouseMove(rowId, colId){
    //let isActive = !this.props.grid[rowId].grids[colId].active ? true : false
    if(this.state.isDown){
      this.props.updateGrid(rowId, colId, true )
    }
  
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
        {this.props.grid!=null && <Tiles onMouseUp={this.onMouseUp.bind(this)} onMouseMove={this.onMouseMove.bind(this)} onMouseDown={this.onMouseDown.bind(this)} />}
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
