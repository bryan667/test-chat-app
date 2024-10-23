import { useState, useRef } from "react";
import { get, isEmpty } from "lodash";
import { Segment, Button, Input } from "semantic-ui-react";
import { useSelector } from "react-redux";
import FileModal from "./FileModal";
import { push, ref, set } from "firebase/database";
import { database } from "../../firebase";

let MessageForm = () => {
  const messageInputRef:any = useRef();
  const { currentUser, currentChannel }: any = useSelector((state) => {
    return {
      currentUser: get(state, "user.currentUser"),
      currentChannel: get(state, "channel.currentChannel"),
    }
  })

  const [input, setInput] = useState({
    message: "",
  });
  const [loading, toggleLoading] = useState(false);
  const [error, setError] = useState([]);
  const [showUploadModal, toggleUploadModal] = useState(false);

  const handleChange = (e: any) => {
    setError([]);
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const sendMessage = () => {
    if (!isEmpty(input.message)) {
      toggleLoading(true);
      const messageRef = push(ref(database, `messages/${currentChannel.id}`))

      set(messageRef, {
          timestamp: Date.now(),
          content: input.message,
          user: {
            id: currentUser.uid,
            name: currentUser.displayName,
            avatar: currentUser.photoURL,
          },
        })
        .then(() => {
          toggleLoading(false);
          setInput({ ...input, message: "" });
          setError([]);
          messageInputRef.current.focus();
        })
        .catch((err) => {
          toggleLoading(false);
          console.error(err);
          const tempError = [...error];
          setError(tempError.concat(err));
          messageInputRef.current.focus();
        });
    }
  };

  const hasError = get(error, "message", []);

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <Segment className="message__form">
      <Input
        fluid
        name="message"
        onChange={handleChange}
        value={input.message}
        disabled={loading}
        style={{ marginBottom: "0.7em" }}
        label={<Button icon={"add"}></Button>}
        labelPosition="left"
        placeholder="Write your message"
        className={`${!isEmpty(hasError) ? "error" : ""}`}
        onKeyDown={handleKeyDown}
        ref={messageInputRef}
      />
      <Button.Group icon widths="2">
        <Button
          color="orange"
          content="Add Reply"
          labelPosition="left"
          icon="edit"
          onClick={sendMessage}
        />
        <Button
          color="teal"
          content="Upload Media"
          labelPosition="right"
          icon="cloud upload"
          onClick={() => toggleUploadModal(!showUploadModal)}
        />

        {showUploadModal && (
          <FileModal
            show={showUploadModal}
            onHide={() => toggleUploadModal(false)}
          />
        )}
      </Button.Group>
    </Segment>
  );
};

export default MessageForm;
