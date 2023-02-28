import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  posts: [],
  error: "",
};

function fetchPostsRequest() {
  return {
    type: "FETCH_POSTS_REQUEST",
  };
}

function fetchPostsSuccess(posts) {
  return {
    type: "FETCH_POSTS_SUCCESS",
    payload: posts,
  };
}

function fetchPostsFailure(error) {
  return {
    type: "FETCH_POSTS_FAILURE",
    payload: error,
  };
}

function addPostRequest() {
  return {
    type: "ADD_POST_REQUEST",
  };
}

function addPostSuccess(newPost) {
  return {
    type: "ADD_POST_SUCCESS",
    payload: newPost,
  };
}
function addPostFailure(error) {
  return {
    type: "ADD_POST_FAILURE",
    payload: error,
  };
}

function editPostRequest() {
  return {
    type: "EDIT_POST_REQUEST",
  };
}

function editPostSuccess(editedPost) {
  console.log(editedPost);
  return {
    type: "EDIT_POST_SUCCESS",
    payload: editedPost,
  };
}
function editPostFailure(error) {
  return {
    type: "EDIT_POST_FAILURE",
    payload: error,
  };
}

function deletePostRequest() {
  return {
    type: "DELETE_POST_REQUEST",
  };
}

function deletePostSuccess(postId) {
  return {
    type: "DELETE_POST_SUCCESS",
    payload: postId,
  };
}
function deletePostFailure(error) {
  return {
    type: "DELETE_POST_FAILURE",
    payload: error,
  };
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_POSTS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_POSTS_SUCCESS":
      return {
        loading: false,
        posts: action.payload,
        error: "",
      };
    case "FETCH_POSTS_FAILURE":
      return {
        loading: false,
        posts: [],
        error: action.payload,
      };
    case "ADD_POST_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "ADD_POST_SUCCESS":
      return {
        loading: false,
        posts: [action.payload, ...state.posts],
        error: ""
      };
    case "ADD_POST_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "EDIT_POST_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "EDIT_POST_SUCCESS":
      return {
        loading: false,
        posts: [
          action.payload,
          ...state.posts.filter(
            (post) => Number(action.payload.id) !== post.id
          ),
        ],
        error: ""
      };
    case "EDIT_POST_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "DELETE_POST_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "DELETE_POST_SUCCESS":
      return {
        loading: false,
        posts: [
          ...state.posts.filter((post) => post.id !== Number(action.payload)),
        ],
        error: ""
      };
    case "DELETE_POST_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
  }
}

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: "https://jsonplaceholder.typicode.com/posts",
      },
    }),
});

function fetchPosts() {
  return function (dispatch, getState, api) {
    dispatch(fetchPostsRequest());
    fetch(api)
      .then((res) => res.json())
      .then(
        (data) => dispatch(fetchPostsSuccess(data)),
        (error) => dispatch(fetchPostsFailure(error.message))
      );
  };
}

export function handleAdd(e, title, body) {
  e.preventDefault();
  return function (dispatch, getState, api) {
    dispatch(addPostRequest());
    fetch(api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body, userId: 1 }),
    })
      .then((res) => res.json())
      .then(
        (data) => dispatch(addPostSuccess(data)),
        (error) => dispatch(addPostFailure(error.message))
      );
  };
}

export function handleEdit(e, id, title, body) {
  e.preventDefault();
  return function (dispatch) {
    dispatch(editPostRequest());
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body, id, userId: 1 }),
    })
      .then((res) => res.json())
      .then(
        (data) => dispatch(editPostSuccess(data)),
        (error) => dispatch(editPostFailure(error.message))
      );
  };
}

export function handleDelete(e, id) {
  e.preventDefault();
  return function (dispatch) {
    dispatch(deletePostRequest());
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    }).then(
      () => dispatch(deletePostSuccess(id)),
      (error) => dispatch(deletePostFailure(error.message))
    );
  };
}

store.subscribe(() => console.log(store.getState()));
store.dispatch(fetchPosts());

export default store;
