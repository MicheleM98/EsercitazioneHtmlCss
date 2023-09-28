$(document).ready(function () {
    $('#form').submit(function (event) {
        event.preventDefault();
        formValidate();
    });
});

function formValidate() {
    const phone = $('#phone');
    const email = $('#email');
    const phoneValue = phone.val();
    const emailValue = email.val();
    const phoneError = $('#phone-error');
    const mailError = $('#mail-error');

    console.log(phoneValue);
    if (isNaN(phoneValue) || phoneValue.length < 1) {
        console.log('si');
        phone.css('background', 'repeating-linear-gradient(to right, transparent 0 4px, #FFFFFF 0 7px),repeating-linear-gradient(to bottom, transparent 0 34px, #FF0000 0 36px)');
        phoneError.attr('title', 'TELEFONO NON VALIDO');
    } else {
        phone.css('background', 'repeating-linear-gradient(to right, transparent 0 4px, #FFFFFF 0 7px),repeating-linear-gradient(to bottom, transparent 0 34px, #ADADAD 0 36px)');
        phoneError.attr('title', '');
    }

    if (emailValue.indexOf('@') === -1 || emailValue.indexOf('.') === -1) {
        email.css('background', 'repeating-linear-gradient(to right, transparent 0 4px, #FFFFFF 0 7px),repeating-linear-gradient(to bottom, transparent 0 34px, #FF0000 0 36px)');
        mailError.attr('title', 'MAIL NON VALIDA');
    } else {
        email.css('background', 'repeating-linear-gradient(to right, transparent 0 4px, #FFFFFF 0 7px),repeating-linear-gradient(to bottom, transparent 0 24px, #ADADAD 0 36px)');
        mailError.attr('title', '');
    }
}

function messageSend() {
    const chat = $('#chat-box');
    const textArea = $('#text-message');
    let text = textArea.val();
    if(text !== '') {
        const div = $('<div ></div> ').addClass('sent-message message').text(text);
        const triangle = $('<div></div>').addClass('triangle triangle-down');
        chat.append(div);
        chat.append(triangle);
        textArea.val('');

        setTimeout(() => {
            const triangleResponse = $('<div></div>').addClass('triangle triangle-up');
            const divResponse = $('<div></div>').addClass('received-message message').text('Miiinchia!');
            chat.append(triangleResponse);
            chat.append(divResponse);
        }, 2000);
    }
}

async function gridReload() {
    const grid = $('#grid');
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    grid.html('');

    const headings = ['Email', 'Telefono', 'Azioni'];

    const div = $('<div></div>').addClass('grid-item first-row first-row-left').text('Cliente');
    grid.append(div);

    for (const heading of headings) {
        const div = $('<div></div>').addClass('grid-item first-row first-row-center').text(heading);
        grid.append(div);
    }

    data.forEach((element, index) => {
        grid.append(...['name', 'email', 'phone'].map(item => {
            const div = $('<div></div>').addClass('grid-item grid-center').attr('data-id', element.id).text(element[item]);
            return div;
        }));
        
        const divButton = $('<div></div>').attr('data-id', element.id).addClass('grid-item grid-center');
        const button = $('<button></button>').addClass('grid-link').text('Cancella');
        divButton.append(button);
        button.click(() => removeRecord(element.id));

        grid.append(divButton);
    });
}

function removeRecord(id) {
    $(`.grid-center[data-id="${id}"]`).remove();
}