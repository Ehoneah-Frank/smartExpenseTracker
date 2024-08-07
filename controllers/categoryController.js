import { categoryModel } from "../models/categoryModel.js";
import { categorySchema } from "../schema/categorySchema.js";

// Endpoint to create new category
export const createCategory = async (req, res) => {
  try {
    const { error, value } = categorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    console.log("User ID:", req.user._id);
    console.log("Request Body:", req.body);
    const { name } = req.body;
    const userId = req.user._id;

    if (!name || !userId) {
      console.log(error.message);
      return res.status(400).json({ message: "Name and userId are required" });
    }
    // Check if the category already exists for the user
    const existingCategory = await categoryModel.findOne({ name, userId });
    if (existingCategory) {
      return res.status(409).json({ message: "Category already exists" });
    }

    const category = new categoryModel({
      name,
      userId,
    });

    await category.save();

    res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Failed to create category" });
  }
};
// export const createCategory = async (req, res) =>{
//     try {

//         const category = new categoryModel({
//             userId: req.user.id,
//             name: req.body.name
//         });

//         await category.save();
//         console.log(category);
//         res.status(201).json({message: "Category created successfully"});

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message: "Failed to create category"});
//     }
// };

// Endpoin to get all categories for a user
export const getCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find({
      userId: req.user._id,
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Failed to get categories" });
  }
};

// Endpoint to Update a category
export const updateCategory = async (req, res) => {
  try {
    const category = await categoryModel.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { name: req.body.name },
      { new: true }
    );
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update category" });
  }
};

// Endpoint to delete a category
export const deleteCategory = async (req, res) => {
  try {
    const category = await categoryModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete category" });
  }
};
