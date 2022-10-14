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



module.exports = router;