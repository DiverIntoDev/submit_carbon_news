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

async function addPointToShared(id) {
  const addTo = await PointsTable.findById(id);
  try {
    addTo.points += 1;
    const save = await addTo.save();
  } catch (error) {
    console.log(error);
  }
}

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

router.post("/", async (req, res) => {
  const sentBy = await countEmail(req.body.email);
  console.log("newSubmit" + " " + req.body.sharedBy);
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
