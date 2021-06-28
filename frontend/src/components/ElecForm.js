import React from "react";
import { Card, Container, Form, Button, Row, Col } from "react-bootstrap";

class ElecForm extends React.Component {
  render() {    
      return (
        <Container>
          <Row>
              <Card>
                <Card.Header>
                  <Card.Title as="h4">Edit Profile</Card.Title>
                </Card.Header>
                <Card.Body>
                  
                <div id="Form">
                <Form 
                onSubmit={this.props.handleFormSubmit}>
                  <Row>
                  <Col md='6'>
                  <label>
                      Please select the type: 
                  <select value={this.props.newpublic} 
                        type="public" name="public"
                        onChange={this.props.handleInputChange}>
                      <option value="">請選擇</option>
                      <option value="private">私表</option>
                      <option value="public">公表</option>
                  </select>
                  </label>
                  </Col>
                  </Row>
                  <Row>
                  <Col md="6">
                    <label htmlFor="address">
                      地址:
                      <input id="address" value={this.props.newAddress} 
                        type="text" name="address"
                        onChange={this.props.handleInputChange} />
                    </label>
                  </Col>
                  <Col md="6">
                    <label for="date">
                    日期:
                      <input id="date" value={this.props.newdate} 
                        type="date" name="date"
                        onChange={this.props.handleInputChange} />
                    </label>
                  </Col>
                  </Row>
                  <Row>
                  <Col md="4">
                    <label for="lastTime">
                    上次累計:
                      <input id="lastTime" value={this.props.newlastTime} 
                        type="lastTime" name="lastTime"
                        onChange={this.props.handleInputChange} />
                    </label>
                  </Col>
                  <Col md="4">
                    <label for="thisTime">
                    本次累計:
                      <input id="thisTime" value={this.props.newthisTime} 
                        type="thisTime" name="thisTime"
                        onChange={this.props.handleInputChange} />
                    </label>
                  </Col>
                  </Row>
                  <Row>
                  <Col md="12">
                    <label for="cost">
                    電費/度:
                      <input id="cost" value={this.props.newcost} 
                        type="cost" name="cost"
                        onChange={this.props.handleInputChange} />
                    </label>
                  </Col>
                  </Row>
                  <Row>
                  <Col md = "8">
                  </Col>
                  <Col md = "4">
                    <Button type="submit" value="Submit">Confirm</Button>
                  </Col>
                  </Row>
                </Form>
                </div>
                </Card.Body>
              </Card>
          </Row>
        </Container>
      );
    }
}

export default ElecForm;
