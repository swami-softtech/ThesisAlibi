import AboutSection from "../model/about.model.js";

// CREATE
export const createAboutSection = async (req, res) => {
    try {
        const aboutSection = await AboutSection.create(req.body);
        res.status(201).json({
            success: true,
            data: aboutSection,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// READ ALL
export const getAllAboutSections = async (req, res) => {
    try {
        const sections = await AboutSection.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: sections,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// READ ONE
export const getAboutSectionById = async (req, res) => {
    try {
        const section = await AboutSection.findById(req.params.id);

        if (!section) {
            return res.status(404).json({
                success: false,
                message: "About section not found",
            });
        }

        res.status(200).json({
            success: true,
            data: section,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// UPDATE
export const updateAboutSection = async (req, res) => {
    try {
        const updatedSection = await AboutSection.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedSection) {
            return res.status(404).json({
                success: false,
                message: "About section not found",
            });
        }

        res.status(200).json({
            success: true,
            data: updatedSection,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// DELETE
export const deleteAboutSection = async (req, res) => {
    try {
        const deletedSection = await AboutSection.findByIdAndDelete(req.params.id);

        if (!deletedSection) {
            return res.status(404).json({
                success: false,
                message: "About section not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "About section deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
