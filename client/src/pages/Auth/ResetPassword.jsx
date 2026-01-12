import { ArrowRight, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import Button from "../../components/Button";
import Input from "../../components/Input";
import OtpInput from "../../components/OtpInput";
import { resendOtp, resetPassword } from "../../services/authApi"; // Assuming you have resendResetOtp

const ResetPassword = () => {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timer, setTimer] = useState(60); // 60 seconds cooldown
  const { state } = useLocation();
  const navigate = useNavigate();

  // Timer effect for resend OTP
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (otp.length !== 6) {
      toast.error("Please enter a 6-digit OTP");
      return;
    }
    
    if (!password || !confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);
    
    try {
      await resetPassword({
        email: state?.email,
        otp,
        password,
        confirmPassword
      });
      toast.success("Password reset successfully!");
      navigate("/login");
    } catch (err) {
      console.error("Reset password failed", err);
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          "Failed to reset password. Please try again.";
      toast.error(errorMessage);
      setOtp(""); // Clear OTP on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (timer > 0 || isResending) return;
    
    setIsResending(true);
    
    try {
      await resendOtp({ email: state?.email });
      toast.success("New OTP sent to your email!");
      setTimer(60); // Reset cooldown timer
    } catch (err) {
      console.error("Failed to resend OTP", err);
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          "Failed to resend OTP. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isDisabled && !isLoading) {
      handleSubmit(e);
    }
  };

  const isDisabled = 
    otp.length !== 6 ||
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
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c"
            alt="Reset password"
            className="h-full w-full object-cover bg-primary rounded-full p-1"
          />
        </div>

        {/* RIGHT: Form */}
        <div className="p-6 md:p-10">

          {/* Logo */}
          <Link to="/" className="flex justify-center mb-6">
            <img src={Logo} alt="logo" className="w-28 h-auto" />
          </Link>

          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">
              Reset Password
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Enter OTP and set a new password
            </p>
          </div>

          {/* Email Info */}
          {state?.email && (
            <div className="mb-6 p-3 bg-amber-50 rounded-lg border border-amber-100">
              <p className="text-sm text-gray-700 text-center">
                Reset password for{" "}
                <span className="font-medium text-amber-700">
                  {state.email}
                </span>
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* OTP Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 text-center">
                6-digit verification code
              </label>

              <div className="flex justify-center mt-4">
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  isDisabled={isLoading}
                />
              </div>

              {/* Resend OTP */}
              <div className="text-center mt-2">
                 <button
                  onClick={handleResendOtp}
                  type="button"
                  disabled={timer > 0 || isResending}
                  className={`text-sm font-medium ${
                    timer > 0 || isResending
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-amber-600 hover:text-amber-700 hover:underline"
                  }`}
                >
                  {isResending ? (
                    <span className="flex items-center justify-center gap-2">
                      <RefreshCw className="h-3 w-3 animate-spin" />
                      Sending...
                    </span>
                  ) : timer > 0 ? (
                    `Resend OTP in ${timer}s`
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <RefreshCw className="h-3 w-3" />
                      Resend OTP
                    </span> 
                  )}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>

              <Input
                id="password"
                type="password"
                placeholder="Enter new password"
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
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Match Indicator */}
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

            {/* Strength Indicator */}
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
                  Resetting Password...
                </>
              ) : (
                <>
                  Reset Password
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

export default ResetPassword;