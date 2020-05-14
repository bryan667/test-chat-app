import React, { useState } from 'react';
import { get, isEmpty } from 'lodash';
import { Segment, Button, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import firebase from '../../firebase';

let MessageForm = props => {
  const { messagesRef } = props;

  //redux
  const { currentChannel, currentUser } = props;

  const [input, setInput] = useState({
    message: '',
  });
  const [loading, toggleLoading] = useState(false);
  const [error, setError] = useState([]);

  const handleChange = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const sendMessage = () => {
    if (!isEmpty(input.message)) {
      toggleLoading(true);
      messagesRef
        .child(currentChannel.id)
        .push()
        .set({
          timestamp: firebase.database.ServerValue.TIMESTAMP,
          content: input.message,
          user: {
            id: currentUser.ui,
            name: currentUser.displayName,
            avatar: currentUser.photoURL,
          },
        })
        .then(() => {
          toggleLoading(false);
          setInput({ ...input, message: '' });
          setError([]);
        })
        .catch(err => {
          toggleLoading(false);
          console.error(err);
          const tempError = [...error];
          setError(tempError.concat(err));
        });
    } else {
      const tempError = [...error];
      setError(tempError.concat({ message: 'Add a message' }));
    }
  };

  return (
    <Segment className="message__form">
      <Input
        fluid
        name="message"
        onChange={handleChange}
        style={{ marginBottom: '0.7em' }}
        label={<Button icon={'add'}></Button>}
        labelPosition="left"
        placeholder="Write your message"
        className={error => (error.message.includes('message') ? 'error' : '')}
      />
      <Button.Group icon widths="2">
        <Button color="orange" content="Add Reply" labelPosition="left" icon="edit" onClick={sendMessage} />
        <Button color="teal" content="Upload Media" labelPosition="right" icon="cloud upload" />
      </Button.Group>
    </Segment>
  );
};

MessageForm = connect(state => ({
  currentUser: get(state, 'user.currenUser'),
  currentChannel: get(state, 'channel.currentChannel'),
}))(MessageForm);

export default MessageForm;
