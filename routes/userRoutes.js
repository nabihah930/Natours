const express = require('express');

const getAllUsers = (req, res) => {
    res.status(200);
    res.json({
        status: "success",
        requestedAt: req.requestTime,
        message: "Implementation coming soon",
        data : null
    });
};
const getUser = (req, res) => {
    res.status(200);
    res.json({
        status: "success",
        requestedAt: req.requestTime,
        message: "Implementation coming soon",
        data : null
    });
};
const createUser = (req, res) => {
    res.status(200);
    res.json({
        status: "success",
        requestedAt: req.requestTime,
        message: "Implementation coming soon",
        data : null
    });
};
const updateUser = (req, res) => {
    res.status(201);
    res.json({
        status: "success",
        requestedAt: req.requestTime,
        message: "Implementation coming soon",
        data : null
    });
};

const deleteUser = (req, res) => {
    res.status(204);
    res.json({
        status: "success",
        requestedAt: req.requestTime,
        message: "Implementation coming soon",
        data : null
    });
};

const router = express.Router();

router.route('/')
    .get(getAllUsers)
    .post(createUser);

router.route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

module.exports = router;
