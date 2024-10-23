// import ColorPanel from "./ColorPanel/ColorPanel";
import SidePanel from "./SidePanel/SidePanel";
import Messages from "./Messages/Messages";
// import MetaPanel from "./MetaPanel/MetaPanel";
import styled from "styled-components";

let App = () => {
  const Wrapper = styled.div`
  .app {
    height: 100vh;
    background: #eee;
    display: flex;
  }

  .ui.grid {
    margin: 0rem;
  }

  .sidebar-menus {
    @media only screen and (max-width: 700px) {
      .ui.large.vertical.menu {
        width: 10rem;
      }
    }
  }

  .side-menu {
    background: #151515 !important;
    font-size: 16px;
    height: 100%;
  }

  .messages {
    height: calc(100vh - 280px);
    overflow-y: scroll;
  }

  .messages-center {
    position: relative;
    min-width: 450px;
    flex-grow: 1;
  }

  .message__form {
    position: absolute !important;
    bottom: 1em;
    left: 0;
    right: 1em;
    z-index: 200;
    width: 100%;
  }

  .ui.comments {
    max-width: none;
  }

  .message__self {
    border-left: 2px solid orange;
    padding-left: 8px;
  }
`;

  return (
    <Wrapper>
      <div className="app">
        <SidePanel />
        <Messages />
        {/* <MetaPanel /> */}
      </div>
    </Wrapper>
  );
};

export default App;


