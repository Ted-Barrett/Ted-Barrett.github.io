const DRIVERS_TABLE_ID = "driverTables";
const DRIVER_TABLE_CLASS = "driverTable";
const DRIVER_TABLE_MAIN_INFO_CLASS = "driverMainInfo";
const DRIVER_TABLE_TYRE_INFO_CLASS = "driverTyreInfo";

const CELL_BORDER_STYLE = "1px solid white";

const TYRES = ["FL", "FR", "RL", "RR"];

const MIN_TEMP = 10;
const MAX_TEMP = 40;
const MAX_DRIVERS = 9;

let current_min_temp = 25;
let current_max_temp = 30;

class Drivers {
    _drivers;
    _numDrivers;

    constructor() {

    }

    initialiseNew() {
        let _driversTable = document.getElementById(DRIVERS_TABLE_ID);
        this._drivers = new Map();
        this._numDrivers = 1;
        for (let i = 0; i < MAX_DRIVERS; i++) {
            let driver = new Driver();
            driver.initialiseNew(i)
            let row = _driversTable.insertRow(i);
            if (i > this._numDrivers - 1) {
                row.style.display = "none";
            } else {
                row.style.display = "";
            }
            driver.giveRow(row);
            driver.initTable();
            this._drivers.set(i, driver);
        }
    }

    loadFromJSON(jsonObject) {
        this._drivers = new Map();
        for (const [id, driver] of jsonObject._drivers) {
            let newDriver = new Driver();
            newDriver.loadFromJSON(driver);
            this._drivers.set(id, newDriver);
        }
        this._numDrivers = jsonObject._numDrivers;
        this.populateTables();
    }


    toString() {
        let returnString = "";
        for (let i = 0; i < this._drivers.size; i++) {
            returnString += this._drivers.get(i).toString() + "\n";
        }

        return returnString;
    }

    updateTables() {
        for (let i = 0; i < MAX_DRIVERS; i++) {
            let row = document.getElementById(DRIVERS_TABLE_ID).rows[i];
            if (i > this._numDrivers - 1) {
                row.style.display = "none";
            } else {
                row.style.display = "";
            }
        }
    }

    populateTables() {
        this.updateTables();
        for (let i = 0; i < MAX_DRIVERS; i++) {
            let driver = this._drivers.get(i);
            driver.populateTables();
        }
    }
}

class lapTime {
    _min;
    _sec;
    _ms;

    constructor() {
        // this._min = 0.0;
        // this._sec = 0.0;
        // this._ms = 0.0;
    }

    loadFromJSON(jsonObject) {
        this._min = jsonObject._min;
        this._sec = jsonObject._sec;
        this._ms = jsonObject._ms;
    }

    toString() {
        return this._min.toString() + ":" + this._sec.toString() + "." + this._ms.toString();
    }
}

class Driver {
    _id;
    _name;
    _raceLap;
    _raceLapFuel;

    _containingRow;

    _tyrePressuresAtTemps;

    constructor() {

    }

    loadFromJSON(jsonObject) {
        this._id = jsonObject._id;
        this._tyrePressuresAtTemps = new TyrePressuresAtTemps(this._id);
        this._tyrePressuresAtTemps.loadFromJSON(jsonObject._tyrePressuresAtTemps);
        this._raceLap = new lapTime();
        this._raceLap.loadFromJSON(jsonObject._raceLap);
        this._raceLapFuel = jsonObject._raceLapFuel;
        this._name = jsonObject._name;
        this._containingRow = document.getElementById(DRIVERS_TABLE_ID).rows[this._id];
    }

    initialiseNew(id) {
        this._id = id;
        this._tyrePressuresAtTemps = new TyrePressuresAtTemps(this._id);
        this._raceLap = new lapTime();
        this._raceLapFuel = 0.0;
    }

    giveRow(row) {
        this._containingRow = row;
    }

    initTable() {
        let table = document.createElement("table");
        table.className = DRIVER_TABLE_CLASS;
        table.style.border = CELL_BORDER_STYLE;
        let row = table.insertRow(-1);
        let driverCell = row.insertCell(-1);
        driverCell.appendChild(this.generateDriverTable());
        driverCell.style.borderRight = CELL_BORDER_STYLE;
        let pressuresCell = row.insertCell(-1);
        pressuresCell.appendChild(this._tyrePressuresAtTemps.generatePressuresTable());
        this._containingRow.appendChild(table);
    }

    generateDriverTable() {
        let table = document.createElement("table");
        table.className = DRIVER_TABLE_MAIN_INFO_CLASS;

        let labels = ["Driver name:", "Race lap time:", "Race lap fuel:"];
        let inputCells = [document.createElement("td"), document.createElement("td"), document.createElement("td")];
        inputCells[0].innerHTML =
            "<input type='text' onchange='d._drivers.get(" + this._id.toString() + ")._name=this.value'>";
        inputCells[1].innerHTML =
            "<input type='tel' style='width: 2ch' maxlength='2' onchange='d._drivers.get(" + this._id.toString() + ")._raceLap._min=this.value'>:" +
            "<input type='tel' style='width: 2ch' maxlength='2' onchange='d._drivers.get(" + this._id.toString() + ")._raceLap._sec=this.value'>." +
            "<input type='tel' style='width: 3ch' maxlength='3' onchange='d._drivers.get(" + this._id.toString() + ")._raceLap._ms=this.value'>";
        inputCells[2].innerHTML =
            "<input type='tel' style='width: 5ch' maxlength='5' onchange='d._drivers.get(" + this._id.toString() + ")._raceLapFuel=parseFloat(this.value)'><a class='inputUnit'> litres</a>"
        for (let i = 0; i < labels.length; i++) {
            let row = table.insertRow(-1);
            let label = document.createElement("label");
            label.innerText = labels[i];

            let labelCell = row.insertCell(-1);
            labelCell.style.textAlign = "right";
            labelCell.appendChild(label);

            let inputCell = row.insertCell(-1);
            inputCell.innerHTML = inputCells[i].innerHTML;
        }

        return table;
    }

    populateDriverTable(driverTable) {
        let driverInputs = driverTable.querySelectorAll('input');
        let loadValues = [this._name, this._raceLap._min, this._raceLap._sec, this._raceLap._ms, this._raceLapFuel];
        for (let i = 0; i < loadValues.length; i++) {
            if (loadValues[i]) {
                driverInputs[i].value = loadValues[i];
            }
        }
    }

    toString() {
        let returnString = "";
        returnString += "ID: " + this._id.toString()
            + "\nName: " + this._name
            + "\nLap time: " + this._raceLap.toString()
            + "\nLap fuel: " + this._raceLapFuel.toString()
            + "\nvvv Tyres vvv\n" + this._tyrePressuresAtTemps.toString();

        return returnString;
    }

    populateTables() {
        let driverTable = this._containingRow.getElementsByClassName(DRIVER_TABLE_MAIN_INFO_CLASS)[0];
        this.populateDriverTable(driverTable);
        let pressuresTable = this._containingRow.getElementsByClassName(DRIVER_TABLE_TYRE_INFO_CLASS)[0];
        this._tyrePressuresAtTemps.populatePressuresTable(pressuresTable);
    }
}

class TyrePressuresAtTemps {
    _tempsAndPressures;
    _id;

    constructor(id) {
        this._id = id;
        this._tempsAndPressures = new Map();

        for (let i = MIN_TEMP; i <= MAX_TEMP; i++) {
            this._tempsAndPressures.set(i, new TyrePressures());
        }
    }

    loadFromJSON(jsonObject) {
        for (let i = MIN_TEMP; i <= MAX_TEMP; i++) {
            this._tempsAndPressures.get(i).loadFromJSON(jsonObject._tempsAndPressures.get(i));
        }
    }

    pressuresAt(temperature) {
        return (this._tempsAndPressures.get(temperature));
    }

    generatePressuresTable() {
        let table = document.createElement("table");
        table.className = DRIVER_TABLE_TYRE_INFO_CLASS;
        let header = table.createTHead();
        let headerRow = header.insertRow(-1);
        headerRow.insertCell(-1).innerHTML = "°C"
        for (let i = 0; i < TYRES.length; i++) {
            let cell = headerRow.insertCell(-1)
            cell.innerHTML = TYRES[i];
            cell.style.textAlign = "center";
        }
        let body = table.createTBody();
        for (let i = MIN_TEMP; i <= MAX_TEMP; i++) {
            let row = body.insertRow(-1);
            row.insertCell(-1).innerHTML = i;
            for (let j = 0; j < TYRES.length; j++) {
                row.insertCell(-1).innerHTML = "<input type='tel' style='width: 5ch' maxlength='5' onchange='d._drivers.get(" + this._id.toString() + ")._tyrePressuresAtTemps._tempsAndPressures.get(" + i.toString() + ").pressures.set(\"" + TYRES[j] + "\",parseFloat(this.value))'>";
            }
            if (i >= current_min_temp && i <= current_max_temp) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        }
        return table;
    }

    populatePressuresTable(pressuresTable) {
        let pressuresTableNoHeader = pressuresTable.querySelectorAll('tbody')[0];
        let pressureRows = pressuresTableNoHeader.querySelectorAll('tr');
        for (let i = MIN_TEMP; i <= MAX_TEMP; i++) {
            this._tempsAndPressures.get(i).populatePressureRow(pressureRows[i - MIN_TEMP]);
        }
    }

    toString() {
        let returnString = "";
        for (let i = MIN_TEMP; i <= MAX_TEMP; i++) {
            returnString += i.toString() + " " + this.pressuresAt(i).toString() + "\n";
        }

        return returnString;
    }
}


class TyrePressures {
    pressures; // dictionary with (tyre,pressure)

    constructor() {
        this.pressures = new Map();
    }

    loadFromJSON(jsonObject) {
        for (let i = 0; i < TYRES.length; i++) {
            let pressure = jsonObject.pressures.get(TYRES[i]);
            if (pressure) {
                this.pressures.set(TYRES[i], pressure);
            }
        }
    }

    populatePressureRow(pressureRow) {
        let inputs = pressureRow.querySelectorAll('input');
        for (let i = 0; i < TYRES.length; i++) {
            let pressure = this.pressures.get(TYRES[i]);
            if (pressure){
                inputs[i].value = pressure;
            }
        }
    }

    setPressures(pressuresArray) {
        for (let i = 0; i < TYRES.length; i++) {
            this.pressures.set(TYRES[i], pressuresArray[i]);
        }
    }

    setPressure(tyre, pressure) {
        this.pressures.set(tyre, pressure);
    }

    getPressure(tyre) {
        return this.pressures.get(tyre);
    }

    isValid() {
        return (this.pressures.size === 4);
    }

    toString() {
        let returnString = "";
        for (let i = 0; i < TYRES.length; i++) {
            returnString += TYRES[i] + ": " + this.getPressure(TYRES[i]) + " ";
        }

        return returnString;
    }
}