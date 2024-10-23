import { useState } from "react";
import { get, isEmpty } from "lodash";
import {database, auth} from "../../firebase";
import {createUserWithEmailAndPassword, updateProfile, UserCredential} from 'firebase/auth'
import { ref, set } from "firebase/database";
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

  const handleChange = (e: any) => {
    setInputState({
      ...inputState,
      [e.target.name]: e.target.value,
    });
  };

  const isPasswordValid = ({ password, passwordConfirmation }: {
    password: string,
    passwordConfirmation: string,
  }) => {
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (isFormValid()) {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((createdUser) => {
          const userEmail = get(createdUser, "user.email", "");
          return updateProfile(createdUser.user, {
              displayName: username,
              photoURL: `https://robohash.org/${md5(userEmail)}?set=set4`,
            })
            .then(() => {
              return saveUser(createdUser).then(() => {
                console.log("user saved");
                setSuccessMessage(
                  `${userEmail} has been successfully registered. Redirecting you to login`
                );
                setLoading(false);
              });    
            })
            .catch((err) => {
              setFieldError(
                get(err, "message", "network error, please try again later")
              );
              setLoading(false);
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

  const saveUser = (createdUser: UserCredential) => {
    const userRef = ref(database, `users/${createdUser.user.uid}`);
    return set(userRef, {
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
    });
  };

  return (
    <>
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
    </>
  );
};

export default Register;
