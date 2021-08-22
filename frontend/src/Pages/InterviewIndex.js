import React from "react";
import { Redirect } from "react-router-dom";
import {
  Card,
  Col,
  Container,
  Row,
  Form,
  Table,
  Button,
} from "react-bootstrap";
import emailjs from 'emailjs-com';
import { getCookie } from "components/Navbars/CookieUsage";

const { GoogleSpreadsheet } = require('google-spreadsheet');



export default class InterviewIndex extends React.Component{
  
  constructor(){
    super();
    this.state = {
      editId: 0,
      doc: undefined,
      nowrow: undefined,
      nowsheet: undefined,
      redirect: undefined,
      nowrow2: undefined,
      People: 0,
    }
  }

  async componentDidMount() {
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
      const sheet = doc.sheetsByIndex[1];
      const sheet2 = doc.sheetsByIndex[2];
      var rows2 = await sheet2.getRows();
      rows2 = rows2.filter((row) => {return (row.Status === "IUngraded" || row.Status === "IGraded" || row.Status === "Passed");});
      const rows = await sheet.getRows();
      
      this.setState({doc: doc, nowsheetlen: sheet, nowrow: rows, nowrow2: rows2});
    }else{
      alert("Can't find file\n");
    }
  
  }

  Sort = async () => {
    var number = Number(this.state.People);
    const rows = this.state.nowrow2;
    const avarows = rows.filter((row) => {return row.Status === "EGraded";});
    await avarows.map(async (row) => {
      if(Number(row.EssayGrade) >= number){
        row.Status = "IUngraded";
        // row.GIScode = "G22-idc" + row.ID;
      }else{
        row.Status = "Eliminated";
      }
      await row.save();
    });
    window.location.reload();
  }

  SendMail = async () => {
    if(getCookie("role") !== "A"){
      alert("No privilege");
      return ;
    }
    const SERVICE_ID = "service_bpko03j";
    const TEMPLATE_ID = "template_0ozaqqr";
    const USER_ID = "user_wq1YxAsZ6aqlrqAClr1R7";

    const rows = this.state.nowrow2;
    const datarows = this.state.nowrow;
    const avarows = rows.filter((row) => {return row.Status === "IUngraded";});
    avarows.map( async (row)  =>  {
      const data_row = datarows.filter((nowrow) => {return (nowrow.ID === row.ID && row.InterviewMail !== "Sent");});
      const GIScode = "G22-idc" + row.ID;
      var data = {
        to_giscode: GIScode,
        to_email: data_row[0].Email,
        to_name: data_row[0].Name,
      };
      // console.log(data);
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, data, USER_ID).then(
        function (response) {
          console.log(response.status, response.text);
        },
        function (err) {
          console.log(err);
          alert("Failed, sad\n");
        }
      );
      row.InterviewMail = "Sent";
      await row.save();

    });
    
    alert("Email Sent Successfully!\n");
    window.location.reload();
    


  }

  render(){
    if(this.state.nowrow === undefined)
      return (<>
        <Container> </Container>
      </>);

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    const { nowrow, sheet, nowrow2 } = this.state;
    

    const columns = [
      {
        name: "GIS code",
        columnWidth: "15%",
      },
      {
        name: "Name",
        columnWidth: "10%",
      },
      {
        name: "Nationality",
        columnWidth: "15%",
      },
      {
        name: "Year",
        columnWidth: "20%",
      },
      {
        name: "Status",
        columnWidth: "10%",
      },
      {
        name: "",
        columnWidth: "20%",
      },
    ];
    return (
      <>
        <Container fluid>
          <Row>
            <Col md="12">
              <Card className="strpied-tabled-with-hover">
                <Card.Header>
                <Card.Title as="h4">Interview Grading Page For 2022 GIS Registration</Card.Title>
                  
                </Card.Header>
                <Card.Body className="table-full-width table-responsive px-2">
                  <Row>
                    <Col className="px-4" md="8">
                    <Button variant="danger" onClick={() => this.SendMail()} > Send </Button>
                    </Col>
                    <Col className="px-4" md="2">
                    <Form.Group>
                          <label>No. Passed</label>
                        <Form.Control
                          type="number"
                          onChange={e => this.setState({ People: e.target.value})}
                        ></Form.Control>
                      </Form.Group>
                      
                    </Col>
                    <Col className="px-2" md="2">
                    <Button variant="danger" onClick={() => this.Sort()} > Sort </Button>
                    </Col>
                  </Row>
                  <Table className="table-hover table-striped">
                    <thead>
                      <tr>
                        {columns.map((col) => {
                          return (
                            <th
                              key={col.name}
                              className="border-0"
                              style={{ width: col.columnWidth }}
                            >
                              {col.name}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>{
                      nowrow2.map((row) => {      
                        const r2 = nowrow.find((row2) => row.ID === row2.ID);
                        
                          return (
                            <tr key={row.ID} >
                              <td> {row.GIScode} </td>
                              <td> {r2.Name} </td>
                              <td> {r2.Nationality} </td>
                              <td> {r2.Year} </td>
                              <td> {row.Status} </td>
                              <td style={{float: 'right'}}>
                                {/* <Button variant="info"  onClick={() =>
                                this.setState({
                                  redirect: "/admin/grading/" + row.ID,
                                })
                              } > Essay </Button> */}
                                <Button variant="warning"  onClick={() =>
                                this.setState({
                                  redirect: "/admin/oralgrading/" + row.ID,
                                })
                              } > Interview </Button>                              
                              </td>
                            </tr>
                        );
                      })  
                    }
                           
                  
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
        </Container>
      </>
    );
  }
  

}
