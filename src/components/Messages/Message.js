import React from "react";
import moment from "moment";
import { Comment } from "semantic-ui-react";

let Message = (props) => {
  const { message, currentUser } = props;

  const isOwnMessage = (message, currentUser) => {
    return message.user.id === currentUser.uid ? "message__self" : "";
  };

  const timeFromNow = (timestamp) => moment(timestamp).fromNow();

  return (
    <Comment>
      <Comment.Avatar src={message.user.avatar} />
      <Comment.Content className={isOwnMessage(message, currentUser)}>
        <Comment.Author as="a">{message.user.name}</Comment.Author>
        <Comment.Metadata>{timeFromNow(message.timstamp)}</Comment.Metadata>
        <Comment.Text>{message.content}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
};

export default Message;
