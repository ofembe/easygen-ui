import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const { isAuthenticated, signout } = useAuth();

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/">Home</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {!isAuthenticated && (
            <>
              <li className="mr-1">
                <Link to="/signin">Signin</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
          {isAuthenticated && (
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={signout}
            >
              Signout
            </button>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
