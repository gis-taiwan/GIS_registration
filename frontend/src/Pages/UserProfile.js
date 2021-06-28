import { getCookie } from "components/Navbars/CookieUsage";
import React from "react";

// react-bootstrap components
import {
  // Badge,
  Button,
  Card,
  Form,
  // Navbar,
  // Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";

class User extends React.Component{  
  Fetch = () => {
    let value = {"id": this.state.userid};
    let t = {};
    const that = this;
    const endpoint = new URL("/account", process.env.REACT_APP_BACKEND_HOSTNAME)
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
      body: JSON.stringify(value, null, 2)
    })
    .then(function(response){
        return response.json();
    }).then(function(data){
      t = data;
      that.setState({profile_username: t.username, profile_role: t.role, profile_id: t.id, profile_email: t.email, profile_name: t.name, profile_phone: t.phonenumber});
    })
  };

  Change = () => {
    let new_value = {"id": this.state.profile_id,
                      "username": this.state.profile_username, 
                      "role": this.state.profile_role, 
                      "name": this.state.profile_name, 
                      "phone": this.state.profile_phone,
                      "email": this.state.profile_email};
    const endpoint = new URL("/edituser", process.env.REACT_APP_BACKEND_HOSTNAME)
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
      body: JSON.stringify(new_value, null, 2)
    }).then(function(response){
      if(response.status === 204)
        alert("成功更新資料\n");
      else if(response.status === 409)
        alert("此帳號已被使用\n");
      else
        alert("更新失敗\n");  
    })
  }
    
  constructor(){
    super();
    this.state = {
      name: "React",
      userid: getCookie("id"),      
      profile_username: "",
      profile_role: "",
      profile_id: "",
      profile_phone: "",
      profile_email: "",
      profile_name: "",
    };
    this.Fetch = this.Fetch.bind(this)
  }

  componentDidMount(){
    this.Fetch();
  }

  render(){
    return ( 
    <>
    
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">我的帳號</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Company (disabled)</label>
                        <Form.Control
                          defaultValue="Creative Code Inc."
                          disabled
                          placeholder="Company"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>帳號</label>
                        <Form.Control                
                          placeholder="Username"
                          type="text"
                          defaultValue={this.state.profile_username}                          
                          onChange={e => this.setState({ profile_username: e.target.value})}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Email
                        </label>
                        <Form.Control
                          placeholder="Email"
                          type="email"
                          defaultValue={this.state.profile_email}                          
                          onChange={e => this.setState({ profile_email: e.target.value})}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>姓名</label>
                        <Form.Control
                          placeholder="Company"
                          type="text"
                          defaultValue={this.state.profile_name}                          
                          onChange={e => this.setState({ profile_name: e.target.value})}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Last Name</label>
                        <Form.Control
                          defaultValue="Andrew"
                          placeholder="Last Name"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>電話號碼</label>
                        <Form.Control
                          placeholder="Home Address"
                          type="text"
                          defaultValue={this.state.profile_phone}                          
                          onChange={e => this.setState({ profile_phone: e.target.value})}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>City</label>
                        <Form.Control
                          defaultValue="Mike"
                          placeholder="City"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Country</label>
                        <Form.Control
                          defaultValue="Andrew"
                          placeholder="Country"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>角色</label>
                        <Form.Control
                          placeholder="ZIP Code"
                          type="text"                          
                          defaultValue={this.state.profile_role}                          
                          onChange={e => this.setState({ profile_role: e.target.value})}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>About Me</label>
                        <Form.Control
                          cols="80"
                          defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in
                          that two seat Lambo."
                          placeholder="Here can be your description"
                          rows="4"
                          as="textarea"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    onClick={() => this.Change()}
                  >
                    更新資料
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt="..."
                  src={
                    require("assets/img/photo-1431578500526-4d9613015464.jpeg")
                      .default
                  }
                ></img>
              </div>
              <Card.Body>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/faces/face-3.jpg").default}
                    ></img>
                    <h5 className="title">Mike Andrew</h5>
                  </a>
                  <p className="description">michael24</p>
                </div>
                <p className="description text-center">
                  "Lamborghini Mercy <br></br>
                  Your chick she so thirsty <br></br>
                  I'm in that two seat Lambo"
                </p>
              </Card.Body>
              <hr></hr>
              <div className="button-container mr-auto ml-auto">
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-facebook-square"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-twitter"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-google-plus-square"></i>
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
  }
}

export default User;
