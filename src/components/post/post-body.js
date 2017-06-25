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

const ActionBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-top: 1px solid ${(props) => props.theme.whiteSmoke};
  padding: 15px;
`;

const CommentCountContainer = styled.div`
  padding-top: 2px;

  color: ${(props) => props.theme.ashGray};
  font-size: 12px;
`;

const CommentCount = function({
  ...props
}) {
  if (props.commentCount <= 0) return null;

  return <CommentCountContainer>Comments {props.commentCount}</CommentCountContainer>
}

class PostBody extends React.Component {
  render() {
    return (
      <BodyContainer>
        <TextContainer>{this.props.text}</TextContainer>
        <PostImage image={this.props.images[0]} />
        <ActionBar>
          <Votes
            currentUserHasVoted={this.props.currentUserHasVoted}
            handleClick={() => this.props.votePost(this.props.id, this.props.currentUserHasVoted)}
            voteCount={this.props.voteCount}
          />
          <CommentCount commentCount={this.props.commentCount} />
        </ActionBar>
      </BodyContainer>
    );
  }
}

export default PostBody;


