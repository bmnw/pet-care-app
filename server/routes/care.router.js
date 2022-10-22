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

// GET care item reminders for pet
router.get('/reminders/:petid', (req, res) => {
    console.log('in GET /care/reminders/:petid', req.params.petid);
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    if(req.isAuthenticated()){
        const remindersQueryText =  `SELECT "care_item".*, "pet_care_item"."date_complete" FROM "care_item"
                                    JOIN "pet_care_item" ON "care_item"."id" = "pet_care_item"."care_item_id"
                                    WHERE "pet_id" = $1 AND "frequency" = 'daily' AND "start_date" <= NOW()
                                    OR "pet_id" = $1 AND ("frequency" = 'weekly' AND to_char("start_date", 'D') = to_char(NOW(), 'D') AND "start_date" <= NOW())
                                    OR "pet_id" = $1 AND ("frequency" = 'monthly' AND to_char("start_date", 'DD') = to_char(NOW(), 'DD') AND "start_date" <= NOW())
                                    OR "pet_id" = $1 AND ("frequency" = 'yearly' AND to_char("start_date", 'DD MM') = to_char(NOW(), 'DD MM') AND "start_date" <= NOW())
                                    ORDER BY "start_date";`
        pool.query(remindersQueryText, [req.params.petid])
            .then(result => {
                res.send(result.rows);
            })
            .catch(error => {
                console.log('error in GET /care/reminders', error);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403); // forbidden
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
                                    VALUES ($1, $2, $3, $4, $5)
                                    RETURNING "id";`
        pool.query(careItemQueryText, [req.body.pet_id, req.body.description, req.body.frequency, req.body.start_date, req.body.details])
            .then(result => {
                console.log('care_item.id', result.rows[0].id);
                const careItemId = result.rows[0].id;
                const insertPetCareItemQuery =  `INSERT INTO "pet_care_item" ("care_item_id")
                                                VALUES ($1);`
                pool.query(insertPetCareItemQuery, [careItemId])
                    .then(result => {
                        res.sendStatus(200);
                    })
                    .catch(error => {
                        console.log('error inserting into pet_care_item', error);
                        res.sendStatus(500);
                    });
            })
            .catch(error => {
                console.log('error inserting into care_item', error);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403); // forbidden
    }
});

// PUT to mark a care item as complete on a day
router.put('/:itemid', (req, res) => {
    console.log('in care PUT /:itemid', req.params.itemid);
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    if(req.isAuthenticated()) {
        const queryText =   `UPDATE "pet_care_item" 
                            SET "date_complete" = CURRENT_DATE
                            WHERE "care_item_id" = $1;`
        pool.query(queryText, [req.params.itemid])
            .then(result => {
                res.sendStatus(200);
            })
            .catch(error => {
                console.log(error);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403); // forbidden
    }
});

// DELETE selected pet care item
router.delete('/:itemid', (req, res) => {
    console.log('in care DELETE /:itemid', req.params.itemid);
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    if(req.isAuthenticated()){
        const deletePetCareItemQuery =   `DELETE FROM "pet_care_item"
                                            WHERE "care_item_id" = $1;`
        pool.query(deletePetCareItemQuery, [req.params.itemid])
            .then(result => {
                const deleteCareItemQuery = `DELETE FROM "care_item"
                                            WHERE "id" = $1;`
                pool.query(deleteCareItemQuery, [req.params.itemid])
                    .then(result => {
                        res.sendStatus(200);
                    })
                    .catch(error => {
                        console.log('error deleting from care_item', error);
                        res.sendStatus(500);
                    })
            })
            .catch(error => {
                console.log('error deleting from pet_care_item', error);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403); // forbidden
    }
});

module.exports = router;