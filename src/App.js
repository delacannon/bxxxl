import React, { Component } from 'react';
import _ from 'lodash'
import Immutable from 'immutable'

import Sequencer from './components/Sequencer'

const instruments = [
  '', '', '', '',
  '', '', '', ''
];

var grid =  _.map(instruments, (title, index) => {
  return {id: index, title: title, grids: _.map(_.range(8), index => {
    return {name:'alvar',id: index, active: false};
  })}
});


class App extends Component {

  constructor(props){
    super(props)

    this.result = ''
    this.state = {
      items: Immutable.fromJS(grid),
    }

  }

  onClick(rowId, colId) {

    var newItems = this.state.items.updateIn([rowId, 'grids', colId, 'active'], active => !active);
    
    this.setState({
      items: newItems
    });

  }

  componentDidMount(){

    var m = this.state.items.toJS()

    m.map( (data,i) => {
       _.map(_.range(8), i => {
          let a = _.pick(data.grids[i],['active']);
             (a['active']) ? this.result+=1 : this.result+=0;
       })
    })

  }
  
  componentDidUpdate(){
   
   /*
    this.result=''
    var m = this.state.items.toJS()

    m.map( (data,i) => {
       _.map(_.range(8), i => {
          let a = _.pick(data.grids[i],['active']);
             (a['active']) ? this.result+=1 : this.result+=0;
       })
    })

    this.setState({
      result: this.result
    })
    */
    
  }
 
  
  render() {
    return (
      <div>
        <Sequencer onClick={this.onClick.bind(this)} grid={this.state.items} />
        <p>{this.result}</p>
     </div>
    );
  }

}

export default App;
