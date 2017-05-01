import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import React from "react";
import styled from "styled-components";

import * as CommentsActions from "../actions/comments-actions";
import * as FeedActions from "../actions/feed-actions";

import Post from "../components/post";

const PostsContainer = styled.div`
  width: 100%;
`;

class feed extends React.Component {
  constructor(props) {
    super(props);
    props.getPosts({sport: this.props.sport});
  }

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
              activeUser={this.props.activeUser}
              key={postId}
              {...this.props.feed.posts[postId]}
              createComment={this.props.createComment}
              deleteComment={this.props.deleteComment}
              voteComment={this.props.voteComment}
              votePost={this.props.votePost}
            />
          );
        })}
      </PostsContainer>
    );
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    ...bindActionCreators(CommentsActions, dispatch),
    ...bindActionCreators(FeedActions, dispatch)
  };
};

const mapStateToProps = function(state) {
  return {
    feed: state.feed,
    activeUser: state.activeUser
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(feed);
