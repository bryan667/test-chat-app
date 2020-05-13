import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Menu, Icon, Modal, Button } from "semantic-ui-react";
import { Form, Input } from "semantic-ui-react-form-validator";
import { get } from "lodash";
import firebase from "../../firebase";
import * as channelActions from "../../redux/channel/actions";

let Channels = (props) => {
  const { currentUser, currentChannel, setCurrentChannel } = props;
  const [channels, setChannels] = useState([]);
  const [showModal, toggleModal] = useState(false);
  const [inputState, setInputState] = useState({
    channelName: "",
    channelDetails: "",
  });

  const channelsRef = firebase.database().ref("channels");

  const addListeners = () => {
    let loadedChannels = [];
    channelsRef.on("child_added", (snap) => {
      loadedChannels.push(snap.val());
      setChannels([...loadedChannels]);
    });
  };

  useEffect(
    () => {
      addListeners();
      return () => channelsRef.off("child_added");
    },
    //eslint-disable-next-line
    []
  );

  useEffect(
    () => {
      setNewChannel();
    },
    //eslint-disable-next-line
    [channels]
  );

  const { channelName, channelDetails } = inputState;

  const setNewChannel = () => {
    const newChannel = channels[channels.length - 1];

    if (channels.length > 0) {
      setCurrentChannel(newChannel);
    }
  };

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

  console.log("currentChannel", currentChannel);

  const displayChannels = (channels) => {
    return (
      channels.length > 0 &&
      channels.map((channel) => (
        <Menu.Item
          key={channel.id}
          onClick={() => changeChannel(channel)}
          name={channel.name}
          style={{ opacity: 0.7 }}
          active={channel.id === get(currentChannel, "id", null)}
        >
          # {channel.name}
        </Menu.Item>
      ))
    );
  };

  const changeChannel = (channel) => {
    setCurrentChannel(channel);
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
        {displayChannels(channels)}
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

Channels = connect(
  (state) => ({
    currentUser: get(state, "user.currentUser", null),
    currentChannel: get(state, "channel.currentChannel", null),
  }),
  channelActions
)(Channels);

export default Channels;
