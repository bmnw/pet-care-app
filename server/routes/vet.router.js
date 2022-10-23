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
                            WHERE "pet_id" = $1
                            ORDER BY "date" DESC;`
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

// POST to add new vet note for a pet
router.post('/', (req, res) => {
    console.log('in vet POST /:petid route');
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    if (req.isAuthenticated()) {
        const queryText =   `INSERT INTO "vet_note" ("pet_id", "date", "vet", "note")
                            VALUES ($1, $2, $3, $4);`
        pool.query(queryText, [req.body.pet_id, req.body.date, req.body.vet, req.body.note])
            .then(result => {
                res.sendStatus(200);
            })
            .catch(error => {
                console.log('error in vet note POST route', error);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403); // forbidden
    }
});

router.delete('/:noteid', (req, res) => {
    console.log('in vet DELETE /:petid route', req.params.noteid);
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    if(req.isAuthenticated()){
        const queryText =   `DELETE FROM "vet_note"
                            WHERE "id" = $1;`
        pool.query(queryText, [req.params.noteid])
            .then(result => {
                res.sendStatus(200);
            })
            .catch(error => {
                console.log('error in vet DELETE route', error);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403); // forbidden
    }
});


module.exports = router;