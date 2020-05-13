import React from "react";
import { Menu } from "semantic-ui-react";
import UserPanel from "./UserPanel";
import Channels from "./Channels";

let SidePanel = () => {
  return (
    <Menu className="side-menu" size="large" inverted fixed="left" vertical>
      <UserPanel />
      <Channels />
    </Menu>
  );
};

export default SidePanel;
