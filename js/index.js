let userList = document.querySelectorAll(".content-list-view-user");
userList.forEach(element => {
    element.addEventListener('click', onuserclick);
});

function onsubmitmessageform(evt) {
    evt.preventDefault();
    let recipient = document.forms["message-sender"]["message-to"].value;
    let color = document.forms["message-sender"]["message-color"].value;
    let content = document.forms["message-sender"]["message-text"].value;
    let message = {
        value: content,
        recipient: recipient,
        color: color,
        datetime: new Date()
    }
    appendMessageOnDOM(message, document.querySelector('.content-list-view-message'));
    document.getElementById("message-to").selectedIndex = -1;

}

function appendMessageOnDOM(message, messageTemplate) {
    let toFillTemplate = messageTemplate.cloneNode(true);
    let date = moment().format('L').replace("/", "-") + '<br/>' + moment().format('LTS').substring(0, 8);
    toFillTemplate.querySelector('.message-datetime').innerHTML = date.substring();
    toFillTemplate.querySelector('.message-content').innerHTML = message.value;
    document.querySelector('#left-col').append(toFillTemplate);
}


function launchUserCreation(users,templateDOM){
    users.forEach(element => {
        appendUserOnDOM(element,templateDOM);       
    });
}
function onuserclick(evt){
    document.forms['message-sender']['message-to'].value=this.querySelector('.user-name').innerHTML;
}

function appendUserOnDOM(user,templateDOM) {    
    let toFillTemplate = templateDOM.cloneNode(true);
    toFillTemplate.querySelector('.user-name').innerHTML = user.name;
    toFillTemplate.querySelector('.user-image').src = user.img;
    toFillTemplate.addEventListener('click',onuserclick);
    document.querySelector('#right-col').append(toFillTemplate);
}

function bindsEvents() {
    document.getElementById("message-to").selectedIndex = -1;
    document.forms["message-sender"].addEventListener('submit', onsubmitmessageform);
}

window.addEventListener("DOMContentLoaded", () => {
    bindsEvents();
});