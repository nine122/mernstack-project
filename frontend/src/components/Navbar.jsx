import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import axios from "../helpers/axios";

export default function Navbar() {
  let { user, dispatch } = useContext(AuthContext);
  let navigate = useNavigate();

  let logout = async () => {
    let res = await axios.post("/api/users/logout");
    if (res.status === 200) {
      dispatch({ type: "LOGIN" });
      navigate("/sign-in");
    }
  };
  return (
    <nav className="flex justify-between items-center p-5">
      <div>
        <h1 className="font-bold text-2xl text-blue-400">logoooo</h1>
      </div>
      <ul className="flex space-x-10">
        <li>
          <Link to="/" className="hover:text-blue-500">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-blue-500">
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-blue-500">
            Contact
          </Link>
        </li>
        <li>
          <Link to="/recipes/create" className="hover:text-blue-500">
            Create Recipe
          </Link>
        </li>
        {!user && (
          <>
            <li>
              <Link to="/sign-up" className="hover:text-blue-500">
                Register
              </Link>
            </li>
            <li>
              <Link to="/sign-in" className="hover:text-blue-500">
                Sign in
              </Link>
            </li>
          </>
        )}
        {!!user && (
          <li>
            <button onClick={logout} className="hover:text-blue-500">
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
