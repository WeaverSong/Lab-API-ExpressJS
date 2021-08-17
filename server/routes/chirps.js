const express = require('express');
/*
    I like classes better, so I turned it into a class.
*/
const ChirpManager = require('../chirpstore');
let Chirper = new ChirpManager();

let router = express.Router();

router.get('/:ID?', (request, response) => {
    const id = parseInt(request.params.ID);
    if (isNaN(id)) {
        response.json(Chirper.getAll());
        return;
    }

    const chirp = Chirper.getSingle(id);
    if (chirp === null) {
        response.status(400).json({"message": "No such chirp"});
        return;
    }

    response.json(chirp);
});

router.post('/', (request, response) => {

    if (typeof(request.body.chirp) !== "object") {
        response.status(400).json({"message": "Invalid chirp data"});
        return;
    };

    Chirper.new(request.body.chirp);

    response.sendStatus(200);

});

router.put('/', (request, response) => {

    const {id, chirp} = request.body;

    if (id === undefined) {
        response.status(400).json({"message": "Invalid id"});
        return;
    };

    if (chirp === undefined || typeof(chirp) !== "object") {
        response.status(400).json({"message": "Invalid chirp data"});
        return;
    };

    let didWork = Chirper.update(id, chirp);

    if (didWork) response.sendStatus(200);
    else response.status(400).json({"message": "No such chirp"});

});

router.delete('/', (request, response) => {
    
    const {id} = request.body;

    if (id === undefined) {
        response.status(400).json({"message": "Invalid id"});
        return;
    };

    let didWork = Chirper.delete(id);

    if (didWork) response.sendStatus(200);
    else response.status(400).json({"message": "No such chirp"});

});


router.chirper = Chirper;
module.exports = router;