window.addEventListener('load', function () {
    const form = document.getElementById('form1');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        controlloForm();
    })
})

function controlloForm() {
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");
    const phoneValue = phone.value;
    const emailValue = email.value;
    let lblPhoneError = document.getElementById('phoneError');
    let lblMailError = document.getElementById('mailError');

    if (isNaN(phoneValue) || phoneValue.length < 1) {
        phone.style.borderColor = "#FF0000";
        lblPhoneError.setAttribute('title','TELEFONO NON VALIDO');
    } else {
        phone.style.borderColor = "#ADADAD";
        lblPhoneError.setAttribute('title','');

    }
    if (emailValue.indexOf("@") === -1 || emailValue.indexOf(".") === -1) {
        email.style.borderColor = "#FF0000";
        lblMailError.setAttribute('title','MAIL NON VALIDA');

    } else {
        email.style.borderColor = "#ADADAD";
        lblMailError.setAttribute('title','');
    }
}

function inviaMessaggio() {
    console.log('messaggio inviato');
}

async function caricaDati() {
    const grid = document.getElementById("grid");
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    grid.innerHTML = '';

    const headings = ['Clienti', 'Email', 'Telefono', 'Azioni'];

    for (const heading of headings) {
        const div = document.createElement('div');
        div.classList.add('grid-item', 'grid-item2', 'firstRow');
        div.innerText = heading;
        grid.append(div);
    }

    data.forEach((element, index) => {
        grid.append(...['name', 'email', 'phone'].map(item => {
            const div = document.createElement('div');
            div.classList.add('grid-item', 'grid-item2', 'grid-center');
            div.innerText = element[item]
            return div;
        }))

        const button = document.createElement('button');
        button.classList.add('grid-link');

        button.onclick = () => cancellaRecord(index);

        button.innerText = 'Cancella';
        grid.append(button);
    });
}

function cancellaRecord(index) {
    console.log("Bottone Cancella", index)
}