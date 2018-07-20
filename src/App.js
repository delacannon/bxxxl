import React, { Component } from 'react';
import _ from 'lodash'
import { addGrid, updateGrid, spriteData, spriteDataURL } from "./actions";
import { connect } from "react-redux"
import Tiles from './components/Tiles'
import {CardImg, CardTitle, CardText, CardDeck, Card,CardColumns,
 CardSubtitle, CardBody, Container, Row, ButtonGroup, CardFooter,
 Col, Button, Form, FormGroup, Label, Input, FormText,Fade } from 'reactstrap';
import { Stage, Layer, Rect, Text, Image } from 'react-konva';
import Konva from 'konva';

import NotificationSystem from 'react-notification-system'

import header from './header.jpg'


var style = {
  NotificationItem: { // Override the notification item
    DefaultStyle: { // Applied to every notification, regardless of the notification level
      margin: '10px',
      fontSize:'1.2em'
    },

    success: { // Applied only to the success notification item
      color: 'white',
      background:'black'
    }
  }
}


class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      isDown: false,
      image:null,
      name:'',
      tags:'',
      gss:[]
    }
    this.ns = null
    let number = 8
    this.grid_items = _.range(number)

    this.grid =  _.map(this.grid_items, (title, index) => {
      return {id: index, grids: _.map(_.range(number), index => {
        return {id: index, active: false};
      })}
    });

  }

  addNotification(id){
      var self = this;
      this.ns.addNotification({
        message: `🙌 New Pattern Added, ${id}!`,
        level: 'success',
        autoDismiss:2,
        onRemove:function () { 
              self.setState({
                loadingCard:false
              })
         }
      });

      fetch("https://spreadsheets.google.com/feeds/list/1K7eINSHdez459GW6XfEfKC4PaNa7hLePh-IrWc-DKm8/od6/public/values?alt=json")
      .then(res => res.json())
      .then(data =>{
        this.setState({
          gss:data.feed.entry
      })
    })
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

  handleExportClick = () => {
    
    if(this.state.name.length>0 && this.state.tags.length>0){
    const url = "https://script.google.com/macros/s/AKfycbxl1Fh84h24QCOtAczh4GB4X4qKBIXo8gsr7kZ82CJ48wBnfn8/exec"
    const method = "POST";
    const body = new FormData(this.form)
    var self = this;
    fetch(url, { method, body })
          .then(res => {
              self.addNotification('Card name')
              console.log('...saved!')
    })
    }else{
      alert("Add a name and tags")
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

  fetch("https://spreadsheets.google.com/feeds/list/1K7eINSHdez459GW6XfEfKC4PaNa7hLePh-IrWc-DKm8/od6/public/values?alt=json")
      .then(res => res.json())
      .then(data =>{
        this.setState({
          gss:data.feed.entry
      })
    })

   this.props.addGrid(this.grid)

   this.ns = this.refs.notificationSystem;

  }

  componentDidUpdate(){
  
    var m = this.props.grid
    var result = ''

    m.map(( data, i) => {
      _.map(_.range(8), i => {
            let a = _.pick(data.grids[i],['active']);
            (a['active']) ? result+=1 : result+=0;
         })
    })

    console.log()

    this.props.spriteData(result)
    this.props.spriteDataURL(this.canvas.getStage().toDataURL())

  }


  renderCards(){



   return this.state.gss.map( entry => {
    return (
        <Card className='mb-4'>
          <CardImg top width="100%" src={entry.gsx$image.$t} alt={entry.gsx$name.$t} style={{imageRendering:'pixelated'}} />
          <CardBody>
            <CardTitle>{entry.gsx$name.$t}</CardTitle>
            <CardSubtitle>{entry.gsx$tags.$t}</CardSubtitle>
            <CardText>
               <div style={{width:'100%', height:'64px', zoom:3, display:'block',
              margin:'1px auto',imageRendering:'pixelated', background:`url(${entry.gsx$image.$t})`}}></div>
            </CardText>
          </CardBody>
          <CardFooter><a href="#" style={{color:'black'}}>Get Data</a></CardFooter>
        </Card>
      )

    })


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
    console.log(a)
    return m.map((e,i) => {
       return <span style={{fontSize:'1.4em'}}>{e.join("")}{(i%8===0) ? <br/> : <br/>}</span>
    })

  }

  handleChange(e){

      this.setState({
        name:e.target.name==="name" ? e.target.value : this.state.name,
        tags:e.target.name==="tags" ? e.target.value : this.state.tags
      })

  }
  
  render() {

    return (
    
      <Container fluid>
      <NotificationSystem ref="notificationSystem" style={style} />
        <Row>
          <Col style={{height:'300px',backgroundSize:'cover',background:'#000'}}>
          </Col>
      </Row>
        <hr />
        <h3 style={{textAlign:'center'}}>Pattern Editor</h3>
        <hr />
        {this.props.grid!=null && 
        <Form name="my-form" innerRef={el => this.form = el}>
         <FormGroup> 
          <Row>
            <Col xs="12" sm="4">
              <Label for="tileName1">Pattern Name</Label>
              <Input type="text" name="name" id="tileName1" onChange={this.handleChange.bind(this)}  placeholder="Pattern" />
            </Col>
            <Col xs="12" sm="4">
              <Label for="authorName">Author Name</Label>
              <Input type="text" name="author" id="authorName" placeholder="Author" />
            </Col>
            <Col xs="12" sm="4">
              <Label for="tagNames">Tags</Label>
              <Input type="text" name="tags" id="tagNames" onChange={this.handleChange.bind(this)}  
                     placeholder="Enter tags separated by comas" />
            </Col>
            <Input type="hidden" name="data"  value={this.props.sprite_data}/>
            <Input type="hidden" name="image" value={this.props.sprite_data_url}/>
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
            <Col xs="12" sm="4" style={{background:'#000', height:248, color:'white', 
              fontFamily:'monospace',textAlign:'center'}}>
               <br/>{this.renderData()}
            </Col>
          </Row>
          </FormGroup>
          <FormGroup>
            <Row >
              <Col sm="12">
                <ButtonGroup >
                <Button size='lg' className={`${ (this.state.name.length>0 && this.state.tags.length>0) ? '':'disabled'} `} style={{background:'black'}} onClick={() => this.handleExportClick()}>Save Pattern</Button>
                <Button size='lg' style={{background:'black'}} onClick={() => this.handleExportClick()}>Reset Pattern</Button>
                {/*<Button size='lg' style={{background:'black'}}>Clipboard Data</Button>
                <Button size='lg' style={{background:'black'}}>Download Pattern</Button>*/}
               </ButtonGroup>
              </Col>
            </Row>
          </FormGroup>
        </Form>
      }
      <div>
       <Row>
          <Col style={{height:'200px',backgroundSize:'cover',background:'#000'}}>
          </Col>
      </Row>
        <hr/>
          <h3 style={{textAlign:'center'}}>Patterns List</h3>
        <hr/>
      </div>
       <Row>
        <Col xs="12" sm="12" lg="12">
        <CardColumns className="columns">
             {(this.state.gss!=null && this.state.gss.length!=0) && this.renderCards()}
          </CardColumns>
        </Col>
      </Row>
         <Stage style={{display:'none'}} ref={el => this.canvas = el} width={8} height={8}>
          <Layer>
              {this.renderCanvas()}
          </Layer>
        </Stage>
         <Row>
          <Col style={{height:'200px',backgroundSize:'cover',background:'#000'}}>
          </Col>
      </Row>
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
