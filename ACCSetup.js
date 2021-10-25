function generateSetup(input,output) {

}

function adjDrivers(num){
    const numDrivers = document.getElementById("numDrivers");
    const n = parseInt(numDrivers.innerHTML) + num;
    if (n>0){
        numDrivers.innerHTML = parseInt(numDrivers.innerHTML)+num;
    }
}

function genSetupButton(){
    document.getElementById("mainForm").reportValidity();
}