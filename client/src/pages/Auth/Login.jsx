// pages/login.jsx
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import Button from "../../components/Button";
import Input from "../../components/Input";

// Import or define loginUser function
import { loginUser } from "../../services/authApi"; // Adjust path as needed

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form default behavior
    
    // Basic validation
    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    
    try {
      const res = await loginUser({ email, password });
      
      // Check if response has expected structure
      if (res && res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      console.error("Login failed", err);
      // Extract error message properly
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          "Login failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSubmit(e);
    }
  };

 return (
  <div className="min-h-screen flex items-center justify-center bg-primary/80 px-4 py-12">
    <div className="w-full max-w-4xl">

      {/* Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-xl shadow-lg overflow-hidden">

        {/* LEFT: Image */}
        <div className="hidden md:flex items-center justify-center bg-slate-100">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            alt="Login"
            className="h-full w-full object-cover"
          />
        </div>

        {/* RIGHT: Form */}
        <div className="p-6 md:p-10">

          {/* Logo */}
          <Link to="/" className="flex justify-center mb-6">
            <img src={Logo} alt="logo" className="w-28 h-auto bg-primary rounded-full p-1" />
          </Link>

          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">
              Welcome Back
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Sign in to your account to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>

              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-sm text-amber-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700"
            >
              {isLoading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </Button>
          </form>

          {/* Register */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-amber-600 font-medium hover:underline"
            >
              Register now
            </Link>
          </p>

          {/* Back home */}
          <p className="text-center text-xs text-gray-500 mt-6">
            <Link to="/" className="hover:underline">
              ← Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  </div>
);

};

export default Login;