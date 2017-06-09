import React from "react";
import styled from "styled-components";

import PostImage from "./post-image";
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


