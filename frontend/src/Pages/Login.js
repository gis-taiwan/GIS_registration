import React from "react";
// import Sidebar from 'components/Sidebar/Sidebar.js';
// react-bootstrap components
// import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { Button, Card, Col } from "react-bootstrap";
import { getCookie, setCookie } from "components/Navbars/CookieUsage";

import API from "api.js";

const {LoginAPI, updateUserAPI} = API();

LoginAPI("Admin", "admin"); 
updateUserAPI("Admin", {"Role": "a"})

const loginSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password too short.")
    .max(50, "Password too long.")
    .required("Required"),
  username: Yup.string()
    .min(3, "Username too short.")
    .max(50, "Username too long")
    .required("Required")
});

class LoginForm extends React.Component {

  handleSubmit = (values, { setSubmitting }) => {
    // const endpoint = new URL("/login", process.env.REACT_APP_BACKEND_HOSTNAME)
    // .href;
    // fetch(endpoint, {
    //   method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //   mode: 'cors', // no-cors, *cors, same-origin
    //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //   credentials: 'same-origin', // include, *same-origin, omit
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   redirect: 'follow', // manual, *follow, error
    //   referrerPolicy: 'no-referrer', 
    //   body: JSON.stringify(values, null, 2)
    // })
    // .then(function(response){
    //   if(response.status === 400 || response.status === 404){
    //     alert("Invalid account or password!\n");
    //     return 0;
    //   }else
    //     return response.json();
    // }).then(function(data){
    //   if(data !== 0){
    //     setCookie("id", data.id, 30); 
    //     setCookie("role", data.role, 30);   
    //     alert("Login Successfully!\n");
    //     window.location.href = '..';
    //   }
    // })
    // setSubmitting(false);
    // // }, 400);
    setCookie("username", values.username, 30); 
    setCookie("role", "A", 30);   
    alert("Login Successfully!\n");
    window.location.href = '..';
  };
  
  render() {
  if(getCookie("username") !== ""){
    alert("You've already login!\n");
    return (<Card></Card>);
  }
  else{
    return (
      <Card>
        <Card.Header>
          <Card.Title as="h3">Please Login</Card.Title>
        </Card.Header>
        <Card.Body>
      <>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={this.handleSubmit}
        >
          {({ isSubmitting }) => {
            return (
              <Form>
                <Col className="px-1" md="3">
                <label>
                  Account:   <br /><Field type="username" name="username" />
                  <ErrorMessage name="username" component="div" />
                </label>
                </Col>
                <Col className="px-1" md="3">
                <label>
                  Password:   <br /><Field type="password" name="password" />
                  <ErrorMessage name="password" component="div" />
                </label>
                </Col>
                <Button type="submit" disabled={isSubmitting}>
                  Login
                </Button>
              </Form>
            );
          }}
        </Formik>
      </>
      </Card.Body>
      </Card>
    );
  }
  }
}

// $(document).ready

export default LoginForm;
// function Login(){

//     return(
//         <div>this is login page</div>
//     )
// }
// export default Login;
