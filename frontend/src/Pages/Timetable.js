import React from "react";
// import { Formik, Form, Field } from "formik";
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
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
      <>
        <Container fluid>
          <Row>
            <Col md="12">
              <Card>
              <Card.Header>
                <Card.Title as="h4">Please select the availaible time period(s) for interview</Card.Title>
              </Card.Header>
              <Card.Body>
              <div className="table-full-width">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <td>Availaible</td>
                        <td>Time Period</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultValue=""
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>
                          1st, Oct, 2021, 9:00 - 12:00 Monday
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultValue=""
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>
                          1st, Oct, 2021, 14:00 - 17:00 Monday
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultValue=""
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>
                          2nd, Oct, 2021, 9:00 - 12:00 Tuesday
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultValue=""
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>
                          2nd, Oct, 2021, 14:00 - 17:00 Tuesday
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <div>
                <Button type="submit">
                  Update
                </Button>
                </div>
              </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}


export default Timetable;
