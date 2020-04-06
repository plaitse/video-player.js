const express = require("express");
const router = express.Router();
const History = require("../models/History");

/**
 * 1. Improve status code
 * 2. Improve error catch
 * 3. Improve error messages for user
 * 4. Install TypeScript above
 *
 * ==> See old Node.js project on GitHub
 * ==> See Node.js doc
 */

// GET all histories
router.get("/", async (req, res) => {
  try {
    const history = await History.find();
    res.status(200).json(history);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

// GET a specific history
router.get("/:historyId", async (req, res) => {
  try {
    const history = await History.findById(req.params.historyId);
    res.status(200).json(history);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

// POST a history
router.post("/", async (req, res) => {
  try {
    const history = new History({
      videoUrl: req.body.videoUrl,
    });
    const savedHistory = await history.save();
    res.status(200).json(savedHistory);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// DELETE a history
router.delete("/:historyId", async (req, res) => {
  try {
    const removedHistory = await History.deleteOne({
      _id: req.params.historyId,
    });
    res.status(200).json(removedHistory);
  } catch (error) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
