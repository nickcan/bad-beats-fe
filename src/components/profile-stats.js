import React from "react";
import styled from "styled-components";

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

  color: ${(props) => props.theme.charlestonGreen};
  font-size: 24px;
  text-align: center;

  cursor: pointer;
  transition: border-bottom, .5s;

  div {
    color: ${(props) => props.theme.davysGray};
    font-size: 16px;
    opacity: 0.7;
  }

  &:last-child {
    border-right: 0;
  }
`;

const ProfileStats = ({
  ...props
}) => (
  <TabsContainer>
    <TabListContainer>
      <StyledTab
        isActive={props.activeTab === "posts"}
        onClick={() => props.activateTab("posts")}
      >
        {props.postCount}
        <div>
          Posts
        </div>
      </StyledTab>
      <StyledTab
        isActive={props.activeTab === "followers"}
        onClick={() => props.activateTab("followers")}
      >
        {props.followerCount}
        <div>
          Followers
        </div>
      </StyledTab>
      <StyledTab
        isActive={props.activeTab === "following"}
        onClick={() => props.activateTab("following")}
      >
        {props.followingCount}
        <div>
          Following
        </div>
      </StyledTab>
    </TabListContainer>
  </TabsContainer>
);

export default ProfileStats;
