$(document).ready(function () {
    $('#form').submit(function (event) {
        event.preventDefault();
        formValidator();
    });
    
    $('#textMessage').on('input', function () {
        $('#textMessage').css('border-color', '#ADADAD');
    });
});

function formValidator() {
    const phone = $('#phone');
    const email = $('#email');
    const phoneValue = phone.val();
    const emailValue = email.val();
    const labelPhoneError = $('#phoneError');
    const labelMailError = $('#mailError');

    if (isNaN(phoneValue) || phoneValue.length < 1) {
        phone.css('border-color', '#FF0000');
        labelPhoneError.attr('title', 'TELEFONO NON VALIDO');
    } else {
        phone.css('border-color', '#ADADAD');
        labelPhoneError.attr('title', '');
    }

    if (emailValue.indexOf('@') === -1 || emailValue.indexOf('.') === -1) {
        email.css('border-color', '#FF0000');
        labelMailError.attr('title', 'MAIL NON VALIDA');
    } else {
        email.css('border-color', '#ADADAD');
        labelMailError.attr('title', '');
    }
}

function sendMessage() {
    const chat = $('#chatBox');
    const textArea = $('#textMessage');
    let text = textArea.val();
    if(text !== '') {
        const p = $('<p></p>').addClass('sent-message right-message').text(text);
        const trinagle = $('<p></p>').addClass('triangle triangle-down');
        chat.append(p);
        chat.append(trinagle);
        textArea.val('');

        setTimeout(() => {
            const trinagleResponse = $('<p></p>').addClass('triangle triangle-up');
            const pResponse = $('<p></p>').addClass('received-message left-message').text('Miiinchia!');
            chat.append(trinagleResponse);
            chat.append(pResponse);
        }, 2000);
    }
}

async function gridReload() {
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
        button.click(() => removeRecord(element.id));

        grid.append(divButton);
    });
}

function removeRecord(id) {
    $(`.grid-center[data-id="${id}"]`).remove();
}