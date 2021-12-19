const express = require('express');
const router = express.Router();
const {ensureAuthenicated, forwardAuthenticated} = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => {
    res.render('welcome')
});

// Dashboard
router.get('/dashboard', ensureAuthenicated, (req, res) => {
    res.render('dashboard', {
        name: req.user.name
    })
});

module.exports = router;