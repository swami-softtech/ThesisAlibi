import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String },
        lastName: { type: String },

        email: { type: String, required: true, unique: true },
        password: { type: String },

        collegeName: { type: String },
        universityName: { type: String },

        dateOfAdmission: { type: Date },
        synopsisSubmissionDate: { type: Date },

        whatsappNumber: { type: String },
        alternateNumber: { type: String },

        isVerified: { type: Boolean, default: false },
        otp: { type: String },
        otpExpires: { type: Date },
        resetToken: { type: String },
        resetTokenExpires: { type: Date }
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);
