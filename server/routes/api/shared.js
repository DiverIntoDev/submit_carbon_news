const express = require("express");
const router = express.Router();

const Post = require("../../../models/post");

router.post("/:id/shared", async (req, res) => {
  const sentBy = await countEmail(req.body.email);
  await addPointToShared(req.params.id);
  console.log("shared");
  const posts = new Post({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    font: req.body.font,
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const save = await posts.save();
    res.status(200).json(sentBy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;