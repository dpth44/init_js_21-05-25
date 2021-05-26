
let current_user = "";

let users = document.querySelectorAll(".content-list-view-user");
users.forEach(element => {
    element.addEventListener('click', function (evt) {
        current_user = this.querySelector(".user-name").innerHTML;
    },false);
    
});

function onsubmitmessageform(evt){
    evt.preventDefault();
    let recipient = document.forms["message-sender"]["message-to"].value;
    let color = document.forms["message-sender"]["message-color"].value;
    let content = document.forms["message-sender"]["message-text"].value;
    let message = {
        value:content,
        recipient:recipient,
        color:color,
        datetime:new Date()
    }
    appendMessageOnDOM(message,document.querySelector('.content-list-view-message'))
}
document.getElementById("message-to").selectedIndex = -1;
document.forms["message-sender"].addEventListener('submit',onsubmitmessageform);
function appendMessageOnDOM(message,messageTemplate){
    let toFillTemplate=messageTemplate.cloneNode(true)
    console.log();
    let date = moment().format('L').replace("/","-") +'<br/>'+moment().format('LTS').substring(0,8);
    toFillTemplate.querySelector('.message-datetime').innerHTML=date.substring();
    toFillTemplate.querySelector('.message-content').innerHTML=message.value;
    document.querySelector('#left-col').append(toFillTemplate);
}