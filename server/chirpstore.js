class ChirpManager
{

    #chirps;
    #fs;

    constructor()
    {

        this.#fs = require('fs');

        this.#chirps = { nextid: 0 };
        if (this.#fs.existsSync('chirps.json'))
        {
            this.#chirps = JSON.parse(this.#fs.readFileSync('chirps.json'));
        }

    };

    getAll()
    {
        return Object.assign({}, this.#chirps); //create a copy and return it
    };

    getSingle(id)
    {
        if (this.#chirps[id] === undefined) return null;
        return Object.assign({}, this.#chirps[id]); //create a copy and return it
    };

    new(chirp)
    {

        this.#chirps[this.#chirps.nextid++] = chirp;
        this.write();
    };

    update(id, chirp)
    {
        if (this.#chirps[id] !== undefined)
        {
            this.#chirps[id] = chirp;
            this.write();
            return true;
        };
        return false;
    };

    delete(id)
    {

        if (this.#chirps[id] !== undefined)
        {
            delete this.#chirps[id];
            this.write();
            return true;
        };

        return false;
    };

    write()
    {
        this.#fs.writeFileSync('chirps.json', JSON.stringify(this.#chirps));
    };

};

module.exports = ChirpManager;