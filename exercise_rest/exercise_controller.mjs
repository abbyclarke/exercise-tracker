import 'dotenv/config';
import * as exercises from './exercise_model.mjs';
import express from 'express';
import {body, validationResult } from 'express-validator';




const PORT = process.env.PORT;

const app = express();

app.use(express.json());



function isDateValid(date) {
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}



/**
 * Create a new exercise
 */
app.post('/exercises', (req, res) => {
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({Error: 'Invalid request' });
        });
});


/**
 * Retrive all exercises
 */
app.get('/exercises', (req, res) => {
    let filter = {}
    exercises.findExercise(filter)
        .then(exercises => {
            res.send(exercises);
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Request failed' });
        });
});

/**
 * Retrieve exercise by ID
 */
app.get('/exercises/:_id', (req, res) => {
    const exerciseID = req.params._id
    exercises.findExerciseById(exerciseID)
        .then(exercise => {
            if (exercise !== null){
                res.json(exercise);
            } else {
                res.status(404).json({Error: 'Not found'});
            }
        })
        .catch(error => {
            res.status(400).json({ Error: 'Request failed'});
        });
});


/**
 * Update the exercise whose id is provided in the path parameter and set
 * its name, reps, weight, unit, and date to the values provided in the body.
 */
app.put('/exercises/:_id', 
    body('name').isLength({min: 1}),
    body('reps').isInt( {min: 1}),
    body('weight').isInt( {min: 1}),
    body('unit').isIn(['lbs', 'kgs']),
    (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty() || !isDateValid(req.body.date)){
            return res.status(400).json({Error: 'Invalid request'});
        }
        exercises.updateExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
            .then(numUpdated => {
                if (numUpdated === 1) {
                    res.json({id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date})
                } else {
                    res.status(404).json({ Error: 'Not found'});
                }
            })
            .catch(error => {
                console.error(error);
                res.status(400).json({ Error: 'Invalid request'});
            });
});

/**
 * Delete the exercise whose id is provided in the query parameters
 */
app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteById(req.params._id)
    .then(deletedCount => {
        if (deletedCount === 1) {
            res.status(204).send();
        } else {
            res.status(404).json({ Error: 'Not found'});
        }
    })
    .catch(error => {
        console.error(error);
        res.send({error: 'Request failed'});
    });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});