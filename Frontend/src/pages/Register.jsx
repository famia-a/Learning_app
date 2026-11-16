import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import AuthLayout from "../components/AuthLayout";
import { registerUser, clearAuthMessages } from "../redux/authSlice";

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error } = useSelector((state) => state.auth);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [validationError, setValidationError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        setValidationError("");
        dispatch(clearAuthMessages());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setValidationError("Passwords do not match.");
            return;
        }

        if (formData.password.length < 8) {
            setValidationError("Password must contain at least 8 characters.");
            return;
        }

        const { confirmPassword, ...registerData } = formData;

        try {
            await dispatch(registerUser(registerData)).unwrap();

            // Registration successful: go to login.
            navigate("/login", {
                state: { registered: true }
            });

        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    const inputClass =
        "w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition";

    return (
        <AuthLayout
            title="Create your account"
            subtitle="Start turning your videos into knowledge."
        >
            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full name
                    </label>

                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your full name"
                            required
                            autoComplete="name"
                            className={inputClass}
                        />
                    </div>
                </div>

                {/* Username */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Username
                    </label>

                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Choose a username"
                            required
                            autoComplete="username"
                            className={inputClass}
                        />
                    </div>
                </div>

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
                            className={inputClass}
                        />
                    </div>
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                    </label>

                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="At least 8 characters"
                            required
                            minLength={8}
                            autoComplete="new-password"
                            className="w-full pl-11 pr-12 py-3 rounded-xl border border-gray-200 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500"
                            aria-label="Toggle password visibility"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm password
                    </label>

                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Re-enter your password"
                            required
                            autoComplete="new-password"
                            className="w-full pl-11 pr-12 py-3 rounded-xl border border-gray-200 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition"
                        />

                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500"
                            aria-label="Toggle confirm password visibility"
                        >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {/* Errors */}
                {(validationError || error) && (
                    <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
                        {validationError || error}
                    </div>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-pink-500 hover:bg-pink-600 disabled:opacity-60 text-white font-semibold py-3 rounded-xl shadow-md shadow-pink-100 transition"
                >
                    {loading ? "Creating account..." : "Create account"}
                </button>

                <p className="text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link to="/login" className="text-pink-500 font-semibold hover:text-pink-600">
                        Login
                    </Link>
                </p>

            </form>
        </AuthLayout>
    );
}

export default Register;
