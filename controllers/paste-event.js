const express = require("express");
const cors = require("cors");
const router = express.Router();
const Clipboard = require("../models/clipboard");
const decrypt = require("../middleware/decrypt");
const redis = require("../middleware/redis");

router.use(
  cors({
    origin: "*",
  })
);
router.use(express.json());

router.post("/", async (req, res) => {
//   console.log("paste-event: ", req.body);
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Invalid request" });
  }
  await redis.get(id, async (error, text) => {
    if (error) {
      return res.status(400).json({ message: "Invalid request" });
    }
    if (text != null) {
      const decrypted = decrypt(text);
      res.json({ text: decrypted,redis:"hit" }).status(200);
      return;
    }
  });
  const doesExist = await Clipboard.exists({ id: id });
  if (doesExist) {
    const clipboard = await Clipboard.findOne({ id: id });
    redis.set(id, clipboard.text);
    const decrypted = decrypt(clipboard.text);
    res.json({ text: decrypted,redis:"miss" }).status(200);
  } else {
    res.json({ message: "No event found" }).status(404);
  }
});

module.exports = router;
