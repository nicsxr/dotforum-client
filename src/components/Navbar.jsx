import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useNavigate} from 'react-router-dom';
import { getLoggedInUser } from "../features/authActions";
import { logout } from "../services/auth.service";

function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  useEffect(() => {
    dispatch(getLoggedInUser())
    console.log("user checked")
  }, []);

  async function SignOut(){
    await logout().then(() => {
      navigate(0)
    }).catch((err) =>{console.log(err)})
  }

  return (
    <div className="fixed left-0 right-0 top-0 h-16 shadow-md border-b-2 border-gray-100 bg-gray-900 z-10 opacity-95">
      <nav className="flex items-center container mx-auto h-full justify-between">
        <h1 className="font-semibold text-lg text-gray-200">
          <a href="/">🌐 DotForum</a>
        </h1>
        <div>
          <ul className="flex items-center space-x-10 text-sm">
            <li><Link to="/" className="text-gray-400 hover:text-gray-100">Home</Link></li>
            {user ? <li><Link to="/createcommunity" className="text-gray-400 hover:text-gray-100">Create Community</Link></li> : ""}
            <li><Link to="/about" className="text-gray-400 hover:text-gray-100">About Us</Link></li>
          </ul>
        </div>
        <div>
          {!user ? 
          <div className="">
            <a className="text-white mr-5" href="/login">Login</a>
            <a className="text-white" href="/register">Register</a>
          </div>
          : <button onClick={SignOut} className="text-white bg-none">Logout</button>}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
