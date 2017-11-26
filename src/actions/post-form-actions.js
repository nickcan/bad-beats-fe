import { createAction } from "redux-actions";

import { createPost } from "../api-fetchers/post-fetcher";

export const updatePostForm = createAction("UPDATE_POST_FORM");
export const resetPostForm = createAction("RESET_POST_FORM");

const addNewPost = createAction("ADD_NEW_POST");
const updatePostFormImage = createAction("UPDATE_POST_FORM_IMAGE");

const buildForm = function(data) {
  let formData = new FormData();
  if (data.text) formData.append("text", data.text);
  if (data.sport) formData.append("sport", data.sport);
  if (Object.keys(data.image).length > 0) formData.append("image", data.image);

  return formData;
}

const isDataValid = function(data) {
  if (!data.sport) {
    alert("You must select a sport");
    return false;
  }

  if (!data.text && Object.keys(data.image).length === 0) {
    alert("You must fill out the text section, add an image, or both.");
    return false;
  }

  return true;
}

export const sendPostFormData = function() {
  return async function(dispatch, getState) {
    const postFormState = getState().postForm;
    if (!isDataValid(postFormState)) return;
    const formData = buildForm(postFormState);
    const response = await createPost(formData);
    dispatch(addNewPost(response));
  }
}

export const uploadImage = function(acceptedFiles, rejectedFiles) {
  return function(dispatch) {
    const file = acceptedFiles[0];
    dispatch(updatePostFormImage(file));
  }
}
