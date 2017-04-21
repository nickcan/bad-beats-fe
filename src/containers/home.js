// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
import React from "react";
import styled from "styled-components";

import Posts from "./feed";

const FeedContainer = styled.div`
  display: flex;
  margin: 42px auto;
  height: 400px;
  width: 650px;

  @media (max-width: 650px) {
    width: 94%;
  }
`;

class Home extends React.Component {
  render() {
    return (
      <FeedContainer>
        <Posts />
      </FeedContainer>
    )
  }
};

// const mapDispatchToProps = function(dispatch) {
//   return {
//     ...bindActionCreators(ActiveUserActions, dispatch)
//   };
// };

// const mapStateToProps = function(state) {
//   return {
//     activeUser: state.activeUser
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Home);

export default Home;

