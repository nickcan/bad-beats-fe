import { RingLoader } from "halogen";
import React from "react";
import styled from "styled-components";

import Votes from "../votes";

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const TextContainer = styled.div`
  box-sizing: border-box;
  color: ${(props) => props.theme.davysGray};
  font-size: 18px;
  font-family: Helvetica, sans-serif;
  line-height: 22px;
  font-weight: 100;
  margin: 5px 0 20px;
  padding: 0 40px;

  @media (max-width: 500px) {
    padding: 0 15px;
  }
`;

const ImageContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.theme.gainsboro};
  min-height: 300px;

  img {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 600px) {
    min-height: 150px;
  }
`;

class Loader extends React.Component {
  render() {
    if (!this.props.isLoading) return null;

    return (
      <RingLoader
        color="#fff"
        size="40px"
      />
    );
  }
}

class PostImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingStatus: "loading"
    }
  }

  handleImageError() {
    this.setState({ loadingStatus: "failed" });
  }

  handleImageLoaded() {
    this.setState({ loadingStatus: "loaded" });
  }

  render() {
    if (!this.props.image || !this.props.image.url) return null;

    return (
      <ImageContainer>
        <Loader isLoading={this.props.loadingStatus === "loading"} />
        <img
          src={this.props.image.url} alt=""
          onError={() => this.handleImageError()}
          onLoad={() => this.handleImageLoaded()}
        />
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
        <Votes
          currentUserHasVoted={this.props.currentUserHasVoted}
          handleClick={() => this.props.votePost(this.props.id, this.props.currentUserHasVoted)}
          voteCount={this.props.voteCount}
        />
      </BodyContainer>
    );
  }
}

export default PostBody;


