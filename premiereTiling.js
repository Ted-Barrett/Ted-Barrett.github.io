

function calcPremiereTiles(elementID) {
    var urlParams = new URLSearchParams(window.location.search)
    if (urlParams.has("framex") && urlParams.has("framey")
        && urlParams.has("sourcex") && urlParams.has("sourcey")
        && urlParams.has("tilesx") && urlParams.has("tilesy")) {

        var framex = parseInt(urlParams.get("framex"));
        var framey = parseInt(urlParams.get("framey"));

        var sourcex = parseInt(urlParams.get("sourcex"));
        var sourcey = parseInt(urlParams.get("sourcey"));

        var tilesx = parseInt(urlParams.get("tilesx"));
        var tilesy = parseInt(urlParams.get("tilesy"))

        var scale = parseInt(urlParams.get("scale"));

        var hoff = parseInt(urlParams.get("hoffset"));
        var voff = parseInt(urlParams.get("voffset"));

        var tiles=[];
        var index=0;

        var tileWidth=framex/tilesx;
        var scaledWidth=sourcex*scale/100;
        var cropWidthPercent=(1-tileWidth/scaledWidth)*0.5*100;

        var tileHeight=framey/tilesy;
        var scaledHeight=sourcey*scale/100;
        var cropHeightPercent=(1-tileHeight/scaledHeight)*0.5*100;

        var left=(cropWidthPercent+hoff).toFixed(2);
        var top=(cropHeightPercent-voff).toFixed(2);
        var right=(cropWidthPercent-hoff).toFixed(2);
        var bottom=(cropHeightPercent+voff).toFixed(2);

        console.log(cropWidthPercent,cropHeightPercent);

        var positions=[];
        var rowItems=[];

        for (var i=0; i<tilesx*tilesy; i++){
            column=i%tilesx;
            row=Math.floor(i/tilesx);
            console.log(column,row);

            x=Math.round((framex/tilesx)*column+(0.5*framex/tilesx)+hoff*scaledWidth/100);
            y=Math.round((framey/tilesy)*row+(0.5*framey/tilesy)+voff*scaledHeight/100);

            strItem="";

            strItem+="x:"
            strItem+=x.toString()
            strItem+=" y:"
            strItem+=y.toString()
            rowItems.push(strItem)
            // console.log(x,y);

            if (column==tilesx-1 && i!=0){
                positions.push(rowItems.join(" | "))
                rowItems=[];
            }

        }


        // hHex = hRes.toString(16).padStart(4, "0")
        // hHex = hHex.slice(2, 4).concat(" ", hHex.slice(0, 2)).toUpperCase()
        // vHex = vRes.toString(16).padStart(4, "0")
        // vHex = vHex.slice(2, 4).concat(" ", vHex.slice(0, 2)).toUpperCase()
        console.log(positions)
        strOut=positions.join("<br>")

        strOut=[
            ["Left: ",left,"%"].join(""),
            ["Top: ",top,"%"].join(""),
            ["Right: ",right,"%"].join(""),
            ["Bottom: ",bottom,"%"].join("")
        ].join("<br>")+"<br><br>"+strOut

        console.log(strOut)
        document.getElementById(elementID).innerHTML = strOut
    }
}