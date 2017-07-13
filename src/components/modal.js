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
  overflow: scroll;

  padding: 15px;
  min-height: 300px;
  max-height: 100vh;
  width: 500px;

  background-color: ${(props) => props.theme.babyPowder};
  border-radius: 3px;

  z-index: 1;

  @media (max-width: 650px) {
    width: 100%;
    height: 100vh;

    border-radius: 0;
  }
`;

class Modal extends Component {
  render() {
    return (
      <Container>
        <OuterContainer onClick={this.props.handleClose} />
        <InnerContainer>
          {this.props.children}
        </InnerContainer>
      </Container>
    );
  }
}

export default Modal;
