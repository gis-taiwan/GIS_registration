import React from "react";
// import Sidebar from 'components/Sidebar/Sidebar.js';
// react-bootstrap components
// import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { Button, Card, Col } from "react-bootstrap";
import { getCookie, setCookie } from "components/Navbars/CookieUsage";
// import LoginAPI from "../api.js";

const { GoogleSpreadsheet } = require('google-spreadsheet');

const loginSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password too short.")
    .max(50, "Password too long.")
    .required("Required"),
  username: Yup.string()
    .min(3, "Username too short.")
    .max(50, "Username too long")
    .required("Required")
});

class LoginForm extends React.Component {

  constructor(){
    super();
    this.state = {
      nowsheet: undefined,
    }
  }

  async componentDidMount() {
    await this.InitAPI();
  }

  InitAPI = async () => {
    // Initialize the sheet - doc ID is the long id in the sheets URL
    const doc = new GoogleSpreadsheet('1yR2v8F7P1s5wFdoc0lXrB5vsGnwAEqoj7ciELjco45o');
  
    // Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
    await doc.useServiceAccountAuth({
      client_email: "forgradingapi@gradingsheetapi.iam.gserviceaccount.com",
      private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQD0Gjk/hCyMUGKt\naKO+sam76U+blCsFJktFEnb6mrpRn/YPPn2lSVH71dq1qL8we66V/ORK0tkGQ1b5\nvV5l9MOtGs5iZSi19upIx/6TzSHfgBNX6lknNfuszG1TCTpYX1LxbAFYFQ7eZAcD\n6YjwAk9hNOcA4t3TAUlcWDznZDeFdq8BfRFTavbqW1IW5lzf0drfgteK9No3jD61\nSnEfUC2qKk3PuHa8dz9qxZxZJbA5CHduXZ9CHzz8RIO/BlbD8eCDVK1sXneKHWKv\n3amlb3UZSGu5/T5QcDTGc8z7NvxuoTl4vujoUhC9donAPjErUzWFgvZyqOyB38F1\nLMQOISmnAgMBAAECggEAGyCTmR/utXSKKtGfVOYN7LChJLM4KV0tQz1UlJq/tv+A\nYFxQ/p6Mf7YElWiYlWJBWjDIYW+s0k8x1L+QmeMJdezYim3J3ZhVnAYBytoiorcV\n2eYqHJCZagWD5r+hSMiQgVI/6f0ucao1xLUI1KdlEUfy82cYQMalU5+zZlb9ppVS\nN7oHt+Fy4XxMzn1zbYQttBb5qAiqs8sCeWBZjn1rYSPZJV5qllt7tmH6WtfzdDM2\npQQQ2V7jGm31B+REVXjJYORb20PkSsS1x/0VSAwN9xsx1nVTfSSRiuHArFB04LUI\nlBsCTdUxHfFzCGiC8WTBLehb0cHCOLSeL0+n+U5BPQKBgQD8/vBSbA4KG82264TA\n1oj6VHH24nnsMz9bho+M4a6JetmsrcdEf8sbcnDrxqvMIs22bFpHq1SxpqFg7tar\nZP57Rdk9sF5wVI0/4eATSRhZw1X2MZ6CIG4VKlp71pOtIILRA+fp9Xoscrvcw6j2\nFaZnP+XJpP/w35suQB/0lJ+oEwKBgQD3AEAgo+S3UsGGAU3YvZ2dbW23aOmf/Hjc\noZNeRh1xUMNyc8Sjzqngc9VyJaFz+lgb+QHjYAmXfbGi9kohDI5VhaRHAN9uSRap\nyhx/a8nUH3ot6P2K6LGW37jb28MzhQCG2BrccvOsYz5hxYmE/uujjD1icABaj/Rq\nG7H62DtSnQKBgQCIE8/LZVc/1KiXRKKI3lua2aTauAIAK6heYEgB7LlmNO+z01yk\n2V+ziaB3EMsC541iG3GLrvnE++09J/nLAm1mfLFWXvDM1o2K2MEfXmd8kHZCD3pE\nX5EWTUuR5F5V9nCmX8Vzr5dhJO0q1wqgIhD45AOCq/8F3h+nhtIpSW9+hQKBgQDm\nzG8fkMWIn2WBh/prylJa5gOdXAThn5J35urDLpUYazUV3yMhRVzrBJGwBYWlz4lB\nKh4fjn+n9KVl9ukxlH/zXdsxFZmxfc4VfWu/jMKc2YTbHVi80c4PgqFDn0f4/hCN\n76S51RfoPxvtVB26DlG1ErfRIYLTHKxv8c0O7boQ6QKBgFK3McdFX5OLgNkZprzx\ngZEC23mxdb/zF8NlVR7VzZajyjiQTHjmiDHyxW1Kxg+uBrU0BVoU03WrhyFhZJLK\nyTWh1d7LJWyjQeE0Bao1GNNATmqBQcAsUz36Km/A+e/1x6cJeWQyNxtt9qP4pBA6\nKMeSHgwmJB0Nj0UXCyWkjJVw\n-----END PRIVATE KEY-----\n",
    });
    await doc.loadInfo(); // loads document properties and worksheets
    if(doc){
      const sheet = doc.sheetsByIndex[0];
      const rows = await sheet.getRows();
      this.setState({nowsheet: rows});
    }else{
      alert("Can't find file\n");
    }
  
  }

  handleSubmit = (values, { setSubmitting }) => {
    const rows = this.state.nowsheet;
    var row = rows.filter((nowrow) => {return nowrow.Username === values.username});
    if(row[0] === undefined || row[0].Password !== values.password){
      alert("Username or Password not correct!\n");
      window.location.reload();
    }else{
      setCookie("username", values.username, 30);     
      setCookie("role", row[0].Role, 30); 
      window.location.href = '..';
    }

  };
  
  render() {
  if(getCookie("username") !== ""){
    alert("You've already login!\n");
    return (<Card></Card>);
  }
  else{
    return (
      <Card>
        <Card.Header>
          <Card.Title as="h3">Please Login</Card.Title>
        </Card.Header>
        <Card.Body>
      <>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={this.handleSubmit}
        >
          {({ isSubmitting }) => {
            return (
              <Form>
                <Col className="px-1" md="3">
                <label>
                  Account:   <br /><Field type="username" name="username" />
                  <ErrorMessage name="username" component="div" />
                </label>
                </Col>
                <Col className="px-1" md="3">
                <label>
                  Password:   <br /><Field type="password" name="password" />
                  <ErrorMessage name="password" component="div" />
                </label>
                </Col>
                <Button type="submit" disabled={isSubmitting}>
                  Login
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
}

// $(document).ready

export default LoginForm;
// function Login(){

//     return(
//         <div>this is login page</div>
//     )
// }
// export default Login;
