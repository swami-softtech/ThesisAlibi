import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    author: {
      type: String,
      required: true,
    },
    authorRole: {
      type: String,
      required: true,
    },
    image: {
      type: String, // image filename or path
    },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
