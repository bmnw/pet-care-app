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

// GET a pet by pet id
router.get('/:petId', (req, res) => {
    console.log('in /pet:petId GET route');
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    if(req.isAuthenticated()) {
        const queryText =   `SELECT "pet".*, "user_pet"."user_id" FROM "pet"
                            JOIN "user_pet" ON "pet"."id" = "user_pet"."pet_id" 
                            WHERE "pet_id" = $1 AND "user_id" = $2;`
        pool.query(queryText, [req.params.petId, req.user.id])
            .then(result => {
                res.send(result.rows);
            })
            .catch(error => {
                console.log(error);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403);
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
                    console.log('error inserting into user_pet', error);
                    res.sendStatus(500);
                })
        }).catch (error => {
            console.log('error inserting into pet', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403); // forbidden
    }
});

// DELETE to remove pet profile

router.delete('/:petid', async (req, res) => {
    console.log('in pet DELETE /:petid', req.params.petid);
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    if (req.isAuthenticated()) {
        try {
            const checkAuthorizationQuery = `SELECT "user_pet".*, "user"."username" FROM "user_pet"
                                            JOIN "user" ON "user"."id" = "user_pet"."user_id"
                                            WHERE "user"."id" = $1 AND "user_pet"."pet_id" = $2;`
            const result = await pool.query(checkAuthorizationQuery, [req.user.id, req.params.petid]);
            if(result) {
                console.log('user has authorization to delete');
                const userPetQueryText =    `DELETE FROM "user_pet"
                                            WHERE "pet_id" = $1 AND "user_id" = $2;`
                await pool.query(userPetQueryText, [req.params.petid, req.user.id]);
                const petQueryText =    `DELETE FROM "pet"
                                        WHERE "pet"."id" = $1;`
                await pool.query(petQueryText, [req.params.petid])
                res.sendStatus(200);
            } else {
                console.log('user is not authorized to delete');
                res.sendStatus(401); // unauthorized
            }
        } catch (error) {
            console.log('error deleting pet profile', error);
            res.sendStatus(500);
        }
    } else {
        res.sendStatus(403); // forbidden
    }
});

// router.delete('/:petid', (req, res) => {
//     console.log('in pet DELETE /:petid', req.params.petid);
//     console.log('is authenticated?', req.isAuthenticated());
//     console.log('user', req.user);
//     if(req.isAuthenticated()) {
//         const userPetQueryText =    `DELETE FROM "user_pet"
//                                     WHERE "pet_id" = $1 AND "user_id" = $2;`
//         pool.query(userPetQueryText, [req.params.petid, req.user.id])
//             .then(result => {
//                 const petQueryText =    `DELETE FROM "pet"
//                                         WHERE "pet"."id" = $1;`
//                 pool.query(petQueryText, [req.params.petid])
//                     .then(result => {
//                         res.sendStatus(200);
//                     })
//                     .catch(error => {
//                         console.log('error in delete from pet', error);
//                         res.sendStatus(500);
//                     })
//             })
//             .catch(error => {
//                 console.log('error in delete from user_pet', error);
//                 res.sendStatus(500);
//             });
//     } else {
//         res.sendStatus(403);
//     }
// });

// PUT to update pet name
router.put('/:petid', async (req, res) => {
    console.log('in pet PUT /:petid', req.params.petid, req.body);
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    if (req.isAuthenticated()) {
        try {
            const checkAuthorizationQuery = `SELECT "user_pet".*, "user"."username" FROM "user_pet"
                                            JOIN "user" ON "user"."id" = "user_pet"."user_id"
                                            WHERE "user"."id" = $1 AND "user_pet"."pet_id" = $2;`
            const result = await pool.query(checkAuthorizationQuery, [req.user.id, req.params.petid]);
            if(result) {
                console.log('user has authorization to edit');
                const petQueryText =    `UPDATE "pet" SET
                        "pet_name" = $1
                        WHERE "pet"."id" = $2;`
                await pool.query(petQueryText, [req.body.pet_name, req.params.petid]);
                res.sendStatus(200);
            } else {
                console.log('user does not have authorization to edit.');
                res.sendStatus(401); // unauthorized
            }
        } catch (error) {
            console.log('error updating pet name.', error);
            res.sendStatus(500);
        }
    } else {
        res.sendStatus(403); // forbidden
    }
});

// router.put('/:petid', (req, res) => {
//     console.log('in pet PUT /:petid', req.params.petid, req.body);
//     console.log('is authenticated?', req.isAuthenticated());
//     console.log('user', req.user);
//     if(req.isAuthenticated()) {
//         const petQueryText =    `UPDATE "pet" SET
//                                 "pet_name" = $1
//                                 WHERE "pet"."id" = $2;`
//         pool.query(petQueryText, [req.body.pet_name, req.params.petid])
//             .then(result => {
//                 res.sendStatus(200);
//             })
//             .catch(error => {
//                 console.log('error in updating pet name', error);
//                 res.sendStatus(500);
//             });
//     } else {
//         res.sendStatus(403);
//     }
// });

module.exports = router;