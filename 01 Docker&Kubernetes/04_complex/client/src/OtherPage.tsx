import React from "react";
import { Link } from "react-router-dom";

const OtherPage = (): JSX.Element => {
  return (
    <React.Fragment>
      <div>
        Im some other page!
        <br />
        <Link to="/">Go back home</Link>
      </div>
    </React.Fragment>
  );
};

export default OtherPage;
