import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Layout from "./components/Layout";
import Posts from "./pages/Posts";
import AddPost from "./pages/AddPost";
import EditPost from "./pages/EditPost";
import ShowPost from "./pages/ShowPost";
import Error from "./pages/Error";

import "./index.css";

function App() {
  const posts = useSelector((state) => state.posts);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/posts" />} />
        <Route element={<Layout />}>
          <Route index path="/posts" element={<Posts posts={posts} />} />
          <Route path="/posts/new" element={<AddPost />} />
          <Route path="/posts/:id" element={<ShowPost />}/>
          <Route path="/posts/:id/edit" element={<EditPost posts={posts} />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
