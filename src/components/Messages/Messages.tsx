import { useState, useEffect } from "react";
import { get, isEmpty } from "lodash";
import { Segment, Comment, Loader } from "semantic-ui-react";
import Message from "./Message";
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import { database } from "../../firebase";
import { child, off, onValue, ref } from "firebase/database";
import { useSelector } from "react-redux";
import PrettyJson from "../PrettyJSON";

let Messages = () => {
  const { currentUser, currentChannel }: any = useSelector((state) => {
    return {
      currentUser: get(state, "user.currentUser"),
      currentChannel: get(state, "channel.currentChannel"),
    }
  })
  const [messages, setMessages] = useState([]);
  const [messagesLoading, toggleMessagesLoading] = useState(true);
  const messagesRef = ref(database, "messages");

  useEffect(
    () => {
      if (currentChannel && currentUser) {
        const channelMessagesRef = child(messagesRef, currentChannel.id);
        const unsubscribe = onValue(channelMessagesRef, (snapshot) => {
          const loadedMessages: any = [];
          snapshot.forEach((childSnapshot) => {
            loadedMessages.push(childSnapshot.val());
          });
          setMessages(loadedMessages);          
        });
        return () => off(channelMessagesRef, 'value', unsubscribe);
      }
      toggleMessagesLoading(false);
    },
    //eslint-disable-next-line
    [currentChannel]
  );

  return (
    <div className="messages-center">
      <MessagesHeader />
      <PrettyJson json={{messagesLoading, messages, currentChannel, currentUser}}/>
      <Segment>
        <Comment.Group className="messages">
          {messagesLoading && (
            <Loader active inline="centered" />
          )}
                    
          {!isEmpty(messages) && 
            <>
              {messages.map((message: any) => (
                  <Message
                    key={message.timestamp}
                    message={message}
                    currentUser={currentUser}
                  />
                ))}
            </>
          }
        </Comment.Group>
      </Segment>

      <MessageForm messagesRef={messagesRef} />
    </div>
  );
};

export default Messages;
