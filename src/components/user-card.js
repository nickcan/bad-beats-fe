import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";

import FollowButton from "./follow-button";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  float: left;

  margin-bottom: 10px;
  min-height: 200px;
  width: 49.65%;

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

const Name = styled(Link)`
  color: ${(props) => props.theme.blue};
  font-size: 22px;
  text-align: center;
  text-decoration: none;
`;

const StatSection = styled.div`
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

  font-size: 14px;
`;

const AbsoluteFollowButton = styled.div`
  position: absolute;
  bottom: 5px;
  right: 35px;
`;

class UserCard extends React.Component {
  render() {
    return (
      <CardContainer>
        <InnerBackground>
          <AbsoluteFollowButton>
            <FollowButton
              isFollowable={this.props.activeUserId === this.props.id}
              isFollowing={this.props.isActiveUserFollowing}
              small
              handleClick={() => this.props.followUserInList(this.props.id, this.props.isActiveUserFollowing)}
            />
          </AbsoluteFollowButton>
          <ProfileImage to={`/users/${this.props.id}`} />
        </InnerBackground>
        <Name to={`/users/${this.props.id}`}>{this.props.name}</Name>
        <StatSection>
          <Stat>
            {this.props.postCount}
            <div>Posts</div>
          </Stat>
          <Stat>
            {this.props.followerCount}
            <div>Followers</div>
          </Stat>
          <Stat>
            {this.props.followingCount}
            <div>Following</div>
          </Stat>
        </StatSection>
      </CardContainer>
    );
  }
}

export default UserCard;
