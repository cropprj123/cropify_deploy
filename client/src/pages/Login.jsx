import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApiLoading from "../components/ApiLoading";
import SnackBar from "../components/SnackBar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [backendError, setBackendError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        };

        const { data } = await axios.post(
          "https://cropify-deploy-server.vercel.app/api/v1/users/login",
          { email, password },
          config
        );

        if (data.status === "success") {
          setShowSuccessAlert(true);
          setTimeout(() => setShowSuccessAlert(false), 2000);
          setTimeout(() => {
            navigate("/");
            window.location.reload();
          }, 2000);
        }
      } catch (error) {
        setLoginError(true);
        setTimeout(() => setLoginError(false), 2000);
        console.error("Error logging in:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: "",
      password: "",
    };

    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <div className="max-w-md mx-auto mt-8 px-4 py-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <div className="text-red-500 text-xs mt-1">{errors.email}</div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <div className="text-red-500 text-xs mt-1">{errors.password}</div>
        </div>
        <div className="m-2 undeline text-blue-400">
          <Link to="/forgetPassword " className="underline">
            Forget Password?
          </Link>
        </div>
        {loading ? (
          <div className="text-center my-4">
            <div className="loader inline-block">
              <ApiLoading />
            </div>
          </div>
        ) : (
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        )}

        {loginError && (
          <SnackBar
            isOpen={true}
            message="Login failed. Please try again."
            type="error"
          />
        )}
        {showSuccessAlert && (
          <SnackBar isOpen={true} message="Login successfull!" type="success" />
        )}
      </form>
      <div className="mt-3 ml-2 ">
        <span>Dont Have an Account ?</span>
        <Link to="/signup" className="ml-5 underline ">
          Signup
        </Link>
      </div>
    </div>
  );
}

export default Login;
