import { Outlet } from "react-router-dom"
import  Navbar  from "./components/common/navbar/Navbar"

const layout = () => {
  return (
    <main>
      <Navbar />
      <div className="px-4 sm:px-56">
        <Outlet />
      </div>
    </main>
  );
}

export default layout
