const express = require('express');
const cors = require('cors');
const router = express.Router();
const crypto = require('crypto');
router.use(cors(
    {
        origin: "*",
    }
));
router.use(express.json());
router.get('/', (req, res) => {
    const id = crypto.randomBytes(16).toString('hex');
    
    res.json({ id }).status(200);
    
});

module.exports = router;