import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import toast from "react-hot-toast";

export default function SignUp() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profileImage: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage") {
      const file = files[0];
      setFormData({ ...formData, profileImage: file });
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("profileImage", formData.profileImage);

      const res = await axios.post("http://localhost:8001/api/signup", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 201) {
        setStep(2);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Signup failed")
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`http://localhost:8001/api/verify-otp`, {
        email: formData.email,
        otp,
      });

      if (res.status === 200) {
        const user = res.data; // ✅ Assuming backend sends { name, email, token, ... }
        localStorage.setItem("user", JSON.stringify(user));
        toast.success(user.message)
        dispatch({ type: "LOGIN", payload: user });
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);

      if (err.response?.status === 409) {
        toast.error("This email is already registered. Please log in instead.");
      } else {
        toast.error(err.response?.data?.message || "Signup failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white flex items-center justify-center px-6 py-8">
      <div className="max-w-md w-full space-y-6">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          {step === 1 ? "Create your Storio account" : "Verify Your Email"}
        </h2>

        {step === 1 ? (
          <form onSubmit={handleSignup} className="space-y-4">
            {/* Profile Image */}
            <div className="flex flex-col items-center gap-3">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-20 w-20 rounded-full object-cover border"
                />
              ) : (
                <div className="h-20 w-20 rounded-full bg-gray-100 border flex items-center justify-center text-sm text-gray-500">
                  No Image
                </div>
              )}
              <input
                type="file"
                name="profileImage"
                accept="image/*"
                onChange={handleChange}
                className="text-sm"
              />
            </div>

            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full px-4 py-3 border rounded-md"
              value={formData.name}
              onChange={handleChange}
              required
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 border rounded-md"
              value={formData.email}
              onChange={handleChange}
              required
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-3 border rounded-md"
              value={formData.password}
              onChange={handleChange}
              required
            />

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-orange-400 text-white py-3 rounded-md font-semibold"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <p className="text-center text-sm text-gray-600">
              We’ve sent a 6-digit code to <strong>{formData.email}</strong>
            </p>

            <input
              type="text"
              placeholder="Enter OTP"
              maxLength="6"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 border rounded-md text-center tracking-widest text-lg"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 rounded-md font-semibold hover:bg-purple-700 transition"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <p className="text-sm text-center text-gray-600">
              Didn’t get the code?{" "}
              <button className="text-orange-500 font-medium hover:underline">
                Resend
              </button>
            </p>
          </form>
        )}

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-500 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
