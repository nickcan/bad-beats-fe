import React from "react";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
  width: 96%;
`;

const PostContainer = styled.div`
  height: 210px;
  margin-bottom: 12px;

  background-color: ${(props) => props.theme.babyPowder};
  border: 1px solid ${(props) => props.theme.gainsboro};
  border-radius: 3px;
  box-shadow: 0 4px 8px -2px ${(props) => props.theme.gainsboro};

  @media (max-width: 650px) {
    margin-bottom: 12px;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
`;

const UserInfoContainer = styled.div`
  display: flex;
`;

const KeyframeAnimation = keyframes`
  0% { background-position: 100% 0; }
  100% { background-position: -100% 0; }
`;

const Animation = styled.div`
  animation-duration: 1.5s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: ${KeyframeAnimation};
  animation-timing-function: linear;
  background: linear-gradient(to right, ${(props) => props.theme.gainsboro} 8%, ${(props) => props.theme.platinum} 18%, ${(props) => props.theme.gainsboro} 33%);
  background-size: 800px 104px;

  @media (max-width: 650px) {
    animation-duration: 3s;
  }
`;

const ProfileImage = styled.div`
  display: flex;
  content: '';
  background-color: ${(props) => props.theme.platinum};
  border-radius: 2px;
  margin-right: 10px;
  width: 50px;
  height: 50px;
`;

const Username = styled(Animation)`
  height: 10px;
  width: 100px;
  margin-bottom: 5px;

  border-radius: 2px;

  animation-duration: 4s;
`;

const PostDate = styled(Animation)`
  height: 10px;
  width: 60px;

  border-radius: 2px;

  animation-duration: 2s;
`;

const MainText = styled(Animation)`
  height: 10px;
  width: ${(props) => props.width || 90}%;
  margin-left: 15px;
  margin-top: 10px;

  border-radius: 2px;
`;

const Post = () => (
  <PostContainer>
    <HeaderContainer>
      <UserInfoContainer>
        <ProfileImage />
        <div>
          <Username />
          <PostDate />
        </div>
      </UserInfoContainer>
    </HeaderContainer>
    <MainText width={87} />
    <MainText width={90} />
    <MainText width={40} />
  </PostContainer>
);

class PlaceholderPost extends React.Component {
  render() {
    return (
      <Container>
        <Post />
        <Post />
        <Post />
      </Container>
    );
  }
}

export default PlaceholderPost;
