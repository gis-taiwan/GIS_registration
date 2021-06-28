import React from "react";
// import Sidebar from 'components/Sidebar/Sidebar.js';
// react-bootstrap components
// import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Card, Col } from "react-bootstrap";
import { AuthzFuction } from "components/Navbars/CookieUsage";

const signupSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "密碼長度過短")
    .max(50, "密碼長度過長")
    .required("必填"),
  username: Yup.string()
    .min(3, "使用者名稱過短")
    .max(50, "使用者名稱過長")
    .required("必填"),
  role: Yup.string()
    .min(5, "角色過短")
    .max(6, "角色過長")
    .required("必填"),
  email: Yup.string()
    .min(3, "電子郵件信箱過短")
    .max(50, "電子郵件信箱過長")
    .required("必填"),
  phone: Yup.string()
    .min(10, "電話號碼過短")
    .max(10, "電話號碼過長")
    .required("必填"),
  name: Yup.string()
    .min(1, "姓名過短")
    .max(50, "姓名過長")
    .required("必填"),
});

class SignupForm extends React.Component {
  handleSubmit = (values, { setSubmitting }) => {
    const endpoint = new URL("/signup", process.env.REACT_APP_BACKEND_HOSTNAME)
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
      if(response.status === 400){
        alert("錯誤帳號或密碼\n");
      }else if(response.status === 409){
        alert("此使用者帳號已被使用!\n");
      }else{
        alert("成功創建使用者!\n");
        localStorage.setItem('sign_up', "1");
        window.location.href = '..';
      }
    })
    setSubmitting(false);
  };

  constructor(){
    super();
    AuthzFuction();
  }

  render() {
    return (
      <Card>
        <Card.Header>
          <Card.Title as="h3">註冊</Card.Title>
        </Card.Header>
        <Card.Body>
      <>
        <Formik
          initialValues={{ username: "", password: "", role: "" }}
          validationSchema={signupSchema}
          onSubmit={this.handleSubmit}
        >
          {({ isSubmitting }) => {
            return (
              <Form>
                <Col className="px-1" md="3">
                <label>
                  使用者名稱: <br />
                  <Field type="username" name="username" />
                  <ErrorMessage name="username" component="div" />
                </label>
                </Col>
                <Col className="px-1" md="3">
                <label>
                  密碼: <br /> 
                  <Field type="password" name="password" />
                  <ErrorMessage name="password" component="div" />
                </label>
                </Col>
                <Col className="px-1" md="3">
                <label>
                  姓名: <br /> 
                  <Field type="name" name="name" />
                  <ErrorMessage name="name" component="div" />
                </label>
                <label>
                  Email: <br /> 
                  <Field type="email" name="email" />
                  <ErrorMessage name="email" component="div" />
                </label>
                <label>
                  電話號碼: <br /> 
                  <Field type="phone" name="phone" />
                  <ErrorMessage name="phone" component="div" />
                </label>
                <label>
                  角色 (Admin or Normal): <br /> 
                  <Field type="role" name="role" />
                  <ErrorMessage name="role" component="div" />
                </label>
                </Col>
                <Button type="submit" disabled={isSubmitting}>
                  送出
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

// $(document).ready

export default SignupForm;
// function Login(){

//     return(
//         <div>this is login page</div>
//     )
// }
// export default Login;
