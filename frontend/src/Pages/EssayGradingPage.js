import React from "react";
import {
  Card,
  Col,
  Container,
  Row,
  Form,
  Button,
} from "react-bootstrap";

const { GoogleSpreadsheet } = require('google-spreadsheet');



export default class EssayGradingPage extends React.Component{
  
  constructor(){
    super();
    this.state = {
      editId: undefined,
      doc: undefined,
      nowrow: undefined,
      nowsheet: undefined,
      redirect: undefined,
      Grade1: 0,
      Grade2: 0,
    }
  }

  async componentDidMount() {
    this.setState({editId: this.props.ID});
    await this.InitAPI();
  }

  InitAPI = async () => {
    // Initialize the sheet - doc ID is the long id in the sheets URL
    const doc = new GoogleSpreadsheet('1mzsQvalD22B_wohp74hE9fxpXQN_zPv_eGr8hXU30Eg');
  
    // Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
    await doc.useServiceAccountAuth({
      client_email: "forgradingapi@gradingsheetapi.iam.gserviceaccount.com",
      private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQD0Gjk/hCyMUGKt\naKO+sam76U+blCsFJktFEnb6mrpRn/YPPn2lSVH71dq1qL8we66V/ORK0tkGQ1b5\nvV5l9MOtGs5iZSi19upIx/6TzSHfgBNX6lknNfuszG1TCTpYX1LxbAFYFQ7eZAcD\n6YjwAk9hNOcA4t3TAUlcWDznZDeFdq8BfRFTavbqW1IW5lzf0drfgteK9No3jD61\nSnEfUC2qKk3PuHa8dz9qxZxZJbA5CHduXZ9CHzz8RIO/BlbD8eCDVK1sXneKHWKv\n3amlb3UZSGu5/T5QcDTGc8z7NvxuoTl4vujoUhC9donAPjErUzWFgvZyqOyB38F1\nLMQOISmnAgMBAAECggEAGyCTmR/utXSKKtGfVOYN7LChJLM4KV0tQz1UlJq/tv+A\nYFxQ/p6Mf7YElWiYlWJBWjDIYW+s0k8x1L+QmeMJdezYim3J3ZhVnAYBytoiorcV\n2eYqHJCZagWD5r+hSMiQgVI/6f0ucao1xLUI1KdlEUfy82cYQMalU5+zZlb9ppVS\nN7oHt+Fy4XxMzn1zbYQttBb5qAiqs8sCeWBZjn1rYSPZJV5qllt7tmH6WtfzdDM2\npQQQ2V7jGm31B+REVXjJYORb20PkSsS1x/0VSAwN9xsx1nVTfSSRiuHArFB04LUI\nlBsCTdUxHfFzCGiC8WTBLehb0cHCOLSeL0+n+U5BPQKBgQD8/vBSbA4KG82264TA\n1oj6VHH24nnsMz9bho+M4a6JetmsrcdEf8sbcnDrxqvMIs22bFpHq1SxpqFg7tar\nZP57Rdk9sF5wVI0/4eATSRhZw1X2MZ6CIG4VKlp71pOtIILRA+fp9Xoscrvcw6j2\nFaZnP+XJpP/w35suQB/0lJ+oEwKBgQD3AEAgo+S3UsGGAU3YvZ2dbW23aOmf/Hjc\noZNeRh1xUMNyc8Sjzqngc9VyJaFz+lgb+QHjYAmXfbGi9kohDI5VhaRHAN9uSRap\nyhx/a8nUH3ot6P2K6LGW37jb28MzhQCG2BrccvOsYz5hxYmE/uujjD1icABaj/Rq\nG7H62DtSnQKBgQCIE8/LZVc/1KiXRKKI3lua2aTauAIAK6heYEgB7LlmNO+z01yk\n2V+ziaB3EMsC541iG3GLrvnE++09J/nLAm1mfLFWXvDM1o2K2MEfXmd8kHZCD3pE\nX5EWTUuR5F5V9nCmX8Vzr5dhJO0q1wqgIhD45AOCq/8F3h+nhtIpSW9+hQKBgQDm\nzG8fkMWIn2WBh/prylJa5gOdXAThn5J35urDLpUYazUV3yMhRVzrBJGwBYWlz4lB\nKh4fjn+n9KVl9ukxlH/zXdsxFZmxfc4VfWu/jMKc2YTbHVi80c4PgqFDn0f4/hCN\n76S51RfoPxvtVB26DlG1ErfRIYLTHKxv8c0O7boQ6QKBgFK3McdFX5OLgNkZprzx\ngZEC23mxdb/zF8NlVR7VzZajyjiQTHjmiDHyxW1Kxg+uBrU0BVoU03WrhyFhZJLK\nyTWh1d7LJWyjQeE0Bao1GNNATmqBQcAsUz36Km/A+e/1x6cJeWQyNxtt9qP4pBA6\nKMeSHgwmJB0Nj0UXCyWkjJVw\n-----END PRIVATE KEY-----\n",
    });
    await doc.loadInfo(); // loads document properties and worksheets
    if(doc){
      const sheet = doc.sheetsByIndex[0];
      const rows = await sheet.getRows();
      const nowrow = rows[this.state.editId - 1];
      this.setState({doc: doc, nowsheet: sheet, nowrow: nowrow, Grade1: nowrow.Grade1, Grade2: nowrow.Grade2});
    }else{
      alert("Can't find file\n");
    }
  
  }

  UpdateGrade = async () => {
    this.state.nowrow.EssayGrade = Number(this.state.Grade1);
    // this.state.nowrow.Grade2 = this.state.Grade2;
    // this.state.nowrow.TotalGrade = Number(this.state.Grade1) + Number(this.state.Grade2);
    this.state.nowrow.Status = "EGraded";
    await this.state.nowrow.save();
    window.location.reload();
  }

  render(){
    if(this.state.nowrow === undefined)
      return (<>
        <Container> </Container>
      </>);

    const { nowrow } = this.state;
    const essayid = nowrow.Essay.substring(33);

    return (
      <>
        <Container fluid>
        <Row>
        <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Basic Info For Registor No. {nowrow.ID}</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="px-2" md="3">
                      <Form.Group>
                        <label>Name</label>
                        <Form.Control
                          type="text"
                          defaultValue={nowrow.Name}
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-2" md="3">
                      <Form.Group>
                        <label>Passport Name</label>
                        <Form.Control
                          type="text"
                          defaultValue={nowrow.Passport}
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-2" md="3">
                      <Form.Group>
                        <label>Sex</label>
                        <Form.Control
                          type="text"
                          defaultValue={nowrow.Sex}
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-2" md="3">
                      <Form.Group>
                      <label>Nationality</label>
                        <Form.Control
                          type="text"
                          defaultValue={nowrow.Nationality}
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                 <Row>
                  <Col className="px-2" md="3">
                      <Form.Group>
                      <label>Education Level</label>
                        <Form.Control
                          type="text"
                          defaultValue={nowrow.Education}
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-2" md="3">
                      <Form.Group>
                      <label>Current Institution</label>
                        <Form.Control
                          type="text"
                          defaultValue={nowrow.CurrentUniversity}
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-2" md="3">
                      <Form.Group>
                      <label>Major</label>
                        <Form.Control
                          type="text"
                          defaultValue={nowrow.Major}
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-2" md="3">
                      <Form.Group>
                      <label>Year</label>
                        <Form.Control
                          type="text"
                          defaultValue={nowrow.Year}
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                  <Col className="px-2" md="6">
                      <Form.Group>
                      <label>Speech Priority 1</label>
                        <Form.Control
                          type="text"
                          defaultValue={nowrow.Speech1}
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-2" md="6">
                      <Form.Group>
                      <label>Speech Priority 2</label>
                        <Form.Control
                          type="text"
                          defaultValue={nowrow.Speech2}
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                  <Col className="px-2" md="3">
                      <Form.Group>
                      <label>AP priority 1</label>
                        <Form.Control
                          type="text"
                          defaultValue={nowrow.AP1}
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-2" md="3">
                      <Form.Group>
                      <label>AP priority 2</label>
                        <Form.Control
                          type="text"
                          defaultValue={nowrow.AP2}
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-2" md="3">
                      <Form.Group>
                      <label>AP priority 3</label>
                        <Form.Control
                          type="text"
                          defaultValue={nowrow.AP3}
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-2" md="3">
                      <Form.Group>
                      <label>AP priority 4</label>
                        <Form.Control
                          type="text"
                          defaultValue={nowrow.AP4}
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
            
          </Col>
          
        </Row>
        <Row>
          <Col md="12">
            <Card>
            <Card.Header>
              <Card.Title as="h4">Essay Viewer</Card.Title>
            </Card.Header>
            <Card.Body>
              <div class="embed-responsive embed-responsive-4by3">
                <iframe class="responsive-iframe" src={"https://drive.google.com/file/d/" + essayid + "/preview"}></iframe>
              </div>
            </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
            <Card.Header>
              <Card.Title as="h4">Grading</Card.Title>
            </Card.Header>
            <Card.Body>
                <Row>
                  <Col className="px-2" md="12">
                      <Form.Group>
                      <label>Essay Grade</label>
                        <Form.Control
                          type="number"
                          defaultValue={nowrow.EssayGrade}
                          onChange={e => this.setState({ Grade1: e.target.value})}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    </Row>
                    <Row>
                    <Col className="px-2" md="12">
                      <Button variant="info" onClick={() => this.UpdateGrade()} > Update Grade </Button>
                    </Col>
                  </Row>
            </Card.Body>
            </Card>
          </Col>
        </Row>
          
        </Container>
      </>
    );
  }
  

}
