import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header() {
  const posts = useSelector((state) => state.posts);

  const notifications = posts.filter((post) => post.userId === 1).length;
  return (
    <div className="navbar bg-white shadow">
      <Link to="/posts" className="flex-1">
        <div className="flex items-center">
          <img
            className="h-10 w-10"
            src="https://flowbite.com/docs/images/logo.svg"
            alt="Your Company"
          />
          <h1 className=" font-bold text-gray-800 text-2xl md:text-3xl px-2">Arbit Blog</h1>
        </div>
      </Link>
      <ul className="flex gap-0">
        <li className="btn btn-ghost btn-md">
          <Link to="/posts" className="font-semibold text-lg">
            <div className="indicator">
              <span className="badge badge-m indicator-item text-green-700 bg-green-200 font-bold border-none w-6 h-6 rounded-2xl z-0 text-base">
                {notifications}
              </span>
              <div className="z-10 text-gray-500 font-bold normal-case tracking-wider">Posts</div>
            </div>
          </Link>
        </li>
        <li>
          <label className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="gray"
              className="bi bi-bell-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
            </svg>
          </label>
        </li>
        <li>
          <label className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="gray"
              className="bi bi-grid-fill"
              viewBox="0 0 16 16"
            >
              <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z" />
            </svg>
          </label>
        </li>
        <li>
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
            </div>
          </label>
        </li>
      </ul>
    </div>
  );
}
