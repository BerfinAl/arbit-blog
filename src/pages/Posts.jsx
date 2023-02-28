import { Link } from "react-router-dom";

export default function Posts({ posts }) {
  const postElements =
    posts &&
    posts.map((post) => {
      return (
        <div key={post.id}>
          <Link to={`${post.id}`}>
            <div
              className="card w-72 bg-zinc-50 rounded-sm shadow-xl hover:scale-110 transition-all"
              key={post.id}
            >
              <div className="card-body">
                <h3 className="card-title text-gray-800 font-bold">
                  {`${post.title
                    .substring(0, 1)
                    .toUpperCase()}${post.title.substring(1)}`}
                </h3>
                <p>
                  {post && post.body.length > 150
                    ? `${post.body.substring(0, 100)}...`
                    : post.body}
                </p>
              </div>
            </div>
          </Link>
        </div>
      );
    });

  return (
    <div className="mt-8 ">
      <Link to="/posts/new">
        <button className="bg-blue-600 hover:bg-blue-800 text-white font-semibold lg:text-xl py-2 px-4 rounded-lg absolute top-32 right-10 transition-all">
          + New Post
        </button>
      </Link>
      <div className=" bg-white flex flex-wrap justify-center py-20 gap-7">
        {postElements}
      </div>
    </div>
  );
}
