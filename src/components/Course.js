import React, {Component} from 'react'
import axios from 'axios';
import { MDBIcon } from "mdbreact";

class  Course extends Component{

   constructor(props) {
  super(props)
  this.state = {
   count : 0,
  }
}



  render () {

let liked = <p className="empty"> <MDBIcon icon="heart"/> </p>
console.log(this.props.liked)
if (this.props.liked === false)
 {liked = <p className="full"> <MDBIcon icon="heart"/> </p>}


return (
  <div className="tile"  >
  <span className="deleteButton" onClick={this.props.erase}>
    x
  </span>
  <button className="Like" onClick={this.props.like}>
                  {liked}
          </button>

    <h4 onClick={this.props.clicked} >{this.props.title} </h4>
    <p onClick={this.props.clicked} >{this.props.description}</p>
    <p> {this.props.capacity}  </p> <MDBIcon icon="camera-retro"/> fa-camera-retro
    <p> {this.props.liked} </p>
    <p onClick={this.props.clicked} >{this.props.address} </p>
  </div>
  )

  }
}


export default Course;
