const _ = html;
let deleting = false;
let doScroll = true;

let input = {
    _Name: document.getElementById("Name"),
    get Name()
    {
        return this._Name.value;
    },
    set Name(v)
    {
        this._Name.value = v;
    },
    _Text: document.getElementById("Text"),
    get Text()
    {
        return this._Text.value;
    },
    set Text(v)
    {
        this._Text.value = v;
    }
};
let ChirpsHtml = document.getElementById("messages");

document.getElementById("Send").addEventListener('click', e => {
    e.preventDefault();
    if (input.Text === "") return;

    let name = input.Name;
    if (name === "") name = "[Anonymous]"

    fetch('http://localhost:3000/api/chirps/', {method: "POST", headers: {"content-type": "application/json"}, body: JSON.stringify({chirp: {name, text: input.Text}})});

    input.Name = "";
    input.Text = "";

    doScroll = true;
    Refresh();
});

const Refresh = async function () {
    let chirps = await (await fetch('http://localhost:3000/api/chirps/')).json();

    let chirpsArray = [];
    for (key in chirps) {
        if (!isNaN(parseInt(key)))
        {
            chirpsArray.push({...chirps[key], id: key});
        }
    }

    ChirpsHtml.innerHTML = "";

    chirpsArray.forEach(chirp => {
        ChirpsHtml.appendChild(
            _.div({ attributes: { class: "Message" } , eventListeners: {'click': e => {
                if (deleting) {
                    deleting = false;
                    return;
                }
                window.location.href = "http://localhost:3000/" + chirp.id;
            }}}, 
                _.h2(chirp.name),
                _.p(chirp.text),
                _.button({ textContent: "X", attributes: { class: "DeleteMessage" }, eventListeners: {'click': e => {
                    deleting = true;
                    fetch('http://localhost:3000/api/chirps/', {method: "DELETE", headers: {"content-type": "application/json"}, body: JSON.stringify({id: chirp.id})}).then(() => {
                        Refresh();
                    });
                }} })
            )
        );
    });

    if (doScroll) AddElement('div', ChirpsHtml).scrollIntoView();
    doScroll = false;
}

Refresh();