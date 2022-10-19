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

// POST add care item to database
router.post('/', (req, res) => {
    console.log('in /care POST route');
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    if(req.isAuthenticated()) {
        const careItemQueryText =   `INSERT INTO "care_item" 
                                    ("pet_id", "description", "frequency", "start_date", "details")
                                    VALUES ($1, $2, $3, $4, $5);`
        pool.query(careItemQueryText, [req.body.pet_id, req.body.description, req.body.frequency, req.body.start_date, req.body.details])
            .then(result => {
                res.sendStatus(200);
            })
            .catch(error => {
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403); // forbidden
    }
});

module.exports = router;