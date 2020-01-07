function getDS3Hex(elementID) {
    var urlParams = new URLSearchParams(window.location.search)
    if (urlParams.has("hres") && urlParams.has("vres")) {
        hRes = parseInt(urlParams.get("hres"))
        vRes = parseInt(urlParams.get("vres"))
        hHex = hRes.toString(16).padStart(4, "0")
        hHex = hHex.slice(2, 4).concat(" ", hHex.slice(0, 2)).toUpperCase()
        vHex = vRes.toString(16).padStart(4, "0")
        vHex = vHex.slice(2, 4).concat(" ", vHex.slice(0, 2)).toUpperCase()
        document.getElementById(elementID).textContent = "".concat("\nHex values for ", hRes, " x ", vRes, ": ", hHex, " 00 00 ", vHex)
    }
}