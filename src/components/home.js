import React from "react";
import styled from "styled-components";

import Feed from "../containers/feed";

const FeedContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  margin: 42px auto;
  height: 400px;
  width: 650px;

  @media (max-width: 650px) {
    margin: 18px auto;
    width: 100%;
  }
`;

class Home extends React.Component {
  render() {
    return (
      <FeedContainer>
        <Feed sport={this.props.match.params.sport} />
      </FeedContainer>
    )
  }
};

export default Home;
