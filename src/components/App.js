import React from "react";
import { Grid } from "semantic-ui-react";
import styled from "styled-components";
import ColorPanel from "./ColorPanel/ColorPanel";
import SidePanel from "./SidePanel/SidePanel";
import Messages from "./Messages/Messages";
import MetaPanel from "./MetaPanel/MetaPanel";

let App = () => {
  return (
    <Wrapper>
      <Grid columns="equal" className="app">
        <ColorPanel />
        <SidePanel />

        <Grid.Column style={{ marginLeft: 320 }}>
          <Messages />
        </Grid.Column>

        <Grid.Column width={4}>
          <MetaPanel />
        </Grid.Column>
      </Grid>
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div`
  .app {
    height: 100vh;
    background: #eee;
  }

  .ui.grid {
    margin: 0rem;
  }
`;
