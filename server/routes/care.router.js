const express = require('express');
const pool = require('../modules/pool');
const { route } = require('./user.router');
const router = express.Router();

// GET all pet care items for selected pet by pet id
router.get('/:petId', (req, res) => {
    console.log('in /care:petid GET route', req.params.petId);
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    if(req.isAuthenticated()) {
        const careItemQueryText =   `SELECT * FROM "care_item"
                                    WHERE "pet_id" = $1
                                    ORDER BY "id";`
        pool.query(careItemQueryText, [req.params.petId])
            .then(result => {
                res.send(result.rows);
            })
            .catch(error => {
                console.log(error);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;