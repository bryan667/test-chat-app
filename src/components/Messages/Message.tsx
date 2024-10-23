import moment from "moment";
import { Comment } from "semantic-ui-react";

let Message = (props: any) => {
  const { message, currentUser } = props;

  const isOwnMessage = (message: any, currentUser: any) => {
    return message.user.id === currentUser.uid ? "message__self" : "";
  };

  const timeFromNow = (timestamp: string) => moment(timestamp).fromNow();

  return (
    <Comment>
      <Comment.Avatar src={message.user.avatar} />
      <Comment.Content className={isOwnMessage(message, currentUser)}>
        <Comment.Author as="a">{message.user.name}</Comment.Author>
        <Comment.Metadata>{timeFromNow(message.timestamp)}</Comment.Metadata>
        <Comment.Text>{message.content}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
};

export default Message;
