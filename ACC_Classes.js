const DRIVERS_TABLE_ID = "driversTable";

const TYRES = ["FL", "FR", "RL", "RR"];

const MIN_TEMP = 10;
const MAX_TEMP = 40;
const MAX_DRIVERS = 9;

class Drivers {
    _drivers;
    _numDrivers;

    _driversTable;

    constructor() {
        this._driversTable=document.getElementById(DRIVERS_TABLE_ID);
        this._drivers = new Map();
        for (let i=0;i<MAX_DRIVERS;i++){
            let driver = new Driver;
            let row = this._driversTable.insertRow(i);
            if (i>this._numDrivers-1){
                row.style.display = "none";
            } else {
                row.style.display = "";
            }
            driver.giveRow(row);
            driver.initTable();
            this._drivers.set(i,driver);
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
        this._containingRow.innerHTML = this.getDriverTable();
    }

    getDriverTable() {
        let table = document.createElement("table");
        table.className = "test";
        let row = table.insertRow(0);
        let cell = row.insertCell(0);
        cell.innerText="test";
        return table.innerHTML;
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