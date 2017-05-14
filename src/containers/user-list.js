import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import React from "react";
import styled from "styled-components";

import * as UserListActions from "../actions/user-list-actions";

import FollowButton from "../components/follow-button";

const ListContainer = styled.div`
  min-height: 400px;
  width: 100%;
`;

const UserCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  float: left;

  margin-bottom: 10px;
  min-height: 200px;
  padding-top: 40px;
  width: 49.65%;

  background-color: white;
  border: 1px solid ${(props) => props.theme.mediumGray};
  border-radius: 2px;

  @media (max-width: 650px) {
    width: 100%;
  }
`;

const ProfileImage = styled.div`
  height: 120px;
  width: 120px;

  margin-bottom: 20px;
  background-color: gray;
  border-radius: 100%;
`;

const Name = styled.div`
  margin-bottom: 20px;

  font-size: 22px;
  text-align: center;
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
`;

class ListOfUsers extends React.Component {
  constructor(props) {
    super(props);

    if (props.userId) {
      this.props.initialize(this.props.userId);
    }
  }

  render() {
    const usersAsArray = Object.keys(this.props.users);
    if (usersAsArray.length === 0) return null;

    return (
      <ListContainer>
        {usersAsArray.map((userId) => {
          const user = this.props.users[userId];
          return (
            <UserCard key={user.id}>
              <ProfileImage />
              <Name>{user.name}</Name>
              <FollowButton
                isFollowable={this.props.activeUserId === user.id}
                isFollowing={user.isActiveUserFollowing}
                small
                handleClick={() => this.props.followUserInList(userId, user.isActiveUserFollowing)}
              />
              <StatSection>
                <Stat>
                  {user.postCount}
                  <div>Posts</div>
                </Stat>
                <Stat>
                  {user.followerCount}
                  <div>Followers</div>
                </Stat>
                <Stat>
                  {user.followingCount}
                  <div>Following</div>
                </Stat>
              </StatSection>
            </UserCard>
          );
        })}
      </ListContainer>
    );
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    ...bindActionCreators(UserListActions, dispatch)
  }
}

const mapStateToProps = function(state) {
  return {
    users: state.userList.users
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListOfUsers);
