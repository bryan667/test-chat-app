import { useState } from "react";
import { get } from "lodash";
import { auth } from "../../firebase";
import {
  Grid,
  Segment,
  Button,
  Header,
  Message,
  Icon,
  Loader,
} from "semantic-ui-react";
import {signInWithEmailAndPassword} from 'firebase/auth'
import { Form, Input } from "semantic-ui-react-form-validator";
import { Link } from "react-router-dom";
import styled from "styled-components";

let Login = () => {
  const [inputState, setInputState] = useState({
    email: "",
    password: "",
  });

  const [fieldError, setFieldError] = useState("");
  const [loading, setLoading] = useState(false);

  const { email, password } = inputState;

  const handleChange = (e: any) => {
    setInputState({
      ...inputState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((signedInUser) => {
        console.log("signedInUser", signedInUser);
      })
      .catch((err) => {
        console.error(err);
        setFieldError(
          get(err, "message", "network error, please try again later")
        );
        setLoading(false);
      });
  };

  return (
    <Wrapper>
      <Grid textAlign="center" verticalAlign="middle" className="register">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="violet" textAlign="center">
            <Icon name="puzzle piece" color="violet" />
            Login to Chat
          </Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>
              <Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                onChange={handleChange}
                value={email}
                validators={["required", "isEmail"]}
                errorMessages={["this field is required"]}
                width={16}
                type="email"
              />
              <Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={handleChange}
                value={password}
                validators={["required"]}
                errorMessages={["this field is required"]}
                width={16}
                type="password"
              />
              <Button color="violet" fluid size="large" disabled={loading}>
                {!loading && "Submit"}
                {loading && <Loader active inline size="small" />}
              </Button>
            </Segment>

            {fieldError && (
              <div className="ui negative message">{fieldError}</div>
            )}
            <Message>
              Don't have an account? <Link to="/register">Register</Link>
            </Message>
          </Form>
        </Grid.Column>
      </Grid>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  .register {
    height: 100vh;
    background: #eee;
    padding: 1em;
  }
`;
