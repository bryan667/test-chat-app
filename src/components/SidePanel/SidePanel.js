import React from "react";
import { Menu } from "semantic-ui-react";
import UserPanel from "./UserPanel";
import Channels from "./Channels";

let SidePanel = () => {
  return (
    <div className="sidebar-menus">
      <Menu className="side-menu" size="large" inverted vertical>
        <UserPanel />
        <Channels />
      </Menu>
    </div>
  );
};

export default SidePanel;
