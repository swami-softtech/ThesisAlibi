import { ArrowRight, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import Button from "../../components/Button";
import OtpInput from "../../components/OtpInput";
import { resendOtp, verifyOtp } from "../../services/authApi"; // Assuming you have resendOtp

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
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
    
    if (otp.length !== 6) {
      toast.error("Please enter a 6-digit OTP");
      return;
    }

    setIsLoading(true);
    
    try {
      await verifyOtp({ email: state?.email, otp });
      toast.success("OTP verified successfully!");
      navigate("/create-password", { state });
    } catch (err) {
      console.error("OTP verification failed", err);
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          "Invalid OTP. Please try again.";
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
    if (e.key === 'Enter' && otp.length === 6 && !isLoading) {
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
            src="https://images.unsplash.com/photo-1556740749-887f6717d7e4"
            alt="OTP verification"
            className="h-full w-full object-cover "
          />
        </div>

        {/* RIGHT: OTP Form */}
        <div className="p-6 md:p-10">

          {/* Logo */}
          <Link to="/" className="flex justify-center mb-6">
            <img src={Logo} alt="logo" className="w-28 h-auto bg-primary rounded-full p-1" />
          </Link>

          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">
              Verify OTP
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Enter the 6-digit code sent to your email
            </p>
          </div>

          {/* Email Info */}
          {state?.email && (
            <div className="mb-6 p-3 bg-amber-50 rounded-lg border border-amber-100">
              <p className="text-sm text-gray-700 text-center">
                Code sent to{" "}
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

              <div
                className="flex justify-center mt-4"
                onKeyPress={handleKeyPress}
              >
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  isDisabled={isLoading}
                />
              </div>

              <p className="text-xs text-gray-500 text-center mt-2">
                Enter the code you received in your email
              </p>
            </div>

            {/* Resend OTP */}
            <div className="text-center">
              <button
                type="button"
                onClick={handleResendOtp}
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

            {/* Submit */}
            <Button
              type="submit"
              disabled={otp.length !== 6 || isLoading}
              className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700"
            >
              {isLoading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  Verifying...
                </>
              ) : (
                <>
                  Verify OTP
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </Button>
          </form>

          {/* Footer Links */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Need to change email?{" "}
            <Link
              to="/register"
              className="text-amber-600 font-medium hover:underline"
            >
              Go back
            </Link>
          </p>

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

export default VerifyOtp;