import React, {Component} from 'react'
import { MDBIcon } from "mdbreact";

class  Course extends Component{

   constructor(props) {
  super(props)
  this.state = {
   count : 0,
  }
}



  render () {
    let urgence = "Urgent"

    if (this.props.capacity === 2) {
      urgence = "Semi-urgent"
    } else if (this.props.capacity === 1) {
        urgence = "Pas urgent"
    }

let liked = <p className="check full"> <MDBIcon icon="check"/> </p>
console.log(this.props.liked)
if (this.props.liked === false)
 {liked = <p className="check empty"> <MDBIcon icon="check"/> </p>}


return (
  <div >
    <div className= {"urgence" +this.props.capacity} onClick={this.props.clicked} >
    {urgence}
    </div>
    <span className="deleteButton" onClick={this.props.erase}>
      <MDBIcon icon="times"/>
    </span>
    <div className="Like" onClick={this.props.like}>
                    {liked}
            </div>
      <h4 onClick={this.props.clicked} >{this.props.title} </h4>
      <p className="cat" onClick={this.props.clicked} >{this.props.category}</p>
      <p  onClick={this.props.clicked} >{this.props.description}</p>

      <p> {this.props.liked} </p>

  </div>

  )

  }
}


export default Course;
