import { useState, useEffect } from "react";
import { get, isEmpty } from "lodash";
import { Segment, Comment } from "semantic-ui-react";
import Message from "./Message";
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import { database } from "../../firebase";
import { child, off, onValue, ref } from "firebase/database";
import { useSelector } from "react-redux";
// import PrettyJson from "../PrettyJson";

let Messages = () => {
  const { currentUser, currentChannel }: any = useSelector((state) => {
    return {
      currentUser: get(state, "user.currentUser"),
      currentChannel: get(state, "channel.currentChannel"),
    }
  })
  const [messages, setMessages] = useState([]);
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
    },
    //eslint-disable-next-line
    [currentChannel]
  );

  return (
    <div className="messages-center">      
      {/* <PrettyJson json={{currentUser, currentChannel}} /> */}
      <MessagesHeader />
      <Segment>        
        <Comment.Group className="messages">
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
      <MessageForm />
    </div>
  );
};

export default Messages;
