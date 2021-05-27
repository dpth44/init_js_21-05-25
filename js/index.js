
let tchatDFD, users, msg_template = document.createElement("div"), user_template = document.createElement("div");
// let fragment = document.createDocumentFragment();
function onsubmitmessageform(evt) {
    evt.preventDefault();
    let recipient = document.forms["message-sender"]["message-to"].value;
    let color = document.forms["message-sender"]["message-color"].value;
    let content = document.forms["message-sender"]["message-text"].value;
    let message = {
        value: content,
        recipient: recipient,
        color: color,
        datetime: new Date(),
        user:JSON.parse(localStorage.getItem('currentUser'))
    }
    appendMessageOnDOM(message, msg_template);
    document.forms["message-sender"]["message-to"].selectedIndex = -1;

}

function appendMessageOnDOM(message, messageTemplate) {
    let toFillTemplate = messageTemplate.cloneNode(true);
    let date = moment().format('L').replace("/", "-") + '<br/>' + moment().format('LTS').substring(0, 8);
    toFillTemplate.querySelector('.message-datetime').innerHTML = date.substring();
    toFillTemplate.querySelector('.message-content').innerHTML = message.value;
    toFillTemplate.querySelector('.message-content').style.color = message.color;
    toFillTemplate.querySelector('.message-image').src = message.user.img;
    document.querySelector('#left-col').append(toFillTemplate);
}


function launchUserCreation(templateDOM) {
    console.log(users);
    users.forEach(element => {
        appendUserOnDOM(element, templateDOM);
    });
}
function onuserclick(evt) {
    document.forms['message-sender']['message-to'].value = this.querySelector('.user-name').innerHTML;
}

function appendUserOnDOM(user, templateDOM) {
    let toFillTemplate = templateDOM.cloneNode(true);
    toFillTemplate.querySelector('.user-name').innerHTML = user.name;
    toFillTemplate.querySelector('.user-image').src = user.img;
    toFillTemplate.addEventListener('click', onuserclick);
    let option = document.createElement('option');
    option.value = option.innerHTML = user.name;
    document.forms["message-sender"]["message-to"].add(option);
    document.querySelector('#right-col').append(toFillTemplate);
}

function bindsEvents() {
    document.forms["message-sender"].addEventListener('submit', onsubmitmessageform);
    document.forms["message-sender"]["message-to"].selectedIndex = -1;
    document.forms["message-sender"]["message-color"].addEventListener('input',function(evt){
        document.forms["message-sender"]["message-text"].style.color = evt.target.value;
    })
    // document.forms["auth"].addEventListener('submit', onsubmitmessageform);
}
function bindsAuthEvents() {
    document.forms["auth"].addEventListener('submit', onsubmitauthform);
}
function addUsersForAuth() {
    users.forEach(element => {
        let option = document.createElement('option');
        option.value = option.innerHTML = element.name;
        document.forms["auth"]["login"].add(option);
    });
    document.forms["auth"]["login"].value = "Damase";
}
function findItem(value) {
    for (item of users) {
        if (item.name == value) {
            return item;
        }
    }
}
function onsubmitauthform(evt) {
    evt.preventDefault();
    localStorage.setItem('currentUser', JSON.stringify(findItem(document.forms["auth"]["login"].value)));
    tchatDFD.resolve();
}

window.addEventListener("DOMContentLoaded", () => {
    //location.replace("./auth.html");
    Pxhr("views/auth.html", function (response) {
        document.querySelector('div#main').innerHTML = response;

        Pxhr("http://localhost:4475/users", function (response) {
            users = JSON.parse(response);
            addUsersForAuth();
        });
        bindsAuthEvents();

    });
    tchatDFD = $.Deferred();
    tchatDFD.done(function () {
        Pxhr("views/tchat.html", function (response) {
            document.querySelector('div#main').innerHTML = response;
            Pxhr("views/messageTemplate.html", function (response) {
                msg_template.innerHTML = response;
                Pxhr('http://localhost:4475/messages?_expand=user', function (response) {
                    JSON.parse(response).forEach(function (element) {
                        appendMessageOnDOM(element, msg_template);
                    });
                });
                // fragment.innerHTML = response;
            });
            Pxhr("views/userTemplate.html", function (response) {
                user_template.innerHTML = response;
                launchUserCreation(user_template);
                document.forms["message-sender"]["message-to"].selectedIndex = -1;            
            });
            bindsEvents()
        });
    });
});