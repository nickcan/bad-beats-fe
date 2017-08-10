import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import React from "react";
import styled from "styled-components";

import * as PostFormActions from "../actions/post-form-actions";

import Modal from "../components/modal";
import PostImage from "../components/post/post-image";

import cameraIcon from "../static-assets/camera_icon.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 650px) {
    padding: 20px 5px;
  }
`;

const PostHeadline = styled.div`
  color: ${props => props.theme.charlestonGreen};
  font-size: 26px;
  font-weight: 300;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-self: flex-end;
  justify-content: flex-end;

  margin-top: 10px;
`;

const SubmitButton = styled.button`
  padding: 12px 0;
  width: 130px;

  background-color: ${(props) => props.theme.safetyOrange};
  border: none;
  border-radius: 3px;

  color: ${(props) => props.theme.white};
  font-size: 18px;
  font-weight: 400;

  cursor: pointer;
`;

const CancelButton = styled(SubmitButton)`
  background-color: ${props => props.theme.ashGray};
  width: 90px;

  margin-right: 10px;
`;

const StyledSelect = styled.select`
  border: 1px solid ${props => props.theme.ashGray};
  height: 36px;
  width: 140px;
  margin-top: 10px;

  background-color: ${props => props.theme.white};
  border-radius: 3px;

  color: ${props => props.theme.charlestonGreen};
  outline: none;

  cursor: pointer;
`;

const SelectSport = ({
  ...props
}) => (
  <StyledSelect value={props.sport || ""} onChange={(event) => props.updatePostForm({field: "sport", value: event.target.value})}>
    <option value="" disabled>Select Sport</option>
    <option value="football">Football</option>
    <option value="basketball">Basketball</option>
    <option value="baseball">Baseball</option>
  </StyledSelect>
);

const StyledTextarea = styled.textarea`
  padding: 5px 10px;
  margin: 10px 0;
  min-height: 100px;
  width: 100%;

  border: 1px solid ${props => props.theme.gainsboro};
  border-radius: 3px;
  outline: none;

  resize: vertical;
`;

const AddPhoto = styled(Dropzone)`
  height: 40px;
  width: 40px;

  background: url(${cameraIcon}) no-repeat center center;
  background-size: 100% 100%;

  cursor: pointer;
`;

const PhotoSelection = function({
  ...props
}) {
  if (props.image.preview) {
    return <PostImage image={{url: props.image.preview}} />;
  } else {
    return <AddPhoto onDrop={props.uploadImage} />;
  }
}

class PostForm extends React.Component {
  render() {
    if (!this.props.isPostsFormOpen) return null;

    return (
      <Modal handleClose={() => this.props.togglePostFormView()}>
        <Container>
          <PostHeadline>Create a Bad Beat</PostHeadline>
          <SelectSport {...this.props} />
          <StyledTextarea value={this.props.text} onChange={(event) => this.props.updatePostForm({field: "text", value: event.target.value})} />
          <PhotoSelection {...this.props} />
          <ButtonContainer>
            <CancelButton onClick={() => this.props.togglePostFormView()}>Cancel</CancelButton>
            <SubmitButton onClick={this.props.sendPostFormData}>Save Post</SubmitButton>
          </ButtonContainer>
        </Container>
      </Modal>
    );
  }
}

const mapDispatchToProps = function(dispatch, props) {
  return {
    ...bindActionCreators(PostFormActions, dispatch)
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

