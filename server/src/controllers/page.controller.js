import Page from "../model/page.model.js";

// CREATE or UPDATE (UPSERT)
export const createOrUpdatePage = async (req, res) => {
  try {
    const { type, title, content } = req.body;

    if (!type || !title || !content) {
      return res.status(400).json({
        success: false,
        message: "type, title and content are required",
      });
    }

    const page = await Page.findOneAndUpdate(
      { type: type.toUpperCase() },
      { title, content },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Page saved successfully",
      data: page,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// READ (Get by Type)
export const getPageByType = async (req, res) => {
  try {
    const page = await Page.findOne({
      type: req.params.type.toUpperCase(),
    });

    if (!page) {
      return res.status(404).json({
        success: false,
        message: "Page not found",
      });
    }

    res.status(200).json({
      success: true,
      data: page,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// READ ALL
export const getAllPages = async (req, res) => {
  try {
    const pages = await Page.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: pages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// DELETE
export const deletePage = async (req, res) => {
  try {
    const page = await Page.findOneAndDelete({
      type: req.params.type.toUpperCase(),
    });

    if (!page) {
      return res.status(404).json({
        success: false,
        message: "Page not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Page deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
