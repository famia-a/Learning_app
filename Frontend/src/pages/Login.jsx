
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

import AuthLayout from "../components/AuthLayout";
import { loginUser, clearAuthMessages } from "../redux/authSlice";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error } = useSelector((state) => state.auth);

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        dispatch(clearAuthMessages());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await dispatch(loginUser(formData)).unwrap();
            navigate("/dashboard");
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <AuthLayout
            title="Welcome back!"
            subtitle="Log in to continue your learning journey."
        >
            <form onSubmit={handleSubmit} className="space-y-5">

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email address
                    </label>

                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                            autoComplete="email"
                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition"
                        />
                    </div>
                </div>

                {/* Password */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium text-gray-700">
                            Password
                        </label>

                        <button
                            type="button"
                            className="text-xs text-pink-500 hover:text-pink-600"
                            onClick={() => alert("Forgot password feature will be added later.")}
                        >
                            Forgot password?
                        </button>
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                            autoComplete="current-password"
                            className="w-full pl-11 pr-12 py-3 rounded-xl border border-gray-200 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
                        {error}
                    </div>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-pink-500 hover:bg-pink-600 disabled:opacity-60 text-white font-semibold py-3 rounded-xl shadow-md shadow-pink-100 transition"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p className="text-center text-sm text-gray-500">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-pink-500 font-semibold hover:text-pink-600">
                        Create account
                    </Link>
                </p>

            </form>
        </AuthLayout>
    );
}

export default Login;
