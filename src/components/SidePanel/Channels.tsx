import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Icon, Modal, Button } from "semantic-ui-react";
import { Form, Input } from "semantic-ui-react-form-validator";
import { get } from "lodash";
import { database } from "../../firebase";
import { off, onValue, push, ref, set } from "firebase/database";
import {setCurrentChannel} from '../../redux/channel'

let Channels = () => {
  const dispatch = useDispatch()
  const { currentUser, currentChannel }: any = useSelector((state) => {
    return {
      currentUser: get(state, "user.currentUser"),
      currentChannel: get(state, "channel.currentChannel"),
    }
  })
  const [channels, setChannels] = useState([]);
  const [showModal, toggleModal] = useState(false);
  const [inputState, setInputState] = useState({
    channelName: "",
    channelDetails: "",
  });

  const channelsRef = ref(database, "channels");

  useEffect(() => {
    // Set up the listener
    const unsubscribe = onValue(channelsRef, (snapshot) => {
      const loadedChannels: any = [];
      snapshot.forEach((childSnapshot) => {
        loadedChannels.push(childSnapshot.val());
      });
      setChannels(loadedChannels);
    });

    // Cleanup function to remove the listener when the component unmounts
    return () => off(channelsRef, 'value', unsubscribe);
  }, []);

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
      dispatch(setCurrentChannel(newChannel));
    }
  };

  const handleInputChange = (e: any) => {
    setInputState({
      ...inputState,
      [e.target.name]: e.target.value,
    });
  };

  const addChannel = () => {
    if (currentUser) {
      const newChannelRef = push(ref(database, 'channels'))
      const newChannel = {
        id: newChannelRef.key,
        name: channelName,
        details: channelDetails,
        createdBy: {
          name: currentUser.displayName,
          avatar: currentUser.photoURL,
        },
      };
  
      set(newChannelRef, newChannel)
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
    }

  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addChannel();
  };

  console.log("currentChannel", currentChannel);

  const changeChannel = (channel: any) => {
    dispatch(setCurrentChannel(channel))
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
        {channels.map((channel: any) => (
          <Menu.Item
            key={channel.id}
            onClick={() => changeChannel(channel)}
            name={channel.name}
            active={channel.id === get(currentChannel, "id", null)}
          >
            # {channel.name}
          </Menu.Item>
        ))}
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

export default Channels;
