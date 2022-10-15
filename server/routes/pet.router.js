const express = require('express');
const pool = require('../modules/pool');
const { route } = require('./user.router');
const router = express.Router();

// GET route to return all of the logged in user's pets
router.get('/', (req, res) => {
    console.log('in /pet GET route');
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    if (req.isAuthenticated()) {
        let queryText =     `SELECT "pet".*, "user_pet"."user_id" FROM "pet"
                            JOIN "user_pet" ON "pet"."id" = "user_pet"."pet_id" 
                            WHERE "user_id" = $1
                            ORDER BY "pet"."id";`
        pool.query(queryText, [req.user.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403); // forbidden
    }
});

// POST new pet
router.post('/', (req, res) => {
    console.log('in /pet POST route');
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    if(req.isAuthenticated()) {
        const insertPetQueryText =  `INSERT INTO "pet" ("pet_name", "pet_type", "image")
                                    VALUES ($1, $2, $3)
                                    RETURNING "id";`
        pool.query(insertPetQueryText, [req.body.pet_name, req.body.pet_type, req.body.image])
        .then(result => {
            // console.log('new pet id', result.rows[0].id);
            console.log('result', result.rows[0].id);
            const createdPetId = result.rows[0].id;
            const insertUserPetQuery =  `INSERT INTO "user_pet" ("user_id", "pet_id")
                                        VALUES ($1, $2);`
            pool.query(insertUserPetQuery, [req.user.id, createdPetId])
                .then(result => {
                    res.sendStatus(200);
                })
                .catch(error => {
                    console.log(error);
                    res.sendStatus(500);
                })
        })
    } else {
        res.sendStatus(403); // forbidden
    }
});

module.exports = router;