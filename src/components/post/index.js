import React from "react";
import styled from "styled-components";

import UniversalStyles from "../../universal-styles";

import PostHeader from "./post-header";

const PostContainer = styled.div`
  background-color: ${UniversalStyles.colors.white};
  margin-bottom: 10px;
`;

class Post extends React.Component {
  render() {
    return (
      <PostContainer>
        <PostHeader {...this.props} />
      </PostContainer>
    );
  }
}

export default Post;

