import React, {Component} from 'react'

class Cell extends Component {
  constructor(props){
    super(props)
  }
  
  render(){

      var divStyle = null,
          classes = this.props.active? 'checked grid' : 'grid';
      
      if (this.props.columnId === 0) {
          divStyle =  {clear: 'right'};
      }
  
      return (
        <div style={divStyle} 
          onClick={this.props.onClick.bind(null, this.props.rowId, this.props.columnId )} 
          className={classes} 
          id={this.props.columnId}>
        </div>
      );
  }
}

export default Cell