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
        const queryText = `SELECT "id", "username" FROM "user";`
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

// POST to add entry to user_pet
router.post('/', async (req, res) => {
    console.log('in share POST route');
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    if(req.isAuthenticated()) {
        try {
            const queryText =   `SELECT * FROM "user_pet"
                                WHERE "user_id" = $1 AND "pet_id" = $2;`
            const result = await pool.query(queryText, [req.body.user_id, req.body.pet_id]);
            console.log(result.rows.length);
            if(result.rows.length > 0) {
                console.log('user already has access to this pet', result);
                res.sendStatus(401); // unauthorized
            } else {
                console.log('user does not have access to this pet yet');
                const insertUserPetQuery =  `INSERT INTO "user_pet" ("user_id", "pet_id")
                                            VALUES ($1, $2);`
                await pool.query(insertUserPetQuery, [req.body.user_id, req.body.pet_id]);
                res.sendStatus(200);
            }
        } catch (error) {
            console.log('error in share POST', error);
            res.sendStatus(500);
        }
    } else {
        res.sendStatus(403); // forbidden
    }
    // if(req.isAuthenticated()) {
    //     const insertUserPetQuery =  `INSERT INTO "user_pet" ("user_id", "pet_id")
    //                                 VALUES ($1, $2);`
    //     pool.query(insertUserPetQuery, [req.body.user_id, req.body.pet_id])
    //         .then(result => {
    //             res.sendStatus(200);
    //         })
    //         .catch(error => {
    //             console.log('error in share POST route', error);
    //             res.sendStatus(500);
    //         });
    // } else {
    //     res.sendStatus(403);
    // }
});

module.exports = router;