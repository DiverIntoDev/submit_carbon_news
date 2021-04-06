const express = require("express");
const router = express.Router();

const Post = require("../../../models/post");
const PointsTable = require("../../../models/pointTable");

router.get("/", async (req, res) => {
  const posts = await Post.find({});
  try {
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const sentBy = await countEmail(req.body.email);
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

router.post("/shared/:id", async (req, res) => {
  const sentBy = await countEmail(req.body.email);
  const posts = new Post({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    font: req.body.font,
    title: req.body.title,
    description: req.body.description,
  });
  console.log(req.params.id)
  try {
    const save = await posts.save();
    res.status(200).json(sentBy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

router.delete("/", async (req, res) => {
  const posts = await Post.deleteMany({});
  try {
    const remove = await posts.exec();
    res.status(200).json(remove);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function countEmail(email) {
  const sentBy = await PointsTable.find({ email: email });
  if (sentBy.length === 0) {
    const newEmail = new PointsTable({ email });
    const saveEmail = await newEmail.save();
    return newEmail;
  }
  if (sentBy.length > 0) {
    sentBy[0].points += 1;
    const saveEmail = await sentBy[0].save();
    return sentBy[0];
    
  }
}

module.exports = router;
