const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const router = express.Router();
const Clipboard = require('../models/clipboard');
const decrypt = require('../middleware/decrypt');
router.use(cors());
router.use(express.json());

router.post('/', async (req, res) => {
    const {id } = req.body;
    if ( !id) {
        return res.status(400).json({ message: 'Invalid request' });
    }
    const doesExist = await Clipboard.exists({id: id });
    if(doesExist){
        const clipboard = await Clipboard.findOne({ id: id });
        const decrypted = decrypt(clipboard.text);
        res.json({text:decrypted}).status(200);
    }
    
});

module.exports = router;