import { ArrowRight } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { createPassword } from "../../services/authApi";

const CreatePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    // Password strength validation (optional)
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);
    
    try {
      await createPassword({
        email: state?.email,
        password,
        confirmPassword
      });
      toast.success("Password created successfully!");
      navigate("/profile", {
        state: {
          email: state?.email,
        },
      });
    } catch (err) {
      console.error("Create password failed", err);
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          "Failed to create password. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isDisabled && !isLoading) {
      handleSubmit(e);
    }
  };

  const isDisabled = 
    !password || 
    !confirmPassword || 
    password !== confirmPassword || 
    password.length < 8 ||
    isLoading;

 return (
  <div className="min-h-screen flex items-center justify-center bg-primary/80 px-4 py-12">
    <div className="w-full max-w-4xl">

      {/* Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-xl shadow-lg overflow-hidden">

        {/* LEFT: Image */}
        <div className="hidden md:flex items-center justify-center bg-slate-100">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
            alt="Create password"
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
              Create Password
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Set a secure password for your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Password */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>

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

              <p className="text-xs text-gray-500">
                Must be at least 8 characters long
              </p>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>

              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Password Match Indicator */}
            {password && confirmPassword && (
              <div
                className={`text-sm text-center font-medium p-2 rounded-md ${
                  password === confirmPassword
                    ? "text-green-600 bg-green-50"
                    : "text-red-600 bg-red-50"
                }`}
              >
                {password === confirmPassword
                  ? "✓ Passwords match"
                  : "✗ Passwords do not match"}
              </div>
            )}

            {/* Password Strength */}
            {password && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-700">
                  Password strength
                </p>

                <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      password.length >= 12
                        ? "bg-green-500"
                        : password.length >= 8
                        ? "bg-amber-500"
                        : "bg-red-500"
                    }`}
                    style={{
                      width: `${Math.min(
                        (password.length / 12) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>

                <p className="text-xs text-gray-500">
                  {password.length >= 12
                    ? "Strong"
                    : password.length >= 8
                    ? "Good"
                    : "Weak"}
                </p>
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={isDisabled}
              className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700"
            >
              {isLoading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  Creating Password...
                </>
              ) : (
                <>
                  Save Password
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </Button>
          </form>

          {/* Login */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-amber-600 font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>

          {/* Back */}
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

export default CreatePassword;