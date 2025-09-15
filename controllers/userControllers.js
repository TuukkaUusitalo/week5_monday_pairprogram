const User = require("../models/userModel");
const mongoose = require("mongoose");

// GET /users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve users" });
  }
};

// POST /users
const createUser = async (req, res) => {
  const newUser = await User.create({ ...req.body }); // Spread the req.body object

  if (newUser) {
    res.status(201).json(newUser); // 201 Created
  } else {
    // Handle error (e.g., failed to create tour)
    res.status(400).json({ message: "Invalid user data" });
  }
};
 
// GET /users/:userId
const getUserById = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
  const user = await User.findById(userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve user" });
  }
};

const updateUser = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }

  try {
    const updatedUser = await User.findOneAndReplace(
     { _id: userId },
     { ...req.body },
   );

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update user" });
  }
};

// PUT /users/:userId
//const updateUser = async (req, res) => {
//  const { userId } = req.params;
//
//  if (!mongoose.Types.ObjectId.isValid(userId)) {
//    return res.status(400).json({ message: "Invalid user ID" });
//  }
//
//  try {
//    const updatedUser = await User.findOneAndUpdate(
//      { _id: userId },
//      { ...req.body },
//      { new: true }
//    );
//    if (updatedUser) {
//      res.status(200).json(updatedUser);
//    } else {
//      res.status(404).json({ message: "User not found" });
//    }
//  } catch (error) {
//    res.status(500).json({ message: "Failed to update user" });
//  }
//};

// DELETE /users/:userId
const deleteUser = async (req, res) => {
  const { userId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const deletedUser = await User.findOneAndDelete({ _id: userId });
    if (deletedUser) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
