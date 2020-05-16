import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { get } from "lodash";
import { Segment, Comment } from "semantic-ui-react";

import Message from "./Message";
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import firebase from "../../firebase";

let Messages = (props) => {
  const { currentUser, currentChannel } = props;
  const [messages, setMessages] = useState([]);
  const [messagesLoading, toggleMessagesLoading] = useState(true);
  const messagesRef = firebase.database().ref("messages");

  useEffect(
    () => {
      if (currentChannel && currentUser) {
        console.log("sux", currentChannel);

        addListeners(currentChannel.id);
      }
      return () => messagesRef.off("child_added");
    },
    //eslint-disable-next-line
    [currentChannel]
  );

  const addListeners = (channelId) => {
    addMessageListener(channelId);
  };

  const addMessageListener = (channelId) => {
    setMessages([]);
    let loadedMessages = [];
    messagesRef.child(channelId).on("child_added", (snap) => {
      loadedMessages.push(snap.val());
      setMessages([...loadedMessages]);
      toggleMessagesLoading(false);
    });
  };

  const displayMessages = (messages) => {
    return (
      messages.length > 0 &&
      messages.map((message) => (
        <Message
          key={message.timestamp}
          message={message}
          currentUser={currentUser}
        />
      ))
    );
  };

  return (
    <Fragment>
      <MessagesHeader />
      {console.log("wtf", messages)}

      <Segment>
        <Comment.Group className="messages">
          {displayMessages(messages)}
        </Comment.Group>
      </Segment>

      <MessageForm messagesRef={messagesRef} />
    </Fragment>
  );
};

Messages = connect((state) => ({
  currentUser: get(state, "user.currentUser", null),
  currentChannel: get(state, "channel.currentChannel", null),
}))(Messages);

export default Messages;
