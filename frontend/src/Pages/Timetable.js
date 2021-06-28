import React from "react";
import { Formik, Form, Field } from "formik";
import {
  Row,
  Col,
  Button
} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

class Timetable extends React.Component {

  constructor() {
    super();
    this.state = {
      items: [],
      isShow: false
    }
  };
  handleFormSubmit = (value, { setSubmitting }) => {
    const endpoint = new URL("/electricities", process.env.REACT_APP_BACKEND_HOSTNAME)
    .href;
    setTimeout(() => {
      fetch(endpoint, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(value, null, 2)
      })
      .then(function(response){
        if(response.status === 400 || response.status === 401){
          alert("無效：資料有誤!\n");
        }else{
          alert("新增成功!\n");
        }
      });
      setSubmitting(false);

    }, 400);
    this.setState({isShow: !this.state.isShow});
  };

  showform =() =>{
    this.setState({isShow: !this.state.isShow});
  }
  hideform =()=>{
    this.setState({isShow: false});
  }

  render() {
    return(
      <div>
        <h2>Avalliable Interview Time Period</h2>  
      </div>
    );
  }
}


export default Timetable;
