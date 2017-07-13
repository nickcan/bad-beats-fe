import { createAction } from "redux-actions";

import { createPost } from "../api-fetchers/post-fetcher";

export const togglePostFormView = createAction("TOGGLE_POST_FORM_VIEW");
export const updatePostForm = createAction("UPDATE_POST_FORM");

const addNewPost = createAction("ADD_NEW_POST");
const updatePostFormImage = createAction("UPDATE_POST_FORM_IMAGE");

const buildForm = function(data) {
  let formData = new FormData();
  formData.append("text", data.text);
  formData.append("sport", data.sport);
  formData.append("image", data.image);

  return formData;
}

export const sendPostFormData = function() {
  return async function(dispatch, getState) {
    const postFormState = getState().postForm;
    const formData = buildForm(postFormState);
    const response = await createPost(formData);
    dispatch(addNewPost(response));
    dispatch(togglePostFormView());
  }
}

export const uploadImage = function(acceptedFiles, rejectedFiles) {
  return function(dispatch) {
    const file = acceptedFiles[0];
    dispatch(updatePostFormImage(file));
  }
}
