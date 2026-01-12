import mongoose from "mongoose";

const pageSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["TERMS", "PRIVACY", "SHIPPING", "REFUND", "COOKIE"],
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String, // HTML or Markdown
      required: true,
    },
  },
  { timestamps: true }
);

// Ensure unique index
pageSchema.index({ type: 1 }, { unique: true });

export default mongoose.model("Page", pageSchema);
