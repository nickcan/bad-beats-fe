import React from "react";
import styled from "styled-components";

const StyledButton = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;

  height: ${(props) => props.small ? "25px" : "50px"};
  width: ${(props) => props.small ? "125px" : "215px"};

  background-color: ${(props) => props.isFollowing ? "gray" : "white"};
  border: 2px solid gray;
  border-radius: 40px;

  transition: background-color, border, color, .1s;

  color: ${(props) => props.isFollowing ? "white" : "gray"};
  font-size: ${(props) => props.small ? "14px" : "20px"};;

  cursor: pointer;
`;

class FollowButton extends React.Component {
  render() {
    if (this.props.isNotFollowable) return null;

    return (
      <StyledButton
        isFollowing={this.props.isFollowing}
        small={this.props.small}
        onClick={this.props.handleClick}
      >
        {this.props.isFollowing ? "Following" : "Follow"}
      </StyledButton>
    );
  }
}

export default FollowButton;
