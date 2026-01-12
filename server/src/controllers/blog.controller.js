import Blog from "../model/blog.model.js";
import fs from "fs";
import path from "path";

/* CREATE BLOG */
export const createBlog = async (req, res) => {
  try {
    const blog = new Blog({
      ...req.body,
      image: req.file ? req.file.filename : null,
    });

    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error("BLOG ERROR", error)
  }
};

/* READ ALL BLOGS */
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* READ SINGLE BLOG */
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog)
      return res.status(404).json({ message: "Blog not found" });

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* UPDATE BLOG */


/* UPDATE BLOG WITH IMAGE DELETE */
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // If new image uploaded → delete old image
    if (req.file && blog.image) {
      const oldImagePath = path.join("uploads", blog.image);

      fs.access(oldImagePath, fs.constants.F_OK, (err) => {
        if (!err) {
          fs.unlink(oldImagePath, (unlinkErr) => {
            if (unlinkErr) console.error("Image delete error:", unlinkErr);
          });
        }
      });
    }

    // Update fields
    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;
    blog.category = req.body.category || blog.category;
    blog.author = req.body.author || blog.author;
    blog.authorRole = req.body.authorRole || blog.authorRole;

    if (req.file) {
      blog.image = req.file.filename;
    }

    const updatedBlog = await blog.save();

    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* DELETE BLOG */
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog)
      return res.status(404).json({ message: "Blog not found" });

    // delete image file
    if (blog.image) {
      const imagePath = path.join("uploads", blog.image);

      fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (!err) {
          fs.unlink(imagePath, (unlinkErr) => {
            if (unlinkErr) console.error(unlinkErr);
          });
        }
      });
    }

    await blog.deleteOne();

    res.json({ message: "Blog and image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

