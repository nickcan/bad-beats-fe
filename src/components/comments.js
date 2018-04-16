import { Link } from "react-router-dom";
import moment from "moment";
import React from "react";
import styled from "styled-components";

const CommentsContainer = styled.div`
  background-color: ${(props) => props.theme.whiteSmoke};
  padding: 10px 15px 5px;
`;

const Comment = styled.div`
  padding-bottom: 8px;
`;

const UsernameLink = styled(Link)`
  color: ${(props) => props.theme.davysGray};
  cursor: pointer;
  font-weight: bold;
  text-decoration: none;
  margin-right: 6px;

  transition: color, .3s;

  &:hover {
    color: ${(props) => props.theme.blue};
  }
`;

const CommentMessage = styled.div`
  color: ${(props) => props.theme.davysGray};
  font-size: 14px;
  line-height: 20px;
`;

const CommentDate = styled.div`
  color: ${(props) => props.theme.ashGray}
`;

const CommentInput = styled.input`
  border: 1px solid ${(props) => props.theme.gainsboro};
  font-size: 14px;
  outline: none;
  padding: 8px 10px;
  margin-bottom: 8px;
  width: 100%;

  &::placeholder {
    color: ${(props) => props.theme.gainsboro};
  }
`;

const CommentBottomBar = styled.div`
  display: flex;
  color: ${(props) => props.theme.davysGray};
  font-size: 12px;
  font-weight: 100;
  margin-top: 3px;
`;

const SimpleButton = styled.div`
  cursor: pointer;
  margin-left: 3px;
  color: ${(props) => props.isHightlighted ? props.theme.blue : "inherit"};

  &:hover {
    color: ${(props) => props.theme.blue};
    transition: color, .3s;
  }
`;

const LoadMoreButton = styled.div`
  border-top: 1px solid ${(props) => props.theme.gainsboro};
  margin-bottom: 2px;
  padding: 5px 0;
  color: ${(props) => props.theme.blue};
  font-size: 14px;
  font-weight: 100;

  cursor: pointer;
`;

class DeleteButton extends React.Component {
  render() {
    if (this.props.activeUser && this.props.commentUserId !== this.props.activeUser.id) return null;

    return <SimpleButton onClick={this.props.handleClick}>- Delete</SimpleButton>;
  }
};

const LoadComments = function({
  ...props
}) {
  if (!props.canLoadMoreComments) return null;

  return <LoadMoreButton
    onClick={() => props.getComments({
      postId: props.id,
      offset: props.comments.length === 5 ? 0 : props.comments.length + 1
    })}
  >Load more comments</LoadMoreButton>
}

class Comments extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newComment: ""
    }
  }

  updateComment(event) {
    if (event.key === "Enter") {
      const trimmedComment = this.state.newComment.trim();
      if (trimmedComment.length > 0) {
        this.props.createComment({
          message: trimmedComment,
          postId: this.props.id
        });
        this.setState({newComment: ""});
      }
    }
  }

  canLoadMoreComments() {
    return this.props.commentCount > this.props.comments.length;
  }

  render() {
    const formattedCommentDate = moment(this.props.createdAt).format("MMMM Do, h:mm a");

    return (
      <CommentsContainer>
        {this.props.comments.map((comment) => {
          return (
            <Comment key={comment.id}>
              <CommentMessage>
                <UsernameLink to={`/users/${comment.userId}`}>{comment.user.name}</UsernameLink>
                {comment.message}
              </CommentMessage>
              <CommentBottomBar>
                <CommentDate>{formattedCommentDate}</CommentDate>
                <DeleteButton
                  activeUser={this.props.activeUser}
                  commentUserId={comment.userId}
                  handleClick={() => this.props.deleteComment(comment.id)}
                >- Delete</DeleteButton>
                <SimpleButton
                  isHightlighted={comment.currentUserHasVoted}
                  onClick={() => this.props.voteComment(comment.id, comment.currentUserHasVoted)
                }>- Like {comment.voteCount > 0 ? ` ${comment.voteCount}` : ""}</SimpleButton>
              </CommentBottomBar>
            </Comment>
          );
        })}
        <LoadComments
          {...this.props}
          canLoadMoreComments={this.canLoadMoreComments()}
        >Load more comments</LoadComments>
        <CommentInput
          placeholder="Write comment..."
          type="text"
          value={this.state.newComment}
          onChange={(event) => this.setState({newComment: event.target.value})}
          onKeyPress={(event) => this.updateComment(event)}
        />
      </CommentsContainer>
    );
  }
}

export default Comments;
