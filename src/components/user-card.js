import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";

import FollowButton from "./follow-button";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 48%;

  margin-bottom: 20px;
  min-height: 200px;

  background-color: ${(props) => props.theme.white};
  border: 1px solid ${(props) => props.theme.platinum};
  border-radius: 2px;

  @media (max-width: 650px) {
    width: 100%;
  }
`;

const InnerBackground = styled.div`
  position: relative;

  margin-bottom: 40px;
  height: 120px;
  width: 100%;

  background-color: ${(props) => props.theme.charlestonGreen};
`;

const ProfileImage = styled(Link)`
  position: absolute;
  left: 15px;
  bottom: -20px;

  height: 80px;
  width: 80px;

  background-color: ${(props) => props.theme.platinum};
  border-radius: 4px;
`;

const AbsoluteFollowButton = styled.div`
  position: absolute;
  bottom: 5px;
  right: 35px;
`;

const Name = styled(Link)`
  color: ${(props) => props.theme.blue};
  font-size: 20px;
  text-align: center;
  text-decoration: none;
`;

const StatContainer = styled.div`
  display: flex;

  margin-top: 20px;
  width: 100%;
`;

const Stat = styled.div`
  align-items: center;
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  justify-content: center;

  height: 50px;

  color: ${(props) => props.theme.charlestonGreen};
  font-size: 20px;

  div {
    color: ${(props) => props.theme.davysGray};
    font-size: 12px;
  }
`;

const StatSection = ({
  ...props
}) => (
  <StatContainer>
    <Stat>
      {props.postCount}
      <div>Posts</div>
    </Stat>
    <Stat>
      {props.followerCount}
      <div>Followers</div>
    </Stat>
    <Stat>
      {props.followingCount}
      <div>Following</div>
    </Stat>
  </StatContainer>
);

class UserCard extends React.Component {
  render() {
    return (
      <CardContainer>
        <InnerBackground>
          <AbsoluteFollowButton>
            <FollowButton
              isNotFollowable={this.props.activeUserId === this.props.id}
              isFollowing={this.props.isActiveUserFollowing}
              small
              handleClick={() => this.props.followUserInList(this.props.id, this.props.isActiveUserFollowing)}
            />
          </AbsoluteFollowButton>
          <ProfileImage to={`/users/${this.props.id}`} />
        </InnerBackground>
        <Name to={`/users/${this.props.id}`}>{this.props.name}</Name>
        <StatSection {...this.props} />
      </CardContainer>
    );
  }
}

export default UserCard;
