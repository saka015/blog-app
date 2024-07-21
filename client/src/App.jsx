
import Navbar from './components/common/navbar/Navbar'
import Login from './components/pages/login/Login';
import Register from './components/pages/register/Register';
import SinglePost from "./components/posts/singlePost/singlePost";
import Layout from "./layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={"/"} element={<Layout />}>
            <Route
              index
              element={
                <div>
                  <SinglePost />
                  <SinglePost />
                  <SinglePost />
                  <SinglePost />
                  <SinglePost />
                </div>
              }
            />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/register"} element={<Register />} />
            <Route path="*" element={<h1>404</h1>} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
