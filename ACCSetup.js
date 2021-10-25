const MIN_DRIVERS = 1;
const MAX_DRIVERS = 9;

const MIN_TEMP = 10;
const MAX_TEMP = 40;

const NUM_DRIVERS_ID = "numDrivers";
const DRIVER_CLASS = "driver";
const DRIVER_TABLE_ID = "driverTable";
const MAIN_FORM_ID = "mainForm";

const TYRE_TEMP_NAME_PREFIX = "TYRE_TEMP_";

const MIN_TEMP_ID = "minTemp";
const MAX_TEMP_ID = "maxTemp";

const TYRES = ["FL", "FR", "RL", "RR"];

let driverHTML = "";
let driversTable = undefined;

function startFunc() {
    driversTable = document.getElementById(DRIVER_TABLE_ID);
    driverHTML = document.getElementsByClassName(DRIVER_CLASS).item(0).innerHTML;
    driversTable.innerHTML = "";
    const numDrivers = parseInt(document.getElementById(NUM_DRIVERS_ID).innerHTML);
    for (let i = 0; i < MAX_DRIVERS; i++) {
        let row = driversTable.insertRow(i);
        row.innerHTML += driverHTML;
        row.className = DRIVER_CLASS;
        row.style.borderBottom = "1px solid #ddd"
    }

    let tempsTable = generateTyreTempsTable();
    let currentTempTables = document.getElementsByName("tyres");
    for (let i = 0; i < currentTempTables.length; i++) {
        currentTempTables[i].innerHTML = tempsTable.innerHTML;
    }

    updateDriversTable();
    updateTemps();
}

function generateSetup(input, output) {

}

function updateDriversTable() {
    const numDrivers = getNumDrivers();
    for (let i = 0; i < MAX_DRIVERS; i++) {
        let row = driversTable.rows[i];
        if (i < numDrivers) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    }
}

function updateTemps() {
    let minTemp = getMinTrackTemp();
    let maxTemp = getMaxTrackTemp();

    for (let i = MIN_TEMP; i <= MAX_TEMP; i++) {
        let tyreTempRows = document.getElementsByName(TYRE_TEMP_NAME_PREFIX + i.toString());
        for (let j = 0; j < tyreTempRows.length; j++) {
            if (i >= minTemp && i <= maxTemp) {
                tyreTempRows[j].style.display = "";
            } else {
                tyreTempRows[j].style.display = "none";
            }
        }
    }
    updateDriversTable();
}

function generateTyreTempsTable() {
    const minTemp = MIN_TEMP;
    const maxTemp = MAX_TEMP;
    let table = document.createElement("table");
    table.className = "innerTable";
    table.setAttribute("name", "tyres");
    let header = table.insertRow(0);
    header.innerHTML = "<th>Temp</th><th>FL</th><th>FR</th><th>RL</th><th>RR</th>";
    let temperature = minTemp;
    for (let i = 1; i <= maxTemp - minTemp + 1; i++) {
        let row = table.insertRow(i);
        row.setAttribute("name", TYRE_TEMP_NAME_PREFIX + temperature.toString());
        let temperatureCell = row.insertCell(0);
        temperatureCell.className = "textCentre";
        temperatureCell.innerText = temperature.toString();

        for (let j = 0; j < TYRES.length; j++) {
            let cell = row.insertCell(j + 1);
            cell.className = "textCentre";
            cell.innerHTML = '<input class="dec2_2" type="tel" name="' + TYRES[j] + '" maxlength="5" onfocus="this.select()"></td>';
        }

        temperature += 1;
    }
    return table;
}

function adjField(inc, elemID, min = null, max = null) {
    const valueField = document.getElementById(elemID);
    const n = parseInt(valueField.innerHTML) + inc;
    if ((min == null || n >= min) && (max == null || n <= max)) {
        valueField.innerHTML = n;
    }
}

function genSetupButton() {
    document.getElementById(MAIN_FORM_ID).reportValidity();
}

function getNumDrivers() {
    return parseInt(document.getElementById(NUM_DRIVERS_ID).innerHTML);
}

function getMinTrackTemp() {
    return parseInt(document.getElementById(MIN_TEMP_ID).innerHTML)
}

function getMaxTrackTemp() {
    return parseInt(document.getElementById(MAX_TEMP_ID).innerHTML)
}