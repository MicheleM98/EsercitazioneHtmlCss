$(document).ready(function () {
    $('#form').submit(function (event) {
        event.preventDefault();
        validateForm();
    });
});

function validateForm() {
    const phone = $('#phone');
    const email = $('#email');
    const phoneValue = phone.val();
    const emailValue = email.val();
    const phoneError = $('#phone-error');
    const mailError = $('#mail-error');

    if (isNaN(phoneValue) || phoneValue.length < 1) {
        phone.css('border-color', '#FF0000');
        phoneError.attr('title', 'TELEFONO NON VALIDO');
    } else {
        phone.css('border-color', '#ADADAD');
        phoneError.attr('title', '');
    }

    if (emailValue.indexOf('@') === -1 || emailValue.indexOf('.') === -1) {
        email.css('border-color', '#FF0000');
        mailError.attr('title', 'MAIL NON VALIDA');
    } else {
        email.css('border-color', '#ADADAD');
        mailError.attr('title', '');
    }
}

function messageSend() {
    const chat = $('#chat-box');
    const textArea = $('#text-message');
    let text = textArea.val();
    if(text !== '') {
        const div = $('<div ></div> ').addClass('sent-message right-message').text(text);
        const trinagle = $('<div></div>').addClass('triangle triangle-down');
        div.append(trinagle);
        chat.append(div);
        textArea.val('');

        setTimeout(() => {
            const trinagleResponse = $('<div></div>').addClass('triangle triangle-up');
            const divResponse = $('<div></div>').addClass('received-message left-message').text('Miiinchia!');
            trinagleResponse.append(divResponse);
            chat.append(trinagleResponse);
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
        const div = $('<div></div>').addClass('grid-item first-row first-row-center').text(heading);
        grid.append(div);
    }

    data.forEach((element, index) => {
        grid.append(...['name', 'email', 'phone'].map(item => {
            const div = $('<div></div>').addClass('grid-item grid-center').attr('data-id', element.id).text(element[item]);
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