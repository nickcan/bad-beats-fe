import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import React from "react";
import styled from "styled-components";

import * as UserProfileActions from "../actions/user-profile-actions";

const UserProfileContainer = styled.div`
  display: flex;
  margin: 42px auto;
  height: 400px;
  width: 650px;

  @media (max-width: 650px) {
    margin: 18px auto;
    width: 94%;
  }
`;

const ProfileInfo = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;

  width: 100%;
`;

const AvatarContainer = styled.div`
  width: 125px;
`;

const Avatar = styled.div`
  width: 100%;
  height: 125px;

  background-color: ${(props) => props.theme.white};
  border-bottom: 2px solid ${(props) => props.theme.mediumGray};
  border-radius: 4px 4px 0 0;
`;

const FollowButton = styled.div`
  padding: 5px 0;
  width: 100%;

  background-color: ${(props) => props.theme.charcoal};

  color: white;
  text-align: center;

  cursor: pointer;
`;

const Name = styled.div`
  margin-top: 15px;

  font-size: 24px;
`;

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    props.initialize(props.match.params.id);
  }

  render() {
    return (
      <UserProfileContainer>
        <ProfileInfo>
          <AvatarContainer>
            <Avatar />
            <FollowButton>{this.props.activeUserIsFollowing ? "Following" : "Follow"}</FollowButton>
          </AvatarContainer>
          <Name>{this.props.name}</Name>
        </ProfileInfo>
      </UserProfileContainer>
    );
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    ...bindActionCreators(UserProfileActions, dispatch)
  }
}

const mapStateToProps = function(state) {
  return {
    activeUser: state.activeUser,
    ...state.userProfile
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
