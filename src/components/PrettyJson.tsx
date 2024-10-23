import { FC } from 'react';

type TProps = {
  json: any;
  title?: string;
};

const PrettyJson: FC<TProps> = ({ json, title = null }) => {
  return (
    <div className="row">
      <div className="col-md-12 white-bg">
        {title && <h4>{title}</h4>}
        <pre>{JSON.stringify(json, null, 2)}</pre>
      </div>
    </div>
  );
};

export default PrettyJson;