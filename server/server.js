const Router = require('./routes');
const ErrorPage = require('./routes/404');
const express = require('express');
const cors = require('cors');
const path = require('path');
const rel = (r) => path.join(__dirname, r);
const _ = require('./NotQuiteJSX');

let app = express();

app.use(express.static(rel('../client')));
app.use(cors());
app.use(express.json());
app.use('/api/', Router);

app.get('/:ID', (request, response) => {
    let id = request.params.ID;
    let chirp = Router.Chirper.getSingle(id);

    response.send(
        _.html(
            _.head(
                _.title("Chirp " + id),
                _.link({rel:"stylesheet",href:"style.css"})
            ),
            _.body(
                _.div({class: "flex max",style:"justify-content:center;align-items:center;"}, 
                    _.form({class: "input-form center"}, 
                        _.h1("Edit:"),
                        _.div({class:"pad"}, 
                            _.label({for:"Name", class:"font-bigger"}, "Name:"),
                            _.input({type:"text", id:"Name", class:"font-bigger", value: chirp.name})
                        ),
                        _.div({class:"pad"}, 
                            _.label({for:"Text", class:"font-bigger"}, "Text:"),
                            _.input({type:"text", id:"Text", class:"font-bigger", value: chirp.text})
                        ),
                        _.button({id:"Send", class:"margin"}, "Submit")
                    )
                ),
                _.script(`
                    const id = ${id};
                `),
                _.script({src:"editScript.js"})
            )
        )
    );

})


app.use((request, response) => {
    response.status(404).send(ErrorPage(request));
});


app.listen(3000);