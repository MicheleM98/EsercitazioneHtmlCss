function controlloForm() {
    console.log('form validata');
}

function inviaMessaggio() {
    console.log('messaggio inviato');
}

function caricaDati() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://jsonplaceholder.typicode.com/users");
    xhttp.send();
    xhttp.onload = () => {
        console.log(xhttp);
        if (xhttp.status === 200) {
            console.log(JSON.parse(xhttp.response));
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