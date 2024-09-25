const express = require('express');
const router = express.Router();

//Create a user using : POST "/api/auth". Doesnt require Auth
router.get('/', (req, res) => {
    res.json([])
})

module.exports = router
