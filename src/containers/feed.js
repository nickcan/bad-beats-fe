import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import React from "react";
import styled from "styled-components";

import * as FeedActions from "../actions/feed-actions";

import Post from "../components/post";

const PostsContainer = styled.div`
  width: 100%;
`;

class feed extends React.Component {
  componentWillMount() {
    this.props.getPosts();
  };

  render() {
    if (this.props.feed.posts.length === 0) return null;

    return (
      <PostsContainer>
        {this.props.feed.posts.map(function(post) {
          return (
            <Post
              key={post.id}
              {...post}
            />
          );
        })}
      </PostsContainer>
    );
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    ...bindActionCreators(FeedActions, dispatch)
  };
};

const mapStateToProps = function(state) {
  return {
    feed: state.feed
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(feed);
