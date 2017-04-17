// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
import React from "react";
import styled from "styled-components";

const FeedContainer = styled.div`
  display: flex;
  margin: 42px auto;
  height: 400px;
  width: 700px;

  @media (max-width: 700px) {
    width: 100%;
  }
`;

class Home extends React.Component {
  render() {
    return (
      <FeedContainer></FeedContainer>
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

