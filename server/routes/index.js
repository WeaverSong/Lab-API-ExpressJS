const express = require('express');
const ChirpRouter = require('./chirps');

let Routes = express.Router();

Routes.use('/chirps/', ChirpRouter);

Routes.Chirper = ChirpRouter.chirper;
module.exports = Routes;