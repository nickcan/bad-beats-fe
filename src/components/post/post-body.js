import LazyLoad from "react-lazyload";
import React from "react";
import styled from "styled-components";

import Loader from "../loader";
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
  font-family: ${(props) => props.theme.mainFont};
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
  background-color: ${(props) => props.theme.charlestonGreen};
  min-height: 300px;

  img {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 600px) {
    min-height: 150px;
  }
`;

class PostImage extends React.Component {
  render() {
    if (!this.props.image || !this.props.image.url) return null;

    return (
      <ImageContainer>
        <LazyLoad
          offset={400}
          placeholder={<Loader isLoading={true} />}
        >
          <img src={this.props.image.url} alt="" />
        </LazyLoad>
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


