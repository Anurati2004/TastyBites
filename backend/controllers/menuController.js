const MenuItem = require("../models/menuItem");
const cloudinary = require("../config/cloudinary");

const uploadImage = async (fileBuffer) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                folder: "tastybites"
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.secure_url);
                }
            }
        ).end(fileBuffer);
    });
};

const addMenuItem = async (req, res) => {
    try {
        let imageUrl = "";

        if (req.file) {
            imageUrl = await uploadImage(req.file.buffer);
        }

        const item = await MenuItem.create({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            availability: req.body.availability,
            image: imageUrl
        });

        res.status(201).json({
            message: "Menu item added successfully",
            item
        });
    } catch (error) {
    console.log("CLOUDINARY ERROR:", error);

    res.status(500).json({
        message: error.message
    });
}
};

const getMenuItems = async (req, res) => {
    try {
        const { search } = req.query;

        let items;

        if (search) {
            items = await MenuItem.find({
                name: { $regex: search, $options: "i" }
            });
        } else {
            items = await MenuItem.find();
        }

        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getMenuItemById = async (req, res) => {
    try {
        const item = await MenuItem.findById(req.params.id);

        if (!item) {
            return res.status(404).json({
                message: "Menu item not found"
            });
        }

        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateMenuItem = async (req, res) => {
    try {
        const updateData = {
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            availability: req.body.availability
        };

        if (req.file) {
            updateData.image = await uploadImage(req.file.buffer);
        }

        const item = await MenuItem.findByIdAndUpdate(
            req.params.id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        );

        if (!item) {
            return res.status(404).json({
                message: "Menu item not found"
            });
        }

        res.status(200).json({
            message: "Menu item updated successfully",
            item
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const deleteMenuItem = async (req, res) => {
    try {
        const item = await MenuItem.findByIdAndDelete(req.params.id);

        if (!item) {
            return res.status(404).json({
                message: "Menu item not found"
            });
        }

        res.status(200).json({
            message: "Menu item deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    addMenuItem,
    getMenuItems,
    getMenuItemById,
    updateMenuItem,
    deleteMenuItem
};