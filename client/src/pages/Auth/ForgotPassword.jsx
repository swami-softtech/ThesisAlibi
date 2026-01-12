import { ArrowRight, Mail } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { forgotPassword } from "../../services/authApi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email.trim()) {
      toast.error("Please enter your email address");
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
      await forgotPassword({ email });
      toast.success("Password reset OTP sent successfully!");
      navigate("/reset-password", { state: { email } });
    } catch (err) {
      console.error("Forgot password failed", err);
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          "Failed to send reset OTP. Please try again.";
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
            src="https://images.unsplash.com/photo-1556742031-c6961e8560b0"
            alt="Forgot password"
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
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-4">
              <Mail className="h-8 w-8 text-amber-600" />
            </div>

            <h1 className="text-2xl font-semibold text-gray-900">
              Forgot Password?
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Enter your email to reset your password
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
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />

              <p className="text-xs text-gray-500">
                We'll send a 6-digit OTP to this email
              </p>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={!email || isLoading}
              className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700"
            >
              {isLoading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  Sending OTP...
                </>
              ) : (
                <>
                  Send Reset OTP
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </Button>
          </form>

          {/* Back to login */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Remember your password?{" "}
            <Link
              to="/login"
              className="text-amber-600 font-medium hover:underline"
            >
              Sign in instead
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

export default ForgotPassword;