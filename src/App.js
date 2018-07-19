import React, { Component } from 'react';
import _ from 'lodash'
import { addGrid, updateGrid, spriteData } from "./actions";
import { connect } from "react-redux"
import Tiles from './components/Tiles'
import {Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Stage, Layer, Rect, Text } from 'react-konva';
import Konva from 'konva';

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      isDown: false
    }

    let number = 8
    this.grid_items = _.range(number)

    this.grid =  _.map(this.grid_items, (title, index) => {
      return {id: index, grids: _.map(_.range(number), index => {
        return {id: index, active: false};
      })}
    });

  }

  onMouseDown(rowId, colId,e) {

if(e.nativeEvent.which === 1 || e.type==='click'){
    if(!this.state.isDown){
      let isActive = !this.props.grid[rowId].grids[colId].active ? true : false
      this.props.updateGrid(rowId, colId, isActive )
      this.setState({
        isDown:true
      })
    }
  }

  }

  onMouseUp(){

    this.setState({
      isDown:false
    })

  }

  onMouseMove(rowId, colId,e){
    
    let posx = Math.floor(e.clientX/30)
    let posy = Math.floor(e.clientY/30)
    let isActive = !this.props.grid[rowId].grids[colId].active ? true : false

    if(this.state.isDown){
      //let isActive = !this.props.grid[rowId].grids[colId].active ? true : false
      this.props.updateGrid(rowId, colId, true )

    }
  
  }

  componentDidMount(){

   this.props.addGrid(this.grid)

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
      <Container>
        {this.props.grid!=null && 
        <Form>
         <FormGroup>
          <Row>
          <Col xs="6" sm="4">
            <Label for="tileName">Tile Name</Label>
            <Input type="text" name="tileName" id="tileName" placeholder="Enter tile name" />
          </Col>
          <Col xs="6" sm="4">
            <Label for="tileName">Author Name</Label>
            <Input type="text" name="tileName" id="tileName" placeholder="Enter tile name" />
          </Col>
          <Col xs="6" sm="4">
            <Label for="tileName">Tags</Label>
            <Input type="text" name="tileName" id="tileName" placeholder="Enter tile name" />
          </Col>
          </Row>
        </FormGroup>
        
          <Row>
            <Col xs="6" sm="4"><Tiles onMouseUp={this.onMouseUp.bind(this)} onMouseMove={this.onMouseMove.bind(this)} onMouseDown={this.onMouseDown.bind(this)} />
            </Col>
            <Col xs="6" sm="4">
             <p>{/*this.props.sprite_data*/}</p>
            </Col>
            <Col xs="6" sm="4">
               <Stage width={8} height={8} scaleX={4} scaleY={4}>
                <Layer>
                    <Rect fill={'black'} x={0} y={0} width={1} height={1}/>
                </Layer>
               </Stage>
            </Col>
          </Row>
        </Form>
      }
        
        </Container>
     </div>
    );
  }

}


const mapStateToProps = ({ grid, sprite_data }) => ({ 
      grid: grid.grid,
      sprite_data: sprite_data.sprite_data
    });

export default connect(mapStateToProps, {addGrid, updateGrid, spriteData })(App);
