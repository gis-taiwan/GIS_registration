import React from "react";
// import Sidebar from 'components/Sidebar/Sidebar.js';
// react-bootstrap components
// import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { Button, Card, Col } from "react-bootstrap";
import { getCookie, setCookie } from "components/Navbars/CookieUsage";

const loginSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "密碼長度過短")
    .max(50, "密碼長度過長")
    .required("必填"),
  username: Yup.string()
    .min(3, "使用者名稱過短")
    .max(50, "使用者名稱過長")
    .required("必填")
});

class LoginForm extends React.Component {
  handleSubmit = (values, { setSubmitting }) => {
    const endpoint = new URL("/login", process.env.REACT_APP_BACKEND_HOSTNAME)
    .href;
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
      body: JSON.stringify(values, null, 2)
    })
    .then(function(response){
      if(response.status === 400 || response.status === 401){
        alert("錯誤的使用者名稱或密碼!\n");
        return 0;
        // break;
      }else
        return response.json();
    }).then(function(data){
      if(data !== 0){
        setCookie("id", data.id, 30); 
        setCookie("role", data.role, 30);   
        alert("成功登入!\n");
        window.location.href = '..';
      }
    })
    setSubmitting(false);
    // }, 400);
  };
  
  render() {
  if(getCookie("id") !== ""){
    alert("您已經登入了!\n");
    window.location.href = '..';
  }
  else{
    return (
      <Card>
        <Card.Header>
          <Card.Title as="h3">登入</Card.Title>
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
                  使用者名稱:   <br /><Field type="username" name="username" />
                  <ErrorMessage name="username" component="div" />
                </label>
                </Col>
                <Col className="px-1" md="3">
                <label>
                  密碼:   <br /><Field type="password" name="password" />
                  <ErrorMessage name="password" component="div" />
                </label>
                </Col>
                <Button type="submit" disabled={isSubmitting}>
                  登入
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
