import React, { Component } from 'react'
import axios from 'axios';
import update from 'immutability-helper';

class CourseForm extends Component {
   constructor(props) {
    super(props)
    this.state = {
      title: this.props.course.title,
      description: this.props.course.description,
      capacity: this.props.course.capacity,
      address: this.props.course.address,

    }
  }





handleBlur = () => {
  const course = {
    title: this.state.title,
    description: this.state.description,
    address: this.state.address,

  }

  axios.put(
    `http://localhost:3001/api/v1/courses/${this.props.course.id}`,
    {
      course: course
    })
  .then(response => {
    console.log(response)
    this.props.updateCourse(response.data)
  })
  .catch(error => console.log(error))
}





 handleInput = (e) => {

  this.setState({[e.target.name]: e.target.value})
}


  render() {


    return (
      <div className="tile">
        <form onBlur={this.handleBlur} >


            <input className='input' type="text"
              name="title" placeholder='Enter a Title'
              value={this.state.title} onChange={this.handleInput} />
              <input className='input' type="text"
              name="address" placeholder='Enter an address'
              value={this.state.address} onChange={this.handleInput} />
            <textarea className='input' name="description"
              placeholder='Describe your course'
              value={this.state.description} onChange={this.handleInput}>

              <input className='input' type="text"
              name="capacity" placeholder='Capacity?'
              value={this.state.capacity} onChange={this.handleInput} />


            </textarea>
         </form>

      </div>
    );
  }
}

export default CourseForm;
