import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { handleDelete } from "../redux/index.mjs";
import NotFound from "./Error.jsx";


export default function PostDetails() {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((err) => console.log(err));
  }, [id]);

  const commentElements =
    comments &&
    comments.map((comment) => {
      return (
        <div className="flex flex-col pb-3">
          <span className="text-right text-xs md:text-sm mt-2 text-gray-500">
            {comment.email}
          </span>
          <dt className="mb-1 text-gray-800 text-base md:text-lg font-bold">
            {comment.name}
          </dt>
          <dd className="text-sm md:text-base font-semibold text-gray-600">
            {comment.body}
          </dd>
        </div>
      );
    });

  function isObjectEmpty(objectName) {
    return (
      objectName &&
      Object.keys(objectName).length === 0 &&
      objectName.constructor === Object
    );
  }

  return (
    <>
      {isObjectEmpty(post) ? (
        <NotFound />
      ) : (
        <div className="bg-white h-fit md:w-full mt-8 p-5">
          <Link to="/posts">
            <div className="flex items-center gap-2">
              <label className="btn btn-circle bg-stone-200 border-none hover:bg-stone-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="gray-800"
                  className="bi bi-arrow-left"
                  viewBox="0 0 16 16"
                >
                  <path d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                </svg>
              </label>
              <h2 className="font-bold text-2xl text-gray-800">Posts</h2>
            </div>
          </Link>

          {!post ? (
            <h2> Loading...</h2>
          ) : (
            <div className="md:grid md:grid-cols-2">
              <div className="container">
                <Link to="/posts/new">
                  <button className="bg-blue-600 hover:bg-blue-800 text-white font-semibold lg:text-xl py-2 px-4 rounded-lg absolute top-32 right-10 transition-all">
                   + New Post
                  </button>
                </Link>
                <div className="post-details relative">
                  <div className="m-5">
                    <div className="my-5">
                      <h6 className="mb-2 text-base font-bold leading-none tracking-tight text-gray-800 md:text-2xl">
                        Title
                      </h6>
                      <div className="text-lg font-bold text-gray-800 p-2 border-2 border-gray-200 rounded-sm bg-gray-50">
                        {`${
                          post && post.title.substring(0, 1).toUpperCase()
                        }${post.title.substring(1)}`}
                      </div>
                    </div>
                    <div>
                      <h6 className="mb-2 text-base font-bold leading-none tracking-tight text-gray-800 md:text-2xl">
                        Detail
                      </h6>
                      <div className="text-lg font-semibold text-gray-500 h-auto p-2 border-2 border-gray-200 rounded-sm bg-gray-50">
                        {post && post.body}
                      </div>
                    </div>
                  </div>

                  <Link to="edit">
                    <button className="bg-blue-600 flex items-center gap-2 hover:bg-blue-800 text-white font-semibold lg:text-lg py-2 px-4 rounded-lg transition-all absolute left-48">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-pencil-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                      </svg>
                      Edit Post
                    </button>
                  </Link>

                  <form
                    onSubmit={(e) => {
                      dispatch(handleDelete(e, id));
                      navigate("/posts");
                    }}
                  >
                    <button
                      type="submit"
                      className="bg-red-500 flex items-center gap-2 hover:bg-red-700 text-white font-semibold lg:text-lg py-2 px-4 rounded-lg transition-all absolute left-4"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-trash-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                      </svg>
                      Delete Post
                    </button>
                  </form>
                </div>
              </div>
              <div className="flex flex-col items-center mt-20 md:mt-0">
                <h2 className="font-bold text-2xl md:text-3xl text-gray-800">
                  Comments
                </h2>
                <dl className="max-w-md  text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                  {commentElements}
                </dl>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
