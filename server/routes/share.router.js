const express = require('express');
const pool = require('../modules/pool');
const { route } = require('./user.router');
const router = express.Router();

// GET for all usernames
router.get('/', (req, res) => {
    console.log('in share GET route for usernames');
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    if(req.isAuthenticated()) {
        const queryText = `SELECT "username" FROM "user";`
        pool.query(queryText)
            .then(result => {
                res.send(result.rows);
            })
            .catch(error => {
                console.log('error getting usernames', error);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;