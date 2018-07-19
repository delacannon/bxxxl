import React, {Component} from 'react'

class Cell extends Component {
 
   render(){
      console.log(this.props)
      var divStyle = null,
          classes = this.props.active? 'checked grid' : 'grid';
      
      if (this.props.columnId === 0) {
          divStyle =  {clear: 'right'};
      }
  
      return (
        <div style={divStyle} 
          onMouseDown={this.props.onMouseDown.bind(null, this.props.rowId, this.props.columnId )} 
          onMouseMove={this.props.onMouseMove.bind(null, this.props.rowId, this.props.columnId )}
          onMouseUp={this.props.onMouseUp.bind()}
          className={classes} 
          id={this.props.columnId}>
        </div>
      );
  }
}

export default Cell
