import React from "react";
import styled from "styled-components";

const SharedStyles = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;

  background-color: ${(props) => props.isFollowing ? props.theme.safetyOrange : props.theme.white};

  color: ${(props) => props.isFollowing ? props.theme.white : props.theme.safetyOrange};
  font-size: 18px;

  cursor: pointer;
`;

const BigButton = styled(SharedStyles)`
  height: 50px;
  width: 215px;

  border: 2px solid ${(props) => props.theme.safetyOrange};
  border-radius: 40px;
`;

const SmallButton = styled(SharedStyles)`
  height: 35px;
  width: 35px;

  border: 1px solid ${(props) => props.isFollowing ? props.theme.white : props.theme.safetyOrange};
  border-radius: 100%;

  font-size: 20px;

  transition: background-color, color, .4s;
`;

const Checkmark = styled.div`
  display:inline-block;

  &:after{
    content: '';
    display: block;

    height: 12px;
    width: 6px;

    border: solid ${(props) => props.theme.white};
    border-width: 0 2px 2px 0;

    transform: rotate(45deg);
  }
`;

class FollowButton extends React.Component {
  render() {
    if (this.props.isNotFollowable) return null;

    if (this.props.small) {
      return (
        <SmallButton
          isFollowing={this.props.isFollowing}
          small={this.props.small}
          onClick={this.props.handleClick}
        >
          {this.props.isFollowing ? <Checkmark /> : "+"}
        </SmallButton>
      );
    } else {
      return (
        <BigButton
          isFollowing={this.props.isFollowing}
          small={this.props.small}
          onClick={this.props.handleClick}
        >
          {this.props.isFollowing ? "Following" : "Follow"}
        </BigButton>
      );
    }
  }
}

export default FollowButton;
