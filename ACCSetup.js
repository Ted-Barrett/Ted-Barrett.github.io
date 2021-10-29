let d = new Drivers();
console.log(d.toString())

document.getElementById('download').addEventListener('click', () => {
    let dl = document.createElement('a')
    dl.download = 'test.json' // target filename
    
    console.log(dl.href);
    // dl.click()
})