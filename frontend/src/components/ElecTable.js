import React from 'react';
import { Formik, Form, Field } from "formik";

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

class ElecTable extends React.Component {
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
    const endpoint = new URL("/electricities/:id/delete", process.env.REACT_APP_BACKEND_HOSTNAME)
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
    const endpoint = new URL("/electricities/:id", process.env.REACT_APP_BACKEND_HOSTNAME)
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
        if(response.status === 200){
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
    const endpoint = new URL("/electricities", process.env.REACT_APP_BACKEND_HOSTNAME)
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
            address: this.state.editItem.address,
            date: this.state.editItem.date,
            last_time: this.state.editItem.last_time,
            this_time:  this.state.editItem.this_time,
            cost: this.state.editItem.cost,
            public: this.state.editItem.public,
          }}
          onSubmit={this.handleEdit}>
          {({ isSubmitting }) => {
                return (
          <Form>
             <Col className="px-1" md="3">
              <label><Field as="select" name="public">
                    <option value="">請選擇</option>
                    <option value="private">私表</option>
                    <option value="public">公表</option>
                </Field></label>
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

      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">資料紀錄</Card.Title>
              </Card.Header>

              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">種類</th>
                      <th className="border-0">地址</th>
                      <th className="border-0">日期</th>
                      <th className="border-0">上次累計</th>
                      <th className="border-0">本次累計</th>
                      <th className="border-0">使用電量</th>
                      <th className="border-0">電費/度</th>
                      <th className="border-0">合計</th>
                      <th><Button onClick={this.props.create}>新增資料</Button></th>
                    </tr>
                  </thead>
                  <tbody>
                  {items.map(item => {
                    return (
                      <tr key = {item.id}>
                        <td>{item.public}</td>
                        <td>{item.address}</td>
                        <td>{item.date}</td>
                        <td>{item.last_time}</td>
                        <td>{item.this_time}</td>
                        <td>{item.usage}</td>
                        <td>{item.cost}</td>
                        <td>{item.total}</td>
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

export default ElecTable;
