const express = require("express");
const router = express.Router();

const PointsTable = require("../../../models/pointTable");

router.get("/", async (req, res) => {
  const table = await PointsTable.find({}).sort({ points: 'DESC' });
  try {
    res.status(200).json(table);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// router.delete("/", async (req, res) => {
//   const table = await PointsTable.find({});
//   try {
//     const remove = await table.remove();
//     res.status(200).json(remove);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

module.exports = router;
