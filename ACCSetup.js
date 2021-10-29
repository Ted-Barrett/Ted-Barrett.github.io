let d = new Drivers();
d.initialiseNew();
let e = new Drivers();
console.log(d.toString())

document.getElementById('download').addEventListener('click', () => {
    let dl = document.createElement('a')
    dl.download = 'test.json' // target filename
    let jsonString = `${JSON.stringify(d,replacer)}`
    dl.href = `data:application/json;charset=utf-8,`+jsonString
    dl.click()
    e.loadFromJson(JSON.parse(jsonString,reviver));
})


// https://stackoverflow.com/a/56150320
function replacer(key, value) {
    if(value instanceof Map) {
        return {
            dataType: 'Map',
            value: Array.from(value.entries()), // or with spread: value: [...value]
        };
    } else {
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