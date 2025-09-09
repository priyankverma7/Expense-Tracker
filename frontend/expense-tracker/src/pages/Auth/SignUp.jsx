import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ProfilePhotoSelector from "../components/ProfilePhotoSelector"; // adjust path if needed
import Input from "../components/Input"; // adjust path if needed
import axios from "axios";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("password", password);
      if (profilePic) formData.append("profilePic", profilePic);

      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Account created successfully!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Signup failed. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Expense Tracker
        </h1>
        <h2 className="text-lg font-semibold text-center mb-6">
          Create an Account
        </h2>

        {/* Form */}
        <form onSubmit={handleSignUp} className="space-y-4">
          {/* Profile Image */}
          <div className="flex justify-center mb-4">
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          </div>

          {/* Inputs */}
          <div className="flex flex-col gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="John Doe"
              type="text"
            />

            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="john@example.com"
              type="email"
            />

            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="Min 8 Characters"
              type="password"
            />
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition"
          >
            SIGN UP
          </button>

          {/* Redirect */}
          <p className="text-sm text-center text-gray-600 mt-3">
            Already have an account?{" "}
            <Link className="font-medium text-purple-600 underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
