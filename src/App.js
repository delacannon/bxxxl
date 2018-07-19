import React, { Component } from 'react';
import _ from 'lodash'
import { addGrid, updateGrid, spriteData, spriteDataURL } from "./actions";
import { connect } from "react-redux"
import Tiles from './components/Tiles'
import {Container, Row, ButtonGroup,Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Stage, Layer, Rect, Text, Image } from 'react-konva';
import Konva from 'konva';

import header from './header.jpg'


class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      isDown: false,
      image:null
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
    this.props.spriteDataURL(this.canvas.getStage().toDataURL())
    
  }

  renderCanvas(){
    
    var m = this.props.grid

    return m.map( ( data, i) => {
       return _.map(_.range(8), j => {
            let a = _.pick(data.grids[j],['active']);
              if(a['active']){ 
                return <Rect fill={'black'} x={j} y={i} width={1} height={1} scaleX={1} scaleY={1}/>
                  
              }else{
                return <Rect fill={'white'} x={j} y={i} width={1} height={1} scaleX={1} scaleY={1}/>
              }
         })
    })

  }

  renderData(){

    var a = this.props.sprite_data
    var m= _.chunk(a,8)

    return m.map((e,i) => {
       return <span style={{fontSize:'1.4em'}}>{e.join("")}{(i%8==0) ? <br/> : <br/>}</span>
    })


  }
  
  render() {

    return (
  
      <Container fluid>
        <Row>
            <Col xs="12" sm="12">
             <div style={{height:380, background:`black`, backgroundSize:'cover'}}>
             </div>
            </Col>
        </Row>
        <hr />
        <h3>Create Patterns</h3>
        <hr />
        {this.props.grid!=null && 
        <Form>
         <FormGroup>
          <Row>
            <Col xs="12" sm="4">
              <Label for="tileName">Pattern Name</Label>
              <Input type="text" name="tileName" id="tileName" placeholder="Pattern" />
            </Col>
            <Col xs="12" sm="4">
              <Label for="tileName">Author Name</Label>
              <Input type="text" name="tileName" id="tileName" placeholder="Author" />
            </Col>
            <Col xs="12" sm="4">
              <Label for="tileName">Tags</Label>
              <Input type="text" name="tileName" id="tileName" placeholder="Enter tags separated by comas" />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row style={{border:'2px #000 solid'}} >
            <Col xs="12" sm="4" style={{background:'#000', height:248}}>
            <Tiles onMouseUp={this.onMouseUp.bind(this)} onMouseMove={this.onMouseMove.bind(this)} onMouseDown={this.onMouseDown.bind(this)} /></Col>
            
            <Col xs="12" sm="4"  style={{background:'#fff', height:248}}>
              <div style={{width:80, height:80, zoom:3, display:'block',
              margin:'1px auto',imageRendering:'pixelated', background:`url(${this.props.sprite_data_url})`}}></div>
            </Col>
            <Col  xs="12" sm="4" style={{background:'#000', height:248, color:'white', 
              fontFamily:'monospace',textAlign:'center'}}>
               {this.renderData()}
            </Col>
          </Row>
          </FormGroup>
          <FormGroup>
              <Row >
              <Col sm="12" md={{ size: 8, offset: 2 }} lg={{ size: 6, offset: 4}}>
              <ButtonGroup >
              <Button size='lg' disabled style={{background:'black'}}>Save Pattern</Button>
              <Button size='lg' style={{background:'black'}}>Clipboard Data</Button>
              <Button size='lg' style={{background:'black'}}>Download Pattern</Button>
             </ButtonGroup>
            </Col>
            </Row>
          </FormGroup>
        </Form>

      }
      <hr />
      <h3>Collective Patterns</h3>
      <hr/>
         <Stage style={{display:'none'}} ref={el => this.canvas = el} width={8} height={8}>
          <Layer>
              {this.renderCanvas()}
          </Layer>
        </Stage>
        </Container>



     
   
    );
  }

}


const mapStateToProps = ({ grid, sprite_data, sprite_data_url }) => ({ 
      grid: grid.grid,
      sprite_data: sprite_data.sprite_data,
      sprite_data_url: sprite_data_url.sprite_data_url
    });

export default connect(mapStateToProps, {addGrid, updateGrid, spriteData, spriteDataURL })(App);
