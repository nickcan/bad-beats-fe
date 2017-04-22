const initialState = {
  posts: {}
};

const createPostsObject = function(postsArray = [], postsObject = {}, currentIndex = 0) {
  if (postsArray.length - 1 <= currentIndex) {
    return postsObject;
  } else {
    const nextPost = postsArray[currentIndex];
    const appendedObject = {
      ...postsObject,
      [nextPost.id]: nextPost
    };

    return createPostsObject(postsArray, appendedObject, currentIndex + 1);
  }
};

const feed = function(state = initialState, action) {
  switch(action.type) {
    case "INITIALIZE_POSTS": {
      return {
        ...state,
        posts: createPostsObject(action.payload)
      };
    }

    default: {
      return state;
    }
  }
}

export default feed;

