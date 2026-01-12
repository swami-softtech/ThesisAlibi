import User from "../model/user.model.js";
import { sendProfileCreatedEmail } from "../utils/sendOtp.js";

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
            { email },
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
            { new: true, runValidators: true }
        );

        // ✅ Send profile created email
        await sendProfileCreatedEmail(email, firstName);

        res.status(201).json({
            message: "Profile created successfully",
            profile: updatedUser
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getProfile = async (req, res) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOne({ email }).select("-password -otp -resetToken");

        if (!user) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.status(200).json({ profile: user });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const updateProfile = async (req, res) => {
    try {
        const { email, ...updates } = req.body;

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
            { email },
            updates,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            message: "Profile updated successfully",
            profile: updatedUser
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const deleteProfile = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOneAndDelete({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "Profile deleted successfully"
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getProfileById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const user = await User.findById(id)
            .select("-password -otp -otpExpires -resetToken -resetTokenExpires");

        if (!user) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.status(200).json({
            message: "Profile fetched successfully",
            profile: user
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password -otp -resetToken");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
