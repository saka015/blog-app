
import Navbar from './components/common/navbar/Navbar'
import { CreatePost } from './components/pages/create/CreatePost';
import { Home } from './components/pages/home/Home';
import Login from './components/pages/login/Login';
import {SinglePost}  from "./components/pages/singlepost/SinglePost";
import Register from './components/pages/register/Register';
import { UserContextProvider } from './context/UserContext';
import Layout from "./layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { EditPost } from './components/pages/edit-post/EditPost';

export default function App() {
  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path={"/"} element={<Layout />}>
            <Route index element={<Home />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/register"} element={<Register />} />
            <Route path={"/create"} element={<CreatePost />} />
            <Route path="/post/:id" element={<SinglePost />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="*" element={<h1>404</h1>} />
          </Route>
        </Routes>
      </Router>
    </UserContextProvider>
  );
}
