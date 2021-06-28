import React from "react";
import { Formik, Form, Field } from "formik";
import {
  Row,
  Col,
  Button
} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

class Scheduling extends React.Component {

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
      <div className = "electricity">
      <Modal
        show = {this.state.isShow}
        onhide = {!this.state.isShow}
        size = "lg"
        >
        <Modal.Header>
          請輸入電錶資料
        </Modal.Header>
        <Modal.Body>
        <Formik
          initialValues={{
            address: "",
            date: "",
            last_time: "",
            this_time: "",
            cost: "",
            public: "",
          }}
          onSubmit={this.handleFormSubmit}>
          {({ isSubmitting }) => {
          return (
          <Form>
             <Col className="px-1" md="3">
              <label>
               <Field as="select" name="public">
                    <option value="">請選擇</option>
                    <option value="私用">私表</option>
                    <option value="公用">公表</option>
                </Field>
              </label>
            </Col>
            <Col className="px-1" md="3">
              <label>地址: <Field type="address" name="address" /></label>
            </Col>
            <Col className="px-1" md="3">
              <label>日期: <Field type="date" name="date" /></label>
            </Col>
            <Row>
            <Col className="px-1" md="4">
              <label>上次使用: <Field type="last_time" name="last_time" /></label>
            </Col>
            <Col className="px-1" md="4">
              <label>本次使用: <Field type="this_time" name="this_time" /></label>
            </Col>
            <Col className="px-1" md="4">
              <label>電費/度: <Field type="cost" name="cost" /></label>
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
      {/* <ElecTable
        create = {this.showform}/> */}
      </div>
    );
  }
}


export default Scheduling;
