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

    _driversTable;

    constructor() {
        this._driversTable = document.getElementById(DRIVERS_TABLE_ID);
        this._drivers = new Map();
        this._numDrivers = 1;
        for (let i = 0; i < MAX_DRIVERS; i++) {
            let driver = new Driver;
            let row = this._driversTable.insertRow(i);
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
}

class Driver {
    _name;
    _raceLap;
    _raceLapFuel;

    _containingRow;

    _tyrePressuresAtTemps;

    constructor() {
        this._tyrePressuresAtTemps = new TyrePressuresAtTemps();
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
        inputCells[0].innerHTML = "<input type='text'>";
        inputCells[1].innerHTML = "<input type='tel' style='width: 2ch' maxlength='2'>:<input type='tel' style='width: 2ch' maxlength='2'>.<input type='tel' style='width: 3ch' maxlength='3'>";
        inputCells[2].innerHTML = "<input type='tel' style='width: 5ch' maxlength='5'><a class='inputUnit'> litres</a>"
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

    get tyrePressuresAtTemps() {
        return this._tyrePressuresAtTemps;
    }

    get driverTable() {

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

        for (let i = MIN_TEMP; i <= MAX_TEMP; i++) {
            let row = table.insertRow(-1);
            row.insertCell(-1).innerHTML = i;
            for (let j = 0; j < TYRES.length; j++) {
                row.insertCell(-1).innerHTML = "<input type='tel' style='width: 5ch' maxlength='5'>";
            }
            if (i >= current_min_temp && i <= current_max_temp) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        }
        return table;
    }
}


class TyrePressures {
    pressures; // dictionary with (tyre,pressure)

    constructor() {
        this.pressures = new Map();
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
}