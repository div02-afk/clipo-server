const express = require("express");
const cors = require("cors");
const router = express.Router();
const Clipboard = require("../models/clipboard");
const encrypt = require("../middleware/encrypt");
router.use(cors(
  {
    origin: "*",
  }
));
router.use(express.json());
router.post("/", async (req, res) => {
  console.log(req.body);
  const { text, id } = req.body;
  if (!text || !id) {
    return res.status(400).json({ message: "Invalid request" });
  }
  
  const encrypted = encrypt(text);
  const doesExist = await Clipboard.exists({ id: id });
  if (doesExist) {
    const clipboard = await Clipboard.findOne({ id: id });
    clipboard.text = encrypted;
    await clipboard.save();
  } else {
    const clipboard = await Clipboard.create({ id, text: encrypted });
    await clipboard.save();
  }
  res.json({ message: "Event copied" }).status(200);
});

module.exports = router;
