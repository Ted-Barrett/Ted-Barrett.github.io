function setPrevValues(params){
    var urlParams = new URLSearchParams(window.location.search);

    for (i=0;i<params.length;i++)
    if (urlParams.has(params[i])) {
        document.getElementById(params[i]).value=urlParams.get(params[i]);
    }
}