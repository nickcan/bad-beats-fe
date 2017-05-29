import { bindActionCreators } from "redux";
import { connect } from "react-redux";
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

    this.state = {
      isLoading: false,
      page: 0,
      bodyElement: document.get
    };

    props.getPosts({
      sport: props.sport,
      userId: props.userId
    });

    window.onscroll = async (ev) => {
      if ((window.innerHeight + window.pageYOffset) >= document.body.scrollHeight - 500) {
        if (!this.state.isLoading) {
          const nextPage = this.state.page + 1;

          this.setState({
            isLoading: true
          });

          await props.getPosts({
            page: nextPage,
            sport: props.sport,
            userId: props.userId
          });

          this.setState({
            isLoading: false,
            page: nextPage
          });
        }
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.sport !== nextProps.sport || this.props.userId !== nextProps.userId) {
      this.props.getPosts({
        sport: nextProps.sport,
        userId: nextProps.userId
      });
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
