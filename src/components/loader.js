import React from "react";
import { RingLoader } from "halogen";

class Loader extends React.Component {
  render() {
    return (
      <RingLoader
        color="#fff"
        size="60px"
      />
    );
  }
}

export default Loader;
