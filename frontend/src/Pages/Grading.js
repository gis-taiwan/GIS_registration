import React from "react";
// import Sidebar from 'components/Sidebar/Sidebar.js';
import AccountTable from 'components/AccountTable'
import * as Yup from "yup";
// import ElecForm from 'components/ElecForm.js'
import { Formik, Form, Field } from "formik";
import {
  Row,
  Col,
  Button
} from "react-bootstrap";
// import { string } from "yup/lib/locale";
import Modal from "react-bootstrap/Modal";
import { AuthzFuction } from "components/Navbars/CookieUsage";

const newuserSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "密碼長度過短")
    .max(50, "密碼長度過長")
    .required("必填"),
  username: Yup.string()
    .min(3, "使用者名稱過短")
    .max(50, "使用者名稱過長")
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


class Grading extends React.Component {
  constructor() {
    super();
    AuthzFuction();
    this.state = {
      items: [],
      isShow: false
    }
  };
  handleFormSubmit = (value, { setSubmitting }) => {
    const endpoint = new URL("/accountmanagement", process.env.REACT_APP_BACKEND_HOSTNAME)
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
      <div className = "electricity">
      <Modal
        show = {this.state.isShow}
        onhide = {!this.state.isShow}
        size = "lg"
        >
        <Modal.Header>
          新增使用者
        </Modal.Header>
        <Modal.Body>
        <Formik
          initialValues={{
            username: "",
            password: "",
            name: "",
            phone: "",
            email: "",
            role: "",
          }}
          validationSchema={newuserSchema}
          onSubmit={this.handleFormSubmit}>
          {({ isSubmitting }) => {
          return (
          <Form>
            <Col className="px-1" md="6">
              <label>
                <Field as="select" name="role">
                    <option value="">角色</option>
                    <option value="ADMIN">管理員</option>
                    <option value="NORMAL">一般</option>
                </Field>
              </label>
            </Col>
            <Row>
            <Col className="px-1" md="4">
              <label>帳號: <Field type="username" name="username" /></label>
            </Col>
            <Col className="px-1" md="4">
              <label>密碼: <Field type="password" name="password" /></label>
            </Col>
            </Row>
            <Row>
            <Col className="px-1" md="4">
              <label>姓名: <Field type="name" name="name" /></label>
            </Col>
            <Col className="px-1" md="4">
              <label>電話: <Field type="phone" name="phone" /></label>
            </Col>
            </Row>
            <Row>
            <Col className="px-1" md="8">
              <label>電子郵件: <Field type="email" name="email" /></label>
            </Col>
            </Row>
            <Row>
            <Col md="8"></Col>
            <Col md="2"><Button variant="primary" type="submit" disabled = {isSubmitting}>確認</Button></Col>
            <Col md="2"><Button variant="danger" onClick={this.hideform}>取消</Button></Col>
            </Row>
          </Form>
          );
        }}
        </Formik>
        </Modal.Body>
      </Modal>
      <AccountTable
        create = {this.showform}/>
      </div>
    );
  }
}


export default Grading;
