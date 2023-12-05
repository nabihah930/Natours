const fs = require('fs');
const express = require('express');

const toursFile = `${__dirname}/../dev-data/data/tours-simple.json`;
const tours = JSON.parse(fs.readFileSync(toursFile));

const getAllTours = (req, res) => {
    res.status(200).json({
        status: "success",
        results: tours.length,
        data: {
            tours
        }
    });
};

const getTour = (req, res) => {
    const id = req.params.id * 1;                           // Convert the string param to number
    const tour = tours.find((tour) => tour.id === id);
    
    res.status(200).json({
        status: "success",
        data: {
            tour
        }
    });
};

const createTour = (req, res) => {
    //Off the bat express does not add body data to the request to get that data we use middleware
    const newId = tours[tours.length-1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);
    
    tours.push(newTour);
    fs.writeFile(toursFile, JSON.stringify(tours), err => {
        res.status(201);
        res.json({
            status: "success",
            requestedAt: req.requestTime,
            data: {
                tour: newTour
            }
        });
    });
};

const updateTour = (req, res) => {
    const id = req.params.id * 1;
    let updatedTour = {};
    tours.forEach(tour => {
        if(tour.id === id) {
            for (const property in req.body) {
                if (tour.hasOwnProperty(property)) {
                  tour[property] = req.body[property];
                }
            }
            updatedTour = tour;
        }
    });
    
    fs.writeFile(toursFile, JSON.stringify(tours), err => {
        res.status(201);
        res.json({
            status: "success",
            requestedAt: req.requestTime,
            data : {
                tour: updatedTour
            }
        });
    });
};

const deleteTour = (req, res) => {
    const id = req.params.id * 1;
    const newTours = tours.filter((tour) => tour.id !== id);

    fs.writeFile(toursFile, JSON.stringify(newTours), err => {
        res.status(204);
        res.json({
            status: "success",
            requestedAt: req.requestTime,
            data : null
        });
    });
};

const checkID = (req, res, next, value) => {
    const id = req.params.id * 1;
    if(id > tours.length) {
        return res.status(404).json({
            status: "fail",
            message: "Invalid ID"
        });
    }
    next();
};

const router = express.Router();

// Middleware for a specific parameter 
router.param('id', checkID);

router.route('/')
    .get(getAllTours)
    .post(createTour);

router.route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

module.exports = router;
