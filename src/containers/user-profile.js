import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import React from "react";
import styled from "styled-components";

import * as UserProfileActions from "../actions/user-profile-actions";

import Feed from "./feed";
import FollowButton from "../components/follow-button";
import ProfileStats from "../components/profile-stats";
import UserList from "./user-list";

const Canopy = styled.div`
  display: flex;
  justify-content: center;

  position: relative;

  height: 240px;
  width: 100%;
  margin: 0 auto;

  background-color: ${(props) => props.theme.charlestonGreen};
`;

const ProfileImage = styled.div`
  position: relative;
  top: 110px;

  height: 165px;
  width: 165px;

  background-color: ${(props) => props.theme.platinum};
  border: 6px solid ${(props) => props.theme.white};
  border-radius: 100%;
`;

const InfoContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;

  margin: 60px auto;
  width: 650px;

  font-family: ${(props) => props.theme.mainFont};

  box-sizing: border-box;

  @media (max-width: 650px) {
    width: 100%;
  }
`;

const Name = styled.div`
  height: 40px;
  margin-bottom: 10px;
  padding: 0 10px;

  color: ${(props) => props.theme.charlestonGreen};
  font-family: ${(props) => props.theme.mainFont};
  font-size: 32px;
  text-align: center;
`;

const ShortBio = styled.div`
  margin-bottom: 20px;
  padding: 0 10px;

  color: ${(props) => props.theme.davysGray};
  font-size: 20px;
  text-align: center;
`;

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.initializeAndScrollToTopOfPage(this.props.match.params.id);

    this.state = {
      activeTab: "posts"
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.initializeAndScrollToTopOfPage(nextProps.match.params.id);
    }
  }

  componentWillUnmount() {
    this.props.resetUserProfile();
  }

  initializeAndScrollToTopOfPage(userId) {
    this.props.initialize(userId);
    this.setState({activeTab: "posts"});
    window.scrollTo(0, 0);
  }

  determineActiveSection() {
    if (this.state.activeTab === "posts") {
      if (this.props.id) {
        return <Feed userId={this.props.id} />
      }
    }
    if (this.state.activeTab === "followers" || this.state.activeTab === "following") {
      if (this.props.id) {
        return <UserList userId={this.props.id} listType={this.state.activeTab} />
      }
    }
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
          <FollowButton
            isFollowing={this.props.isActiveUserFollowing}
            isNotFollowable={this.props.activeUser.id === this.props.id}
            handleClick={() => this.props.followUser(this.props.id, this.props.isActiveUserFollowing)}
          />
          <ProfileStats
            {...this.props}
            {...this.state}
            activateTab={(tabName) => this.setState({activeTab: tabName})}
          />
          {this.determineActiveSection()}
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
