import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import React from "react";
import styled from "styled-components";

import * as UserProfileActions from "../actions/user-profile-actions";

import FollowButton from "../components/follow-button";
import Feed from "./feed";
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
  position: absolute;
  bottom: -35px;

  border-radius: 100%;

  height: 165px;
  width: 165px;
  background-color: ${(props) => props.theme.platinum};
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
    padding: 0 10px;
    width: 100%;
  }
`;

const Name = styled.div`
  height: 40px;
  margin-bottom: 10px;

  color: ${(props) => props.theme.charlestonGreen};
  font-family: ${(props) => props.theme.mainFont};
  font-size: 32px;
  text-align: center;
`;

const ShortBio = styled.div`
  height: 40px;
  margin-bottom: 5px;

  color: ${(props) => props.theme.davysGray};
  font-size: 20px;
  text-align: center;
`;

const TabsContainer = styled.div`
  width: 100%;
  margin-top: 40px;
`;

const TabListContainer = styled.div`
  display: flex;

  margin-bottom: 10px;
  width: 100%;

  background-color: white;
  border-radius: 2px;
`;

const StyledTab = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 1 0;

  height: 70px;

  border: 1px solid ${(props) => props.theme.platinum};
  border-left: 0;
  border-bottom: 1px solid ${(props) => props.isActive ? props.theme.safetyOrange : props.theme.platinum};
  box-shadow: ${(props) => props.isActive ? `inset 0 -1px 0 ${props.theme.safetyOrange}` : "initial"};

  color: ${(props) => props.theme.davysGray};

  font-size: 16px;
  text-align: center;

  cursor: pointer;
  transition: border-bottom, .5s;

  div {
    color: ${(props) => props.theme.charlestonGreen};
    font-size: 24px;
  }

  &:last-child {
    border-right: 0;
  }
`;

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    props.initialize(props.match.params.id);

    this.state = {
      activeTab: "posts"
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.id !== nextProps.match.params.id) {
      this.props.initialize(nextProps.match.params.id);
      this.setState({activeTab: "posts"})
      window.scrollTo(0, 0);
    }
  }

  componentWillUnmount() {
    this.props.resetUserProfile();
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
            handleClick={() => this.props.followUser(this.props.id, this.props.isActiveUserFollowing)}
          />
          <TabsContainer>
            <TabListContainer>
              <StyledTab
                isActive={this.state.activeTab === "posts"}
                onClick={() => this.setState({activeTab: "posts"})}
              >
                <div>
                  {this.props.postCount}
                </div>
                Posts
              </StyledTab>
              <StyledTab
                isActive={this.state.activeTab === "followers"}
                onClick={() => this.setState({activeTab: "followers"})}
              >
                <div>
                  {this.props.followerCount}
                </div>
                Followers
              </StyledTab>
              <StyledTab
                isActive={this.state.activeTab === "following"}
                onClick={() => this.setState({activeTab: "following"})}
              >
                <div>
                  {this.props.followingCount}
                </div>
                Following
              </StyledTab>
            </TabListContainer>
          </TabsContainer>
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
