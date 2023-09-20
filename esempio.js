function controlloForm() {
    console.log('form validata');
}

function inviaMessaggio() {
    console.log('messaggio inviato');
}

const grid = [
    0 [item1, item2, item3, item4]
]

function caricaDati() {
    var xhttp = new XMLHttpRequest();
    const grid = document.getElementById("grid");
    xhttp.open("GET", "https://jsonplaceholder.typicode.com/users");
    xhttp.send();
    xhttp.onload = () => {
        console.log(xhttp);
        if (xhttp.status === 200) {
            const parsedJSON = JSON.parse(xhttp.response)
            parsedJSON.forEach(element => {
                let name = `<div class="grid-item grid-item2 grid-center grid-center">` + element.name + `</div>`;
                let email = `<div class="grid-item grid-item2 grid-center grid-center">` + element.email + `</div>`;
                let phone = `<div class="grid-item grid-item2 grid-center grid-center">` + element.phone + `</div>`;
                let action = `<div class="grid-item grid-item2 grid-center grid-center">
                                <button onclick="cancellaRecord()" class="grid-link">Cancella</button>
                            </div>`;
                let div = document.createElement("div");
                div.innerHTML = name + email + phone + action;
                console.log(div);
                document.body.appendChild(div); 
            });
        } else {
            console.log(`error ${xhttp.status} ${xhttp.statusText}`);
        }
    }
}

function cancellaRecord() {
    var record = document.getElementById(recordId);
    var grid = record.parentNode;
    while ( grid && grid.tagName != 'TABLE' )
        grid = grid.parentNode;
    if ( !grid )
        return;
    grid.deleteRow(record.rowIndex);
}