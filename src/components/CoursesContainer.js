import React, { Component } from 'react';
import axios from 'axios';
import Course from './Course';
import update from 'immutability-helper';
import CourseForm from './CourseForm';
import { MDBIcon } from "mdbreact";

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
        category: '',
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
  this.setState({courses: courses, notification: 'All changes saved !', editingCourseId: null})
  console.log(this.state.notification)
}



enableEditing = (id) => {

  this.setState({ editingCourseId: id, notification: null})
}


likedHandler = (c) =>{

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
    let doneCount = 0;
     let urgentCount =0;
     let semiUrgentCount=0;
     let taskCount = this.state.courses.length
     console.log(this.state.courses.length)

     this.state.courses.map((c) => {
        if  (c.liked) {
          doneCount++
        } else {
          if (c.capacity === 3) {
          urgentCount++ }
          else if  (c.capacity === 2) {
            semiUrgentCount++
          }
        }})
     let ratio = (doneCount + 1) /taskCount * 100



    return (
      <div>

      <div className="header">
      <div className="h blue"> <h3> {doneCount + 1} </h3> <p> tasks done </p>  </div>
      <div className="h pink">  <h3>  {urgentCount} </h3>  <p> urgent tasks todo </p> </div>
      <div className="h yellow"> <h3> {semiUrgentCount} </h3>  <p> semi-urgent tasks todo </p> </div>
      <div className="h green">  <h3> {ratio} % </h3> <p> ratio completion </p> </div>

       </div>
      }


      <button className="newCourseButton" onClick={this.addNewCourse} >
         ADD A TASK <MDBIcon icon="plus"/>

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
          title={c.title} category={c.category} description={c.description}
          capacity ={c.capacity} address={c.address}
          clicked={() => this.enableEditing(c.id)}
          like ={() => this.likedHandler(c)}
          liked = {c.liked}

            />


        </div>
        )
      }})}


      </div>
      </div>
   )
  }
}

export default CoursesContainer;
