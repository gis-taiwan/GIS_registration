import React from 'react';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import {
  Container,
  Table,
  Card,
  Row,
  Col,
  Button
} from "react-bootstrap"
import Modal from "react-bootstrap/Modal"
import { confirmAlert } from "react-confirm-alert";

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

class AccountTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data:[],
      editItem:[],
      isShow: false,
   }
  };
  async componentDidMount(){
    this.showtable();
  }
  async componentDidUpdate(){
    this.showtable();
  }

  onDelete = (deleteItem) => {
    const endpoint = new URL("/accountmanagement/:id/delete", process.env.REACT_APP_BACKEND_HOSTNAME)
    .href;
    setTimeout(() => {
      fetch(endpoint, {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', body: JSON.stringify(deleteItem, null, 2),
      })
      .then(function(response){
        if(response.status === 400 || response.status === 404){
          alert("無效！");
        }else{
          alert("刪除成功！");
        }
      })
    }, 400)
  }

  onEdit = (data) =>{
    this.setState({
      editItem: data,
      isShow:true
    })
  }

  handleEdit = (values, { setSubmitting }) => {
    values.id = this.state.editItem.id;
    const endpoint = new URL("/accountmanagement/:id", process.env.REACT_APP_BACKEND_HOSTNAME)
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
        body: JSON.stringify(values, null, 2)

      })
      .then(function(response){
        if(response.status === 204){
          alert("修改成功！");
        }else{
          alert("無效！");
        }
      });
      setSubmitting(false);
      this.setState({isShow: false});
    }, 400);
  }

  showtable = () => {
    const endpoint = new URL("/accountmanagement", process.env.REACT_APP_BACKEND_HOSTNAME)
    .href;
    setTimeout(() => {
      fetch(endpoint, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
      })
      .then((response)=>response.json())
      .then((data)=>{
        this.setState({ data });
      })
    }, 400);
  }

  hideform = () => {this.setState({isShow: false});}

  render() {
    const items = this.state.data;
    return (
      <div>
      <Modal
      show = {this.state.isShow}
      onhide = {!this.state.isShow}
      size = "lg">
        <Modal.Header closeButton>
          <Modal.Title>請輸入資料</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Formik
          initialValues={{
            username: this.state.editItem.username,
            password: "",
            name: this.state.editItem.name,
            phone: this.state.editItem.phonenumber,
            email:  this.state.editItem.email,
            role: this.state.editItem.role,
          }}
          validationSchema={newuserSchema}
          onSubmit={this.handleEdit}>
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

      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">現有帳號列表</Card.Title>
              </Card.Header>

              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">帳號</th>
                      <th className="border-0">姓名</th>
                      <th className="border-0">電話</th>
                      <th className="border-0">電子郵件</th>
                      <th className="border-0">角色</th>
                      <th><Button onClick={this.props.create}>新增資料</Button></th>
                    </tr>
                  </thead>
                  <tbody>
                  {items.map(item => {
                    return (
                      <tr key = {item.id}>
                        <td>{item.username}</td>
                        <td>{item.name}</td>
                        <td>{item.phonenumber}</td>
                        <td>{item.email}</td>
                        <td>{item.role}</td>
                        <td><Button size="sm" onClick = {() => this.onEdit(item)}>編輯</Button>
                            <Button
                            size="sm"
                            variant="danger"
                            className="ml-1"
                            onClick={async () =>
                              confirmAlert({
                                title: "確認刪除",
                                message: "你確定你真的要刪除這個嗎？",
                                buttons: [
                                  {
                                    label: "是",
                                    onClick: () => this.onDelete(item),
                                  },
                                  {
                                    label: "否",
                                    onClick: () => {},
                                  },
                                ],
                              })
                            }
                          >
                            刪除
                          </Button></td>
                      </tr>
                    );
                  })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
      </Row>
      </Container>
      </div>
    );
  }
}

export default AccountTable;
