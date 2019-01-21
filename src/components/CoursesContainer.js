import React, { Component } from 'react';
import axios from 'axios';
import Course from './Course';
import update from 'immutability-helper';
import CourseForm from './CourseForm'

class CoursesContainer extends Component {

  constructor(props) {
  super(props)
  this.state = {
    courses: [],
    editingCourseId: null,
    notification: null

  }
}




  componentDidMount() {
  axios.get('http://localhost:3001/api/v1/courses.json')
  .then(response => {
    console.log(response)
    this.setState({courses: response.data})
  })
  .catch(error => console.log(error))
}


addNewCourse = () => {
  axios.post('http://localhost:3001/api/v1/courses',
   { course:
      {
        title: '',
        description: '',
        capacity: 0,
        address: '',
        liked: false,
      }
    }
  )
  .then(response => {
    console.log(response)
    const courses = update(this.state.courses, {
      $splice: [[0, 0, response.data]]
    })
    this.setState({
      notification: null,
      courses: courses,
      editingCourseId: response.data.id})
  })
  .catch(error => console.log(error))
}


updateCourse = (course) => {
  const courseIndex = this.state.courses.findIndex(x=> x.id === course.id)
  const courses = update(this.state.courses, {
    [courseIndex]: {$set: course }
  })
  this.setState({courses: courses, notification: 'All changes saved'})
  console.log(this.state.notification)
}



enableEditing = (id) => {

  this.setState({ editingCourseId: id})
}


likedHandler = (c) =>{
  const Index = this.state.courses.findIndex(x => x.id === c.id)
  const courseIndex = this.state.courses.find(x => x.id === c.id)
  courseIndex.liked = !courseIndex.liked
   const course = {
    liked: courseIndex.liked
  }
  axios.put(`http://localhost:3001/api/v1/courses/${c.id}`,
  {
      course: course
    })
 .then(response => {
    console.log(response)
    //this.props.updateCourse(response.data)
    const courses = update(this.state.courses, {
    [courseIndex]: {$set: course }
  })
    this.setState({courses: courses})
  })
  .catch(error => console.log(error))
}



deleteHandler = (id) => {
  axios.delete(`http://localhost:3001/api/v1/courses/${id}`)
  .then(response => {
    const courseIndex = this.state.courses.findIndex(x => x.id === id)
    const courses = update(this.state.courses, { $splice: [[courseIndex, 1]]})
    this.setState({courses: courses})
  })
  .catch(error => console.log(error))
}







  render() {
      this.state.courses.map((c) => {
      console.log(c.liked)
    })

    return (
      <div>


      <button className="newCourseButton" onClick={this.addNewCourse} >
         New Course
        </button>
        <span className="notification">
          {this.state.notification}
        </span>

        <div className="tiles">
      {this.state.courses.map((c) => {
      if (this.state.editingCourseId === c.id) {
        return(
          <div className="tile" key={c.id}>
            <CourseForm
            course={c}
            key={c.id}
            updateCourse={this.updateCourse}
            resetNotification={this.resetNotification} />
          </div>)
      } else {
        return( <div className="tile" key={c.id} >
          < Course
          erase={() => this.deleteHandler(c.id)}
          title={c.title} description={c.description}
          capacity ={c.capacity} address={c.address}
          clicked={() => this.enableEditing(c.id)}
          like ={() => this.likedHandler(c)}
          liked = {c.liked}

            />
          }
          }

        </div>
        )
      }})}


      </div>
      </div>
   )
  }
}

export default CoursesContainer;
