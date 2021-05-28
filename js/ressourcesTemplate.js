let templates =[]
function getTemplate(templateName){
    templates[templateName] = document.createElement('div');
    xhr("views/component/"+templateName+".html", function (response) {
        templates[templateName] = response;
    },undefined,undefined,false);
}
// getTemplate("userTemplate");
// getTemplate("messageTemplate");