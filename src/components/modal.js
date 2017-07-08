import React, { Component } from "react";
import styled from "styled-components";

const OuterContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;

  background: rgba(0, 0, 0, 0.7);
`;

const Container = styled(OuterContainer)`
  display: flex;
  justify-content: center;
  align-items: center;

  background: 0;
`;

const InnerContainer = styled.div`
  min-height: 300px;
  width: 500px;

  padding: 15px;

  background-color: ${(props) => props.theme.babyPowder};
  border-radius: 3px;

  z-index: 1;

  @media (max-width: 650px) {
    width: 100%;
  }
`;

class Modal extends Component {
  render() {
    return (
      <Container>
        <OuterContainer onClick={() => this.props.history.push("/")} />
        <InnerContainer>
          {this.props.children}
        </InnerContainer>
      </Container>
    );
  }
}

export default Modal;
