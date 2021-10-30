let loadInput = document.getElementById("uploadPlannerJSON");
let inputJSON;

let d = new Drivers();
d.initialiseNew();

const reader = new FileReader();
reader.onload = function (event) {
    inputJSON = JSON.parse(reader.result,reviver);
    d.loadFromJSON(inputJSON);
}

loadInput.onchange = function (event) {
    let file = loadInput.files[0];
    reader.readAsText(file)
}
// d.initialiseNew();
// let e = new Drivers();

document.getElementById('download').addEventListener('click', () => {
    let dl = document.createElement('a')
    dl.download = 'test.json' // target filename
    let jsonString = `${JSON.stringify(d,replacer)}`
    console.log(jsonString)
    dl.href = `data:application/json;charset=utf-8,`+jsonString
    dl.click()
})


// https://stackoverflow.com/a/56150320
function replacer(key, value) {
    if(value instanceof Map) {
        return {
            dataType: 'Map',
            value: Array.from(value.entries()), // or with spread: value: [...value]
        };
    } else {
        if (key === "_name"){
            console.log(key, value)
        }
        return value;
    }
}

function reviver(key, value) {
    if(typeof value === 'object' && value !== null) {
        if (value.dataType === 'Map') {
            return new Map(value.value);
        }
    }
    return value;
}