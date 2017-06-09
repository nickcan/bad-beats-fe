import React from "react";
import { RingLoader } from "halogen";
import styled from "styled-components";

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;

  position: absolute;
`;

const Text = styled.div`
  margin-top: 25px;
  margin-left: 15px;

  color: ${(props) => props.theme.babyPowder};
  font-size: 14px;
  text-align: center;

  opacity: 0.85;
`;

class Loader extends React.Component {
  render() {
    if (!this.props.isLoading) return null;

    return (
      <Container>
        <RingLoader
          color="#fff"
          size="55px"
        />
        <Text>Loading ...</Text>
      </Container>
    );
  }
}

export default Loader;
