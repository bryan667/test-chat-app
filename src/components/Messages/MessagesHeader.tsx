import { get } from "lodash";
import { useSelector } from "react-redux";
import { Header, Segment, Input, Icon } from "semantic-ui-react";

let MessagesHeader = () => {
  const { currentChannel }: any = useSelector((state: any) => {
    return {
      currentUser: get(state, "user.currentUser"),
      currentChannel: get(state, "channel.currentChannel"),
    }
  })

  return (
    <Segment clearing>
      <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
        <span>
          {`Channel ${currentChannel?.name || ""}`}
          <Icon name={"star outline"} color="black" />
        </span>
        <Header.Subheader>2 Users</Header.Subheader>
      </Header>
      <Header floated="right">
        <Input
          size="mini"
          icon="search"
          name="searchTerm"
          placeholder="Search Messages"
        />
      </Header>
    </Segment>
  );
};

export default MessagesHeader;
