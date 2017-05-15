import React from "react";
import styled from "styled-components";

import PostHeader from "./post-header";
import PostBody from "./post-body";
import Comments from "../comments";

const PostContainer = styled.div`
  background-color: ${(props) => props.theme.babyPowder};
  border: 1px solid ${(props) => props.theme.gainsboro};
  border-radius: 3px;
  box-shadow: 0 4px 8px -2px ${(props) => props.theme.gainsboro};
  margin-bottom: 10px;
`;

class Post extends React.Component {
  render() {
    return (
      <PostContainer>
        <PostHeader {...this.props} />
        <PostBody {...this.props} />
        <Comments {...this.props} />
      </PostContainer>
    );
  }
}

export default Post;

