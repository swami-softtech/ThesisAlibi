import mongoose from "mongoose";

const AboutSectionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        isMission: {
            type: String,
            required: true,
        },
        isVision: {
            type: String,
            required: true,
        },
        ethics: {
            type: String,
            required: true,
        },
        excellence: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("AboutSection", AboutSectionSchema);
