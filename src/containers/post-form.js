import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";

import PostFormActions from "../actions/post-form-actions";

const Container = styled.div`
  display: flex;
  justify-content: center;

  padding-bottom: 25px;
  width: 100%;

  font-family: ${(props) => props.theme.mainFont};
`;

class PostForm extends React.Component {
  render() {
    return (
      <Container>
        new post
      </Container>
    );
  }
}

const mapDispatchToProps = function(dispatch, props) {
  return {
    ...bindActionCreators(PostFormActions, dispatch),
  };
};

const mapStateToProps = function(state) {
  return {
    ...state.postForm
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm);

