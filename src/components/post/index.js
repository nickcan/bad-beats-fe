import React from "react";
import styled from "styled-components";

import UniversalStyles from "../../universal-styles";

import PostHeader from "./post-header";

const PostContainer = styled.div`
  background-color: ${UniversalStyles.colors.white};
  border: 1px solid ${UniversalStyles.colors.mediumGray};
  border-radius: 3px;
  box-shadow: 0 4px 8px -2px ${UniversalStyles.colors.mediumGray};
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

