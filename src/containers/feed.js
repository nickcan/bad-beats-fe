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
    this.props.getPosts({sport: this.props.sport});
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.sport !== nextProps.sport) {
      this.props.getPosts({sport: nextProps.sport});
    }
  }

  render() {
    const postsAsArray = Object.keys(this.props.feed.posts);
    if (postsAsArray.length === 0) return null;

    return (
      <PostsContainer>
        {postsAsArray.map((postId) => {
          return (
            <Post
              key={postId}
              {...this.props.feed.posts[postId]}
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
