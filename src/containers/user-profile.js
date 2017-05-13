import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import React from "react";
import styled from "styled-components";

import * as UserProfileActions from "../actions/user-profile-actions";

const Canopy = styled.div`
  display: flex;
  justify-content: center;

  position: relative;

  height: 240px;
  width: 100%;
  margin: 0 auto;

  background-color: #2A3A29;
`;

const ProfileImage = styled.div`
  position: absolute;
  bottom: -35px;

  border-radius: 100%;

  height: 165px;
  width: 165px;
  background-color: gray;
`;

const InfoContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;

  margin: 60px auto;
  width: 650px;
`;

const Name = styled.div`
  margin-bottom: 20px;

  font-family: Helvetica, sans-serif;
  font-size: 32px;
  text-align: center;
`;

const ShortBio = styled.div`
  color: gray;
  font-size: 20px;
  text-align: center;
  margin-bottom: 25px;
`;

const FollowButton = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;

  height: 50px;
  width: 215px;

  background-color: gray;
  border-radius: 40px;

  color: white;
  font-size: 20px;

  cursor: pointer;
`;

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    props.initialize(props.match.params.id);
  }

  render() {
    return (
      <div>
        <Canopy>
          <ProfileImage />
        </Canopy>
        <InfoContainer>
          <Name>{this.props.name}</Name>
          <ShortBio>{this.props.shortBio}</ShortBio>
          <FollowButton onClick={() => this.props.followUser(this.props.id, this.props.isActiveUserFollowing)}>
            {this.props.isActiveUserFollowing ? "Following" : "Follow"}
          </FollowButton>
        </InfoContainer>
      </div>
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
