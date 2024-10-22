import { useState } from "react";
import { get } from "lodash";
import firebase from "../../firebase";
import md5 from "md5";
import {
  Grid,
  Segment,
  Button,
  Header,
  Message,
  Icon,
  Loader,
} from "semantic-ui-react";
import { Form, Input } from "semantic-ui-react-form-validator";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

let Register = () => {
  const navigate = useNavigate();

  const [inputState, setInputState] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [fieldError, setFieldError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { username, email, password, passwordConfirmation } = inputState;
  const usersRef = firebase.database().ref("users");

  const handleChange = (e) => {
    setInputState({
      ...inputState,
      [e.target.name]: e.target.value,
    });
  };

  const isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      setFieldError("Password should be at least 6 chars");
      return false;
    } else if (password !== passwordConfirmation) {
      setFieldError("Password and confirmation should match ");
      return false;
    } else {
      return true;
    }
  };

  const isFormValid = () => {
    if (!isPasswordValid(inputState)) {
      return false;
    } else {
      setFieldError("");
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      setLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((createdUser) => {
          const userEmail = get(createdUser, "user.email", "");
          createdUser.user
            .updateProfile({
              displayName: username,
              photoURL: `https://robohash.org/${md5(userEmail)}?set=set4`,
            })
            .then(() => {
              saveUser(createdUser).then(() => {
                console.log("user saved");
                setSuccessMessage(
                  `${userEmail} has been successfully registered. Redirecting you to login`
                );
                setTimeout(() => {
                  navigate("/login");
                }, 3000);
              });
              setLoading(false);
            })
            .catch((err) => {
              setLoading(false);
              setFieldError(
                get(err, "message", "network error, please try again later")
              );
            });
        })
        .catch((err) => {
          console.error(err);
          setFieldError(
            get(err, "message", "network error, please try again later")
          );
          setLoading(false);
        });
    }
  };

  const saveUser = (createdUser) => {
    return usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
    });
  };

  return (
    <Wrapper>
      <Grid textAlign="center" verticalAlign="middle" className="register">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="orange" textAlign="center">
            <Icon name="puzzle piece" color="orange" />
            Register to Chat
          </Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>
              <Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={handleChange}
                value={username}
                validators={["required"]}
                errorMessages={["this field is required"]}
                width={16}
                type="text"
              />
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
              <Input
                fluid
                name="passwordConfirmation"
                icon="repeat"
                iconPosition="left"
                placeholder="Password Confirmation"
                onChange={handleChange}
                value={passwordConfirmation}
                validators={["required"]}
                errorMessages={["this field is required"]}
                width={16}
                type="password"
              />
              <Button color="orange" fluid size="large" disabled={loading}>
                {!loading && "Submit"}
                {loading && <Loader active inline size="small" />}
              </Button>
            </Segment>
            {successMessage && (
              <div className="ui positive message">{successMessage}</div>
            )}
            {fieldError && (
              <div className="ui negative message">{fieldError}</div>
            )}
            <Message>
              Already a user? <Link to="/login">Login</Link>
            </Message>
          </Form>
        </Grid.Column>
      </Grid>
    </Wrapper>
  );
};

export default Register;

const Wrapper = styled.div`
  .register {
    height: 100vh;
    background: #eee;
    padding: 1em;
  }
`;
