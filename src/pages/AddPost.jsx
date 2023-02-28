import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import { handleAdd } from "../redux/index.mjs";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  return (
    <div className="bg-white h-[36rem] md:w-full mt-8 p-5">
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
              <path
                fill-rule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
          </label>
          <h2 className="font-bold text-2xl text-gray-800">Posts</h2>
        </div>
      </Link>

      <form
        onSubmit={(e) => {
          dispatch(handleAdd(e, title, body));
          navigate("/posts");
        }}
        className=" w-96 h-96 gap-3 rounded-m form-control m-10"
      >
        <label>
          <span className="label-text font-bold text-gray-800 text-lg">Title</span>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="input input-bordered w-96 rounded-sm font-semibold text-gray-700  bg-slate-50"
            required
          />
        </label>
        <label>
          <span className="label-text font-bold text-gray-800 text-lg">Detail</span>

          <textarea
            value={body}
            className="textarea textarea-bordered w-96 rounded-sm h-24 bg-slate-50 font-semibold text-gray-700"
            onChange={(event) => setBody(event.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-800 text-white font-semibold text-xl py-2 px-10 self-end border-b-4 border-blue-800 hover:border-blue-900 rounded transition-all"
        >
          Add Post
        </button>
      </form>
    </div>
  );
}
