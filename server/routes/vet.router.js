const express = require('express');
const pool = require('../modules/pool');
const { route } = require('./user.router');
const router = express.Router();

// GET all vet notes for a pet by pet id
router.get('/:petid', (req, res) => {
    console.log('in vet GET /:petid route');
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    if (req.isAuthenticated()) {
        const queryText =   `SELECT * FROM "vet_note"
                            WHERE "pet_id" = $1;`
        pool.query(queryText, [req.params.petid])
            .then(result => {
                res.send(result.rows);
            })
            .catch(error => {
                console.log('error getting vet notes for pet', error);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403); // forbidden
    }
});


module.exports = router;