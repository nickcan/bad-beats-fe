import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import React from "react";
import styled from "styled-components";

import * as CommentsActions from "../actions/comments-actions";
import * as FeedActions from "../actions/feed-actions";

import InfiniteScroller from "../components/infinite-scroller";
import PlaceholderPost from "../components/placeholder-post";
import Post from "../components/post";

// Login and signup have routes
// Don't refetch when opening/closing routes

const PostsContainer = styled.div`
  width: 100%;

  @media (max-width: 650px) {
    width: 96%;
  }
`;

class Feed extends React.Component {
  constructor(props) {
    super(props);

    if ((!props.isLoginModal && Object.keys(props.feed.posts).length === 0) || this.props.userId) {
      props.getPosts({
        sport: props.sport,
        userId: props.userId
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.sport !== nextProps.sport || this.props.userId !== nextProps.userId) {
      this.props.resetFeed();
      window.scrollTo(0, 0);
      this.props.getPosts({
        sport: nextProps.sport,
        userId: nextProps.userId
      });
    }
  }

  componentWillUnmount() {
    if (this.props.userId) {
      this.props.resetFeed();
    }
  }

  async fetchPostsByPage(page) {
    if (!this.props.feed.hasNoMorePosts) {
      await this.props.getPosts({
        page,
        sport: this.props.sport,
        userId: this.props.userId
      });
    }
  }

  render() {
    const postsAsArray = Object.keys(this.props.feed.posts);
    if (postsAsArray.length === 0) return <PlaceholderPost />

    return (
      <InfiniteScroller
        isLastPage={this.props.feed.hasNoMorePosts}
        fetchFunction={(page) => this.fetchPostsByPage(page)}
      >
        <PostsContainer>
          {postsAsArray.map((postId) => {
            return (
              <Post
                activeUser={this.props.activeUser}
                key={postId}
                {...this.props.feed.posts[postId]}
                createComment={this.props.createComment}
                getComments={this.props.getComments}
                deleteComment={this.props.deleteComment}
                voteComment={this.props.voteComment}
                votePost={this.props.votePost}
              />
            );
          })}
        </PostsContainer>
      </InfiniteScroller>
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
)(Feed);
