let template = document.createElement('div');
let messages = [
    {id:0,value:"Mon Message 1",userId:0,color:'#452141',dateTime:new Date()},
    {id:1,value:"Mon Message 2",userId:1,color:'#452141',dateTime:new Date()},
    {id:2,value:"Mon Message 3",userId:2,color:'#452141',dateTime:new Date()},
    {id:3,value:"Mon Message 4",userId:3,color:'#452141',dateTime:new Date()},
    {id:4,value:"Mon Message 5",userId:4,color:'#452141',dateTime:new Date()},
    {id:5,value:"Mon Message 6",userId:5,color:'#452141',dateTime:new Date()},
    {id:6,value:"Mon Message 7",userId:6,color:'#452141',dateTime:new Date()},
    {id:7,value:"Mon Message 8",userId:7,color:'#452141',dateTime:new Date()}
];
let users = [
    {id:0,name:"Alex",img:"https://picsum.photos/id/684/600/400"},
    {id:1,name:"Mathieux",img:"https://picsum.photos/id/684/600/400"},
    {id:2,name:"Andrei",img:"https://picsum.photos/id/684/600/400"},
    {id:3,name:"Yann",img:"https://picsum.photos/id/684/600/400"},
    {id:4,name:"Matthieu",img:"https://picsum.photos/id/684/600/400"},
    {id:5,name:"Leo",img:"https://picsum.photos/id/684/600/400"},
    {id:6,name:"Thomas",img:"https://picsum.photos/id/684/600/400"},
    {id:7,name:"Damase",img:"https://picsum.photos/id/684/600/400"}
];

window.addEventListener("DOMContentLoaded", () => {
    
    $(function(){
        $(template).load("stock_html.html",function(){
            launchUserCreation(users,template.children[1])
            messages.forEach(element => {
                appendMessageOnDOM(element,template.children[0]);
            });
        }); 
    });
    bindsEvents();
  });