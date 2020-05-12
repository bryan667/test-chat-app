import React from "react";
import styled from "styled-components";
import { Menu } from "semantic-ui-react";
import UserPanel from "./UserPanel";
import Channels from "./Channels";

let SidePanel = () => {
  return (
    <Wrapper>
      <Menu className="side-menu" size="large" inverted fixed="left" vertical>
        <UserPanel />
        <Channels />
      </Menu>
    </Wrapper>
  );
};

export default SidePanel;

const Wrapper = styled.div`
  .side-menu {
    background: #4c3c4c !important;
    font-size: 1.2rem;
  }
`;
