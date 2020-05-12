import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { Menu, Icon, Modal, Button } from "semantic-ui-react";
import { Form, Input } from "semantic-ui-react-form-validator";
import { get } from "lodash";
import firebase from "../../firebase";

let Channels = (props) => {
  const { currentUser } = props;

  const [channels, setChannels] = useState([]);
  const [showModal, toggleModal] = useState(false);
  const [inputState, setInputState] = useState({
    channelName: "",
    channelDetails: "",
  });

  const channelsRef = firebase.database().ref("channels");
  const { channelName, channelDetails } = inputState;

  const handleInputChange = (e) => {
    setInputState({
      ...inputState,
      [e.target.name]: e.target.value,
    });
  };

  const addChannel = () => {
    const key = channelsRef.push().key;
    const newChannel = {
      id: key,
      name: channelName,
      details: channelDetails,
      createdBy: {
        name: currentUser.displayName,
        avatar: currentUser.photoURL,
      },
    };

    channelsRef
      .child(key)
      .update(newChannel)
      .then(() => {
        setInputState({
          channelName: "",
          channelDetails: "",
        });
        toggleModal(false);
        console.log("channel added");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addChannel();
  };

  return (
    <Fragment>
      <Menu.Menu style={{ paddingBottom: "2em" }}>
        <Menu.Item>
          <span>
            <Icon name="exchange" /> CHANNELS
          </span>
          &nbsp; ({channels.length})
          <Icon
            name="add"
            onClick={() => {
              toggleModal(true);
            }}
          />
        </Menu.Item>
      </Menu.Menu>

      <Modal basic open={showModal} onClose={() => toggleModal(false)}>
        <Modal.Header>Add a Channel</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleSubmit}>
            <Input
              fluid
              label="Name of Channel"
              name="channelName"
              onChange={handleInputChange}
              validators={["required"]}
              errorMessages={["this field is required"]}
              value={channelName}
              width={16}
              inline={"true"}
              type="text"
            />
            <Input
              fluid
              label="About the Channel"
              name="channelDetails"
              onChange={handleInputChange}
              validators={["required"]}
              errorMessages={["this field is required"]}
              value={channelDetails}
              width={16}
              inline={"true"}
              type="text"
            />

            <div style={{ textAlign: "right" }}>
              <Button color="green" inverted>
                <Icon name="checkmark" /> Add
              </Button>
              <Button color="red" inverted onClick={() => toggleModal(false)}>
                <Icon name="remove" /> Cancel
              </Button>
            </div>
          </Form>
        </Modal.Content>
      </Modal>
    </Fragment>
  );
};

Channels = connect((state) => ({
  currentUser: get(state, "user.currentUser", null),
}))(Channels);

export default Channels;
