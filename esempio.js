$(document).ready(function () {
    $('#form1').submit(function (event) {
        event.preventDefault();
        controlloForm();
    });

    $('#textMessage').on('input', function () {
        $('#textMessage').css('border-color', '#ADADAD');
    });
});

function controlloForm() {
    const phone = $('#phone');
    const email = $('#email');
    const phoneValue = phone.val();
    const emailValue = email.val();
    const lblPhoneError = $('#phoneError');
    const lblMailError = $('#mailError');

    if (isNaN(phoneValue) || phoneValue.length < 1) {
        phone.css('border-color', '#FF0000');
        lblPhoneError.attr('title', 'TELEFONO NON VALIDO');
    } else {
        phone.css('border-color', '#ADADAD');
        lblPhoneError.attr('title', '');
    }

    if (emailValue.indexOf('@') === -1 || emailValue.indexOf('.') === -1) {
        email.css('border-color', '#FF0000');
        lblMailError.attr('title', 'MAIL NON VALIDA');
    } else {
        email.css('border-color', '#ADADAD');
        lblMailError.attr('title', '');
    }
}

function inviaMessaggio() {
    const chat = $('#chatBox');
    const textArea = $('#textMessage');
    let text = textArea.val();
    if(text !== '') {
        const div = $('<div></div>');
        const p = $('<p></p>').addClass('sent-message message box-message right font-normal').text(text);
        const lbl = $('<p></p>').addClass(' triangle triangle-down');
        div.append(p);
        div.append(lbl);
        chat.append(div);
        textArea.val('');

        setTimeout(() => {
            const divResponse = $('<div></div>');
            const lblResponse = $('<p></p>').addClass('triangle triangle-up');
            const pResponse = $('<p></p>').addClass('receved-message message box-message left font-normal').text('Miiinchia!');
            divResponse.append(lblResponse);
            divResponse.append(pResponse);
            chat.append(divResponse);
        }, 2000);
    }
}

async function caricaDati() {
    const grid = $('#grid');
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    grid.html('');

    const headings = ['Clienti', 'Email', 'Telefono', 'Azioni'];

    for (const heading of headings) {
        const div = $('<div></div>').addClass('grid-item font-normal first-row').text(heading);
        grid.append(div);
    }

    data.forEach((element, index) => {
        grid.append(...['name', 'email', 'phone'].map(item => {
            const div = $('<div></div>').addClass('grid-item font-normal grid-center').attr('data-id', element.id).text(element[item]);
            return div;
        }));
        
        const divButton = $('<div></div>').attr('data-id', element.id).addClass('grid-item font-normal grid-center');
        const button = $('<button></button>').addClass('grid-link').text('Cancella');
        divButton.append(button);
        button.click(() => cancellaRecord(element.id));

        grid.append(divButton);
    });
}

function cancellaRecord(id) {
    $(`.grid-center[data-id="${id}"]`).remove();
}