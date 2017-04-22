import React from "react";
import styled from "styled-components";

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const TextContainer = styled.div`
  color: ${(props) => props.theme.charcoal};
  font-size: 18px;
  font-family: Helvetica, sans-serif;
  line-height: 22px;
  font-weight: 100;
  padding: 0 40px 20px;
`;

const ImageContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.theme.mediumGray};
  min-height: 300px;

  img {
    width: 100%;
    height: 100%;
  }
`;

class PostImage extends React.Component {
  render() {
    if (!this.props.image || !this.props.image.url) return null;

    return (
      <ImageContainer>
        <img src={this.props.image.url} />
      </ImageContainer>
    );
  }
}

class PostBody extends React.Component {
  render() {
    return (
      <BodyContainer>
        <TextContainer>{this.props.text}</TextContainer>
        <PostImage image={this.props.images[0]} />
      </BodyContainer>
    );
  }
}

export default PostBody;


