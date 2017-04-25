import { Link } from "react-router-dom";
import moment from "moment";
import React from "react";
import styled from "styled-components";

const CommentsContainer = styled.div`
  background-color: ${(props) => props.theme.lightGray};
  padding: 10px 15px;
`;

const Comment = styled.div`
  font-family: Helvetica, sans-serif;
  padding-bottom: 8px;
`;

const UsernameLink = styled(Link)`
  color: ${(props) => props.theme.charcoal};
  cursor: pointer;
  font-weight: bold;
  text-decoration: none;
  margin-right: 6px;
`;

const CommentMessage = styled.div`
  color: ${(props) => props.theme.charcoal};
  font-size: 14px;
  line-height: 20px;
`;

const CommentDate = styled.div`
  color: ${(props) => props.theme.charcoal};
  margin-top: 3px;
  font-size: 10px;
  font-weight: 100;
`;

const CommentInput = styled.input`
  box-sizing: border-box;
  border: 1px solid ${(props) => props.theme.mediumGray};
  font-size: 14px;
  outline: none;
  padding: 5px 10px;
  width: 100%;

  &::placeholder {
    color: ${(props) => props.theme.mediumGray};
  }
`;

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

  render() {
    const formattedCommentDate = moment(this.props.createdAt).format("MMMM Do, h:mm a");

    return (
      <CommentsContainer>
        {this.props.comments.map((comment) => {
          return (
            <Comment key={comment.id}>
              <CommentMessage>
                <UsernameLink to={`/users/${comment.user.id}`}>{comment.user.name}</UsernameLink>
                {comment.message}
              </CommentMessage>
              <CommentDate>{formattedCommentDate}</CommentDate>
            </Comment>
          );
        })}
        <CommentInput
          placeholder="Write comment..."
          value={this.state.newComment}
          onChange={(event) => this.setState({newComment: event.target.value})}
          onKeyPress={(event) => this.updateComment(event)}
        />
      </CommentsContainer>
    );
  }
}

export default Comments;
