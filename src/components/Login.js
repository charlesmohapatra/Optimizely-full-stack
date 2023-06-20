import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
// import { AnalyticsBrowser } from "@segment/analytics-next";
import "../App.css";

// export const analytics = AnalyticsBrowser.load({ writeKey: "6U8CbFjHTjqLqrrg37vueayqEIG9Fbds" });

export default function Login(props) {
  const [enteredValue, setEnteredValue] = useState("");

  const inputChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    props.onAddUserId(enteredValue);
  };

  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Optimizely-Segment Demo</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Stack gap={3} className="col-md-5 mx-auto mt-5">
        <Form onSubmit={formSubmitHandler}>
          <h3 className="mb-3">Sign In</h3>

          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>UserId or AnonymousId</Form.Label>
            <Form.Control type="text" className="form-control" placeholder="Enter userId or anonymousId" onChange={inputChangeHandler} />
          </Form.Group>

          <Button type="submit" variant="primary">
            Log in
          </Button>
        </Form>
      </Stack>
    </div>
  );
}
