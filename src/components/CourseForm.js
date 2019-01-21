import React, { Component } from 'react'
import axios from 'axios';


class CourseForm extends Component {
   constructor(props) {
    super(props)
    this.state = {
      title: this.props.course.title,
      description: this.props.course.description,
      capacity: this.props.course.capacity,
      category: this.props.course.category
      //address: this.props.course.address,

    }
  }





handleBlur = () => {
  const course = {
    title: this.state.title,
    description: this.state.description,
    //address: this.state.address,
    capacity: this.state.capacity,
    category: this.state.category

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


            <p> <input className='input' type="text"
              name="title" placeholder='Enter a Title'
              value={this.state.title} onChange={this.handleInput} /> </p>
              <label>
         Category:
          <select name="category" value={this.state.category} onChange={this.handleInput}>
            <option value="Professional">Professional</option>
            <option value="Personnal">Personnal </option>
            <option value="Leisure">Leisure</option>

          </select>
        </label>
            <p> Urgence level <input name="capacity" type='number' placeholder='Urgence level'
            max={3} min={1} onChange={this.handleInput} value={this.state.capacity} /> </p>
            <p> <textarea className='input' name="description"
              placeholder='Describe your course'
              value={this.state.description} onChange={this.handleInput}>
            </textarea></p>
         </form>

      </div>
    );
  }
}

export default CourseForm;
