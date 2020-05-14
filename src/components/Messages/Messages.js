import React, { Fragment } from 'react';
import { Segment, Comment } from 'semantic-ui-react';

import MessagesHeader from './MessagesHeader';
import MessageForm from './MessageForm';
import firebase from '../../firebase';

let Messages = () => {
  const messagesRef = firebase.database().ref('messages');

  return (
    <Fragment>
      <MessagesHeader />

      <Segment>
        <Comment.Group className="messages">{/* {Messages} */}</Comment.Group>
      </Segment>

      <MessageForm messagesRef={messagesRef} />
    </Fragment>
  );
};

export default Messages;
