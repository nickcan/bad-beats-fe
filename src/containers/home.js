import React from "react";
import styled from "styled-components";

const FeedContainer = styled.div`
  background-color: green;
  display: flex;
  margin: 0 auto;
  height: 400px;
  width: 700px;
`;

class Home extends React.Component {
  render() {
    return (
      <FeedContainer></FeedContainer>
    )
  }
}

export default Home;

