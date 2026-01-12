import Faq from "../model/faq.model.js"; 

// CREATE FAQ
export const createFaq = async (req, res) => {
  try {
    const faq = await Faq.create(req.body);
    res.status(201).json({
      success: true,
      data: faq
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// READ ALL FAQs
export const getAllFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find();
    res.status(200).json({
      success: true,
      count: faqs.length,
      data: faqs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// READ SINGLE FAQ
export const getFaqById = async (req, res) => {
  try {
    const faq = await Faq.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found"
      });
    }
    res.status(200).json({
      success: true,
      data: faq
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// UPDATE FAQ
export const updateFaq = async (req, res) => {
  try {
    const faq = await Faq.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found"
      });
    }

    res.status(200).json({
      success: true,
      data: faq
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// DELETE FAQ
export const deleteFaq = async (req, res) => {
  try {
    const faq = await Faq.findByIdAndDelete(req.params.id);
    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found"
      });
    }
    res.status(200).json({
      success: true,
      message: "FAQ deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
