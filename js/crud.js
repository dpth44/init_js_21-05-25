function Pxhr(url,callback,method) {
    if(!method){
        method = "GET" ;
    }
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            callback(this.response)
        }
    };
    xhr.open(method, url, true);
    xhr.send();
}