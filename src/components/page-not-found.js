import React from "react";
import { Link } from "react-router-dom";

class PageNotFound extends React.Component {
  render() {
    return (
      <Link to="/">404: Page Not Found</Link>
    );
  }
}

export default PageNotFound;
