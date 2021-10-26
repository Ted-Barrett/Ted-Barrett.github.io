class Driver {
    index;
    driverName;
    lapTime;
    fuelPerLap;
    tyreTemps;

    constructor(index) {
        this.index=index;
    }
}

class Tyres {
    tyreTempsArray;
    constructor(minTemp,maxTemp,tyreNames) {
        for (let i=minTemp;i<=maxTemp;i++){
            this.tyreTempsArray.push([i,new Map()]);
            for (let j=0;j<tyreNames.length;j++){
                this.tyreTempsArray[-1][1]
            }
        }
    }
}