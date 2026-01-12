import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import { generateOtp } from "../utils/generateOtp.js";
import { sendOtp } from "../utils/sendOtp.js";

/* 1️⃣ Register – Email + OTP */
export const register = async (req, res) => {
    const { email } = req.body;

    let user = await User.findOne({ email });
    if (user && user.isVerified)
        return res.status(400).json({ message: "Email already registered" });

    const otp = generateOtp();

    user = await User.findOneAndUpdate(
        { email },
        { email, otp, otpExpires: Date.now() + 10 * 60 * 1000 },
        { upsert: true, new: true }
    );

    await sendOtp(email, otp);

    res.json({ message: "OTP sent to email" });
};

/* 2️⃣ Verify OTP */
export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    const user = await User.findOne({ email, otp });
    if (!user || user.otpExpires < Date.now())
        return res.status(400).json({ message: "Invalid or expired OTP" });

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.json({ message: "OTP verified" });
};

/* 2️⃣.5 Resend OTP */
export const resendOtp = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user)
        return res.status(400).json({ message: "Email not found" });

    if (user.isVerified)
        return res.status(400).json({ message: "Email already verified" });

    const otp = generateOtp();

    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    await sendOtp(email, otp);

    res.json({ message: "OTP resent to email" });
};

/* 3️⃣ Create Password */
export const createPassword = async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword)
        return res.status(400).json({ message: "Passwords do not match" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findOneAndUpdate(
        { email },
        { password: hashedPassword }
    );

    res.json({ message: "Password created successfully" });
};

/* 4️⃣ Login */
export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !user.password)
        return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
        return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.json({ token });
};

/* 5️⃣ Forgot Password */
export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.json({ message: "Email sent if exists" });

    const resetToken = generateOtp();

    user.resetToken = resetToken;
    user.resetTokenExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    await sendOtp(email, resetToken);

    res.json({ message: "Reset OTP sent" });
};

/* 6️⃣ Reset Password */
export const resetPassword = async (req, res) => {
    const { email, otp, password, confirmPassword } = req.body;

    if (password !== confirmPassword)
        return res.status(400).json({ message: "Passwords do not match" });

    const user = await User.findOne({
        email,
        resetToken: otp,
        resetTokenExpires: { $gt: Date.now() }
    });

    if (!user)
        return res.status(400).json({ message: "Invalid or expired OTP" });

    user.password = await bcrypt.hash(password, 10);
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    res.json({ message: "Password reset successful" });
};


export const createProfile = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            collegeName,
            universityName,
            dateOfAdmission,
            synopsisSubmissionDate,
            whatsappNumber,
            alternateNumber,
            email
        } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user.isVerified) {
            return res.status(403).json({ message: "Email not verified" });
        }

        const updatedUser = await User.findOneAndUpdate(
            { email }, // ✅ FILTER
            {
                firstName,
                lastName,
                collegeName,
                universityName,
                dateOfAdmission,
                synopsisSubmissionDate,
                whatsappNumber,
                alternateNumber
            },
            {
                new: true,
                runValidators: true
            }
        );

        return res.status(200).json({
            message: "Profile saved successfully",
            profile: updatedUser
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
