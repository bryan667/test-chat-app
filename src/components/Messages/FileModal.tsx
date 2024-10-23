import { Modal, Input, Button, Icon } from "semantic-ui-react";

let FileModal = (props: any) => {
  const { show, onHide } = props;

  return (
    <Modal basic open={show} onClose={onHide}>
      <Modal.Header>Select an Image File</Modal.Header>
      <Modal.Content>
        <Input fluid label="File types: jpg, png" name="file" type="file" />
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" inverted>
          <Icon name="checkmark" /> Send
        </Button>
        <Button color="red" inverted onClick={onHide}>
          <Icon name="remove" /> Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default FileModal;
