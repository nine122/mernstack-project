import { useContext, useState } from "react";
import axios from "../helpers/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function SignInForm() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [error, setError] = useState(null);
  let navigate = useNavigate();
  let { dispatch } = useContext(AuthContext);

  let login = async (e) => {
    try {
      e.preventDefault();
      setError(null);
      let data = {
        email,
        password,
      };
      let response = await axios.post("/api/users/login", data, {
        withCredentials: true,
      });
      if (response.status === 200) {
        dispatch({ type: "LOGIN", payload: response.data.user });
        navigate("/");
      }
    } catch (e) {
      setError(e.response.data.error);
    }
  };

  return (
    <div className="flex  flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST" onSubmit={login}>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
                type="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 pl-4"
              />
              {!!error && (
                <p className="text-sm font-small text-red-500">{error}</p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-blue-600 hover:text-blue-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                type="password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 pl-4"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Sign In
            </button>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            if you are new here?
            <a
              href="sign-up"
              className="font-semibold leading-6 text-blue-600 hover:text-blue-500 ml-2"
            >
              register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
