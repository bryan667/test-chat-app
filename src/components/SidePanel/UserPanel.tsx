import { get } from "lodash";
import { auth } from "../../firebase";
import { useSelector } from "react-redux";
import { Grid, Header, Icon, Dropdown, Image } from "semantic-ui-react";
import { signOut } from "firebase/auth";

let UserPanel = () => {
  const currentUser = useSelector((state) => get(state, "user.currentUser"));
  const handleSignOut = () => {
      signOut(auth)
      .then(() => console.log("signed out!"));
  };
  const photoURL = get(currentUser, "photoURL", null);
  const displayName = get(currentUser, "displayName", null);

  return (
    <Grid className="user-panel">
      <Grid.Column>
        <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
          <Header inverted floated="left" as="h2">
            <Icon name="code" />
            <Header.Content>Chat</Header.Content>
          </Header>
        </Grid.Row>

        <Header style={{ padding: "0.25em" }} as="h4" inverted>
          <Dropdown
            trigger={
              <span>
                <Image src={photoURL} spaced="right" avatar />
                {displayName}
              </span>
            }
          >
            <Dropdown.Menu>
              <Dropdown.Item text={`Signed in as ${displayName}`} disabled />
              <Dropdown.Item text="Change Avatar" />
              <Dropdown.Divider />
              <Dropdown.Item
                text="Sign Out"
                onClick={handleSignOut}
                description="ctrl + x"
              />
            </Dropdown.Menu>
          </Dropdown>
        </Header>
      </Grid.Column>
    </Grid>
  );
};

export default UserPanel;
