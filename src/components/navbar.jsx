import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom';
import { getLoggedInUser } from "../features/authActions";

function Navbar() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  useEffect(() => {
    dispatch(getLoggedInUser())
    console.log("user checked")
  }, []);

  return (
    <div className="fixed left-0 right-0 top-0 h-16 shadow-md border-b-2 border-gray-100 bg-gray-900 z-10 opacity-95">
      <nav className="flex items-center container mx-auto h-full justify-between">
        <h1 className="font-semibold uppercase text-lg text-gray-200">
          🔄 Demo App
        </h1>
        <div>
          <ul className="flex items-center space-x-10 text-sm">
            <li><Link to="/" className="text-gray-400 hover:text-gray-100">Home</Link></li>
            <li><Link to="/about" className="text-gray-400 hover:text-gray-100">About Us</Link></li>
            <li><Link to="/docs" className="text-gray-400 hover:text-gray-100">Docs</Link></li>
          </ul>
        </div>
        <div>
          {!user ? <a className="text-white" href="/login">login</a> : <a className="text-white" href="/login">logout</a>}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;