import React, { Component } from 'react';
import axios from 'axios';
import Course from './Course';
import update from 'immutability-helper';
import CourseForm from './CourseForm';
import { MDBIcon } from "mdbreact";
import Modal from './UI/Modal';
import Aux from './hoc/Aux';

class CoursesContainer extends Component {

  constructor(props) {
  super(props)
  this.state = {
    courses: [],
    editingCourseId: null,
    notification: null,
    greetings: false

  }
}




  componentDidMount() {
  axios.get('/api/courses')
  .then(response => {
    console.log(response)
    this.setState({courses: response.data})
  })
  .catch(error => console.log(error))
}


addNewCourse = () => {
  axios.post('/api/courses',
   { course:
      {
        title: '',
        description: '',
        capacity: 1,
        address: '',
        liked: false,
        category: ' ',
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
  axios.put(`/api/courses/${c.id}`,
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
    if (courseIndex.liked) {
      this.setState({greetings: true})
    }
  })
  .catch(error => console.log(error))
}



deleteHandler = (id) => {
  axios.delete(`/api/courses/${id}`)
  .then(response => {
    const courseIndex = this.state.courses.findIndex(x => x.id === id)
    const courses = update(this.state.courses, { $splice: [[courseIndex, 1]]})
    this.setState({courses: courses})
  })
  .catch(error => console.log(error))
}


stopGreetings =()=> {
  this.setState({greetings: false})
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
     let ratio = (doneCount ) /taskCount * 100
     let ratioR = Math.round(ratio)


     let courses = this.state.courses.map((c) => {
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
          liked = {c.liked}/>
          </div>)
        }
      })

    let coursesDone = [];
    let coursesTodo = [];

     courses.forEach((c) => {
       console.log(c.props.children.props.liked);
      (c.props.children.props.liked) ? coursesDone.push(c) : coursesTodo.push(c)
     })

     console.log(coursesTodo)




    return (
    <div>
    <button className="newCourseButton" onClick={this.addNewCourse} >
         ADD A TASK <MDBIcon icon="plus"/>
      </button> <span className="notification">
          {this.state.notification}
        </span>
        <Modal
          show={this.state.greetings}
          modalClosed={this.stopGreetings}>
          <h2> Task done ! Yeah ! </h2>
           <div class="modal-i"> <MDBIcon icon="thumbs-up"/> </div>
        </Modal>
      <div className="header">
        <div className="h blue"> <h3> {doneCount} </h3> <p> completed tasks  </p>  </div>
        <div className="h pink">  <h3>  {urgentCount} </h3>  <p> urgent tasks todo </p> </div>
        <div className="h yellow"> <h3> {semiUrgentCount} </h3>  <p> semi-urgent tasks todo </p> </div>
        <div className="h green">  <h3> {ratioR} % </h3> <p> ratio of completion </p> </div>
      </div>

      <div className= "tiles">
       {courses}
       </div>








    </div>
  )
}
}








export default CoursesContainer;
