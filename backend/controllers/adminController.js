
import { addScheme,getAllSchemes,updateScheme,deleteScheme,getSchemeById } from "../models/adminModel.js";

export const addSchemeController = async (req, res) => {
  try {
    const result = await addScheme(req.body);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to add scheme" });
  }
};


// Controller to get all schemes for admin dashboard
export const getAllSchemesController = async (req, res) => {
  try {
    const schemes = await getAllSchemes();
    res.status(200).json({
      success: true,
      count: schemes.length,
      data: schemes,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch schemes" });
  }
};

//controller to get Specific scheme by id for admin dashboard
export const getSchemeByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const scheme = await getSchemeById(id);
    if (!scheme) {
      return res.status(404).json({ message: "Scheme not found" });
    }
    res.status(200).json({
      success: true,
      count: scheme.length,
      data: scheme,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch scheme" });
  } 
};

// Controller to update a scheme
export const updateSchemeController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateScheme(id, req.body);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update scheme" });
  }
};

// delete scheme controller 
export const deleteSchemeController = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await deleteScheme(id);
        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to delete scheme" });
    } 
};