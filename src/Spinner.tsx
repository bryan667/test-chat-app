import { Loader, Dimmer } from "semantic-ui-react";

const Spinner = () => {
  return (
    <Dimmer active>
      <Loader size="huge" content={"Preparing chat..."} />
    </Dimmer>
  );
};

export default Spinner;
